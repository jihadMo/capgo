/**
 * TaskMarket Bridge Helper for Nucleus Agent Workflows
 */

export interface NucleusTaskPayload {
  workflowName: string;
  stepId: string;
  rewardUsdc: number;
}

export function prepareNucleusTask(payload: NucleusTaskPayload) {
  if (!payload.workflowName || !payload.stepId) throw new Error('Workflow and step ID required');
  if (payload.rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    platform: 'Nucleus-OpenSource',
    workflow: payload.workflowName,
    step: payload.stepId,
    rewardUsdc: payload.rewardUsdc,
    network: 'base-mainnet'
  };
}
