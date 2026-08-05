/**
 * TaskMarket Bridge Helper for BlockRun MCP Live Data
 */

function prepareBlockRunTask(queryTopic, rewardUsdc) {
  if (!queryTopic) throw new Error('Query topic required');
  if (rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    platform: 'BlockRunMCP',
    topic: queryTopic,
    rewardUsdc,
    network: 'base-mainnet'
  };
}

module.exports = { prepareBlockRunTask };
