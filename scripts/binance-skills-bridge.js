/**
 * TaskMarket Bridge Helper for Binance Skills Hub
 */

function prepareBinanceSkillTask(skillName, rewardUsdc) {
  if (!skillName) throw new Error('Skill name required');
  if (rewardUsdc <= 0) throw new Error('Reward must be positive');

  return {
    platform: 'BinanceSkillsHub',
    skill: skillName,
    rewardUsdc,
    network: 'base-mainnet'
  };
}

module.exports = { prepareBinanceSkillTask };
