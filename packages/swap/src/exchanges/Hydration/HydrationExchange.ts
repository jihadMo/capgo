/**
 * HydrationExchange.ts (Fixed 1.1x fee buffer calculation #2049)
 */

export class HydrationExchange {
  calculateHydrationFee(toDestTransactionFee: bigint, FEE_BUFFER_PCT: number = 10): bigint {
    // 1.1x (+10% buffer) instead of 0.1x
    return (toDestTransactionFee * BigInt(100 + FEE_BUFFER_PCT)) / 100n;
  }
}
