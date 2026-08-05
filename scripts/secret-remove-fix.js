/**
 * Monk Secret Remove Handler (#260 Fix)
 * 1. Checks secret existence BEFORE raising approval prompts.
 * 2. Auto-cancels pending approvals if MCP call times out.
 */

class SecretManager {
  constructor(vault, approvalStore) {
    this.vault = vault; // Map of secret names to values
    this.approvalStore = approvalStore; // Map of requestId to approval metadata
  }

  async removeSecret(name, scope, mcpTimeoutMs = 5000) {
    // Fix 1: Validate secret existence before raising security prompt
    if (!this.vault.has(name)) {
      return { ok: false, removed: false, message: "Secret does not exist" };
    }

    const requestId = `req_${Date.now()}_${name}`;
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 min TTL

    this.approvalStore.set(requestId, {
      name,
      scope,
      status: "pending",
      expiresAt
    });

    // Fix 2: Bounded timeout race - auto-cancel request on MCP call timeout
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        const req = this.approvalStore.get(requestId);
        if (req && req.status === "pending") {
          req.status = "cancelled";
          req.cancelReason = "MCP_CALL_TIMED_OUT";
        }
        reject(new Error("The operation timed out. Pending approval was cancelled."));
      }, mcpTimeoutMs);
    });

    try {
      const result = await Promise.race([
        this._waitForApproval(requestId),
        timeoutPromise
      ]);
      clearTimeout(timeoutId);
      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  async _waitForApproval(requestId) {
    // Simulated approval poll
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const req = this.approvalStore.get(requestId);
        if (req && req.status === "approved") {
          clearInterval(interval);
          this.vault.delete(req.name);
          resolve({ ok: true, removed: true, name: req.name });
        } else if (req && req.status === "cancelled") {
          clearInterval(interval);
          resolve({ ok: false, removed: false, message: "Approval cancelled" });
        }
      }, 100);
    });
  }
}

module.exports = { SecretManager };
