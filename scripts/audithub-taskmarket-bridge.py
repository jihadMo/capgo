"""
TaskMarket Bridge Helper for Audithub MCP Agents
"""

def prepare_audit_task(contract_path, audit_scope, bounty_usdc=5):
    if not contract_path or not audit_scope:
        raise ValueError("Contract path and scope required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "mcp": "Audithub",
        "contract": contract_path,
        "scope": audit_scope,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_audit_task("Vault.sol", "Reentrancy and Share Math")
    print(f"✅ Prepared TaskMarket Audithub payload: {payload}")
