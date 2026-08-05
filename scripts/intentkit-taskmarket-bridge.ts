/**
 * TaskMarket Bridge Helper for IntentKit Agents
 */

export interface IntentKitTaskPayload {
  intentName: string;
  bountyUsdc: number;
}

export function prepareIntentKitTask(payload: IntentKitTaskPayload) {
  if (!payload.intentName) throw new Error('Intent name required');
  if (payload.bountyUsdc <= 0) throw new Error('Bounty must be positive');

  return {
    framework: 'IntentKit',
    intent: payload.intentName,
    rewardUsdc: payload.bountyUsdc,
    network: 'base-mainnet'
  };
}
