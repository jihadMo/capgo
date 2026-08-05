"""
TaskMarket Bridge Helper for x402-openai-python
"""

def prepare_x402_openai_task(model_name, prompt, bounty_usdc=5):
    if not model_name or not prompt:
        raise ValueError("Model and prompt are required")
    if bounty_usdc <= 0:
        raise ValueError("Bounty must be positive")

    return {
        "framework": "x402-openai-python",
        "model": model_name,
        "prompt": prompt,
        "rewardUsdc": bounty_usdc,
        "network": "base-mainnet"
    }

if __name__ == "__main__":
    payload = prepare_x402_openai_task("gpt-4o", "Analyze tokenomics contract")
    print(f"✅ Prepared TaskMarket x402 OpenAI payload: {payload}")
