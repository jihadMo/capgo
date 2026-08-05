/**
 * TaskMarket Bridge Helper for AgenC Agent Marketplace
 */

export interface AgenCTaskPayload {
  agentCategory: string;
  taskTitle: string;
  bountyUsdc: number;
}

export function prepareAgenCTask(payload: AgenCTaskPayload) {
  if (!payload.agentCategory) throw new Error('Category required');
  if (payload.bountyUsdc <= 0) throw new Error('Bounty must be positive');

  return {
    marketplace: 'AgenC',
    category: payload.agentCategory,
    title: payload.taskTitle,
    rewardUsdc: payload.bountyUsdc,
    network: 'base-mainnet'
  };
}
