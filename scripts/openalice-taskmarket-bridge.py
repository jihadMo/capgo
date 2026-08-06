"""
TaskMarket Bridge Helper for OpenAlice Trading Agents
"""

def prepare_openalice_task(pair_symbol, strategy_type, bounty_usdc=5):
    if not pair_symbol or not strategy_type:
        raise ValueError("Pair symbol and strategy type required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "agent": "OpenAlice",
        "pair": pair_symbol,
        "strategy": strategy_type,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_openalice_task("ETH/USDC", "Grid-Trading")
    print(f"✅ Prepared TaskMarket OpenAlice payload: {payload}")
