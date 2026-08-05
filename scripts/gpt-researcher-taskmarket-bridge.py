"""
TaskMarket Bridge Helper for gpt-researcher
"""

def prepare_research_task(query, depth="deep", bounty_usdc=5):
    if not query:
        raise ValueError("Query required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "framework": "gpt-researcher",
        "query": query,
        "depth": depth,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_research_task("DeFi Protocol Security Standards")
    print(f"✅ Prepared TaskMarket research payload: {payload}")
