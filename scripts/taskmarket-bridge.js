/**
 * TaskMarket Bridge Helper for ContextKit x402 Skills
 */

function prepareContextKitTask(skillName, bountyUsdc) {
  if (!skillName) throw new Error('Skill name is required');
  if (bountyUsdc <= 0) throw new Error('Bounty must be positive');

  return {
    platform: 'ContextKit',
    marketplace: 'TaskMarket',
    skill: skillName,
    rewardUsdc: bountyUsdc,
    network: 'base-mainnet'
  };
}

module.exports = { prepareContextKitTask };
