/**
 * TaskMarket Bridge Helper for Presidio Hardened x402 Security Middleware
 */

export interface PresidioTaskConfig {
  middlewareEndpoint: string;
  bountyUsdc: number;
}

export function preparePresidioTask(config: PresidioTaskConfig) {
  if (!config.middlewareEndpoint) throw new Error('Endpoint required');
  if (config.bountyUsdc <= 0) throw new Error('Bounty must be positive');

  return {
    middleware: 'PresidioHardenedX402',
    endpoint: config.middlewareEndpoint,
    rewardUsdc: config.bountyUsdc,
    network: 'base-mainnet'
  };
}
