"""
TaskMarket Bridge Helper for ClaudeEarnSelf Runtime
"""

def prepare_claude_earn_task(task_type, bounty_usdc=5):
    if not task_type:
        raise ValueError("Task type required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "runtime": "ClaudeEarnSelf",
        "taskType": task_type,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_claude_earn_task("Autonomous Code Review")
    print(f"✅ Prepared TaskMarket ClaudeEarnSelf payload: {payload}")
