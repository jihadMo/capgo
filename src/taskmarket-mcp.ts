/**
 * TaskMarket MCP Client Helper for A2A + x402 TypeScript Agents
 */

export interface TaskMarketParams {
  title: string;
  rewardUsdc: number;
  pitchFeeX402: string; // e.g. "0.001 USDC"
}

export function buildTaskMarketMcpPayload(params: TaskMarketParams) {
  if (!params.title) throw new Error('Task title required');
  if (params.rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    mcpTool: 'taskmarket_create_task',
    payload: {
      title: params.title,
      reward: params.rewardUsdc,
      currency: 'USDC',
      chain: 'base',
      pitchFee: params.pitchFeeX402 || '0.001 USDC'
    }
  };
}
