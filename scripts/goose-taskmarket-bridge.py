"""
TaskMarket Bridge Helper for Goose AI Developer Agent
"""

def prepare_goose_task(task_type, details, bounty_usdc=5):
    if not task_type or not details:
        raise ValueError("Task type and details required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "agent": "Goose",
        "type": task_type,
        "details": details,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_goose_task("code-review", "Audit Rust CLI bounds")
    print(f"✅ Prepared TaskMarket Goose payload: {payload}")
