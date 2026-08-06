/**
 * Anti-Turtle Earth Camping Balance Logic (#75)
 */

export interface PlayerState {
  id: string;
  earthTurns: number;
  totalAssetValue: number;
}

func validateVictoryEligibility(player: PlayerState): boolean {
  if (player.totalAssetValue === 0 && player.earthTurns > 5) {
    return false; // Turtle win disqualified
  }
  return true;
}
