/**
 * TaskMarket Bridge Helper for Google A2A x402 Commerce Extension
 */

function prepareA2AX402Task(intent, rewardUsdc) {
  if (!intent) throw new Error('Intent required');
  if (rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    protocol: 'Google-A2A-x402',
    intent,
    rewardUsdc,
    network: 'base-mainnet'
  };
}

module.exports = { prepareA2AX402Task };
