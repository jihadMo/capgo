/**
 * TaskMarket Bridge Helper for AgentKit Crypto-Wallet Agents
 */

export interface AgentKitTaskConfig {
  walletAddress: string;
  taskTitle: string;
  bountyUsdc: number;
}

export function prepareAgentKitTask(config: AgentKitTaskConfig) {
  if (!config.walletAddress) throw new Error('Wallet address required');
  if (config.bountyUsdc <= 0) throw new Error('Bounty must be positive');

  return {
    framework: 'AgentKit',
    wallet: config.walletAddress,
    title: config.taskTitle,
    rewardUsdc: config.bountyUsdc,
    network: 'base-mainnet'
  };
}
