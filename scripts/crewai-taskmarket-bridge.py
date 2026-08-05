"""
TaskMarket Bridge Helper for CrewAI Agents
"""

def prepare_crewai_task(agent_role, task_description, bounty_usdc):
    if not agent_role or not task_description:
        raise ValueError("Role and description are required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "framework": "CrewAI",
        "agentRole": agent_role,
        "description": task_description,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_crewai_task("Researcher", "Gather market data", 5)
    print(f"✅ Prepared TaskMarket payload: {payload}")
