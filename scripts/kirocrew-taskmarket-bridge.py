"""
TaskMarket Bridge Helper for KiroCrew Agents
"""

def prepare_kirocrew_task(crew_name, task_title, bounty_usdc=5):
    if not crew_name or not task_title:
        raise ValueError("Crew name and title required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "framework": "KiroCrew",
        "crew": crew_name,
        "title": task_title,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_kirocrew_task("DevOpsCrew", "Deploy staging node")
    print(f"✅ Prepared TaskMarket KiroCrew payload: {payload}")
