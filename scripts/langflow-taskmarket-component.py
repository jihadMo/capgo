"""
TaskMarket Component for Langflow Workflows
"""

class TaskMarketComponent:
    def __init__(self, rpc_url="https://mainnet.base.org"):
        self.rpc_url = rpc_url

    def build_task_payload(self, title, reward_usdc):
        if not title:
            raise ValueError("Title required")
        if reward_usdc <= 0:
            raise ValueError("Reward must be positive")

        return {
            "component": "TaskMarketLangflow",
            "title": title,
            "rewardUsdc": reward_usdc,
            "chain": "base-mainnet"
        }
