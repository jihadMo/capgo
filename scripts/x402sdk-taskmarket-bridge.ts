/**
 * TaskMarket Bridge Helper for x402 SDK on Base
 */

export interface X402TaskConfig {
  merchantWallet: string;
  taskTitle: string;
  rewardUsdc: number;
}

export function prepareX402Task(config: X402TaskConfig) {
  if (!config.merchantWallet) throw new Error('Merchant wallet required');
  if (config.rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    sdk: 'x402sdk',
    network: 'base-mainnet',
    merchant: config.merchantWallet,
    title: config.taskTitle,
    rewardUsdc: config.rewardUsdc
  };
}
