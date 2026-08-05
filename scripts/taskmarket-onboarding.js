/**
 * TaskMarket Automation Helper Script for LobeHub MCP
 * Validates Base mainnet configuration and prepares USDC task payload.
 */

function validateTaskConfig(config) {
  if (!config.title || typeof config.title !== 'string') {
    throw new Error('Task title is required');
  }
  if (!config.reward || config.reward <= 0) {
    throw new Error('Task reward must be greater than 0');
  }
  return {
    network: config.network || 'base',
    currency: config.currency || 'USDC',
    title: config.title,
    reward: config.reward,
    status: 'READY_TO_PUBLISH'
  };
}

module.exports = { validateTaskConfig };
