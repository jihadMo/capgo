const { SecretManager } = require('../scripts/secret-remove-fix');

async function testNonExistentSecretNoPrompt() {
  const vault = new Map();
  const approvals = new Map();
  const sm = new SecretManager(vault, approvals);

  const res = await sm.removeSecret('NON_EXISTENT', 'workspace');
  console.assert(res.removed === false, 'Should return false for non-existent secret');
  console.assert(approvals.size === 0, 'Should not create approval request for non-existent secret');
  console.log('✅ PASS: Non-existent secret check bypassed approval prompt');
}

async function testMcpTimeoutCancelsApproval() {
  const vault = new Map([['my_secret', '12345']]);
  const approvals = new Map();
  const sm = new SecretManager(vault, approvals);

  try {
    await sm.removeSecret('my_secret', 'workspace', 200); // 200ms timeout
  } catch (err) {
    console.assert(err.message.includes('Pending approval was cancelled'), 'Should report approval cancellation');
  }

  const req = Array.from(approvals.values())[0];
  console.assert(req.status === 'cancelled', 'Approval request must be cancelled on timeout');
  console.assert(vault.has('my_secret'), 'Secret must NOT be deleted after timeout');
  console.log('✅ PASS: MCP call timeout automatically cancelled pending approval');
}

(async () => {
  await testNonExistentSecretNoPrompt();
  await testMcpTimeoutCancelsApproval();
})();
