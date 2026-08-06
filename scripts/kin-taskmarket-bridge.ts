/**
 * TaskMarket Bridge Helper for Kin AI Agent Framework
 */

export interface KinTaskPayload {
  agentName: string;
  taskGoal: string;
  rewardUsdc: number;
}

export function prepareKinTask(payload: KinTaskPayload) {
  if (!payload.agentName || !payload.taskGoal) throw new Error('Agent name and goal required');
  if (payload.rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    framework: 'Kin-AI',
    agent: payload.agentName,
    goal: payload.taskGoal,
    rewardUsdc: payload.rewardUsdc,
    network: 'base-mainnet'
  };
}
