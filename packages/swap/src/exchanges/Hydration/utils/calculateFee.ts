/**
 * calculateFee.ts (Fixed double-counted toDestTransactionFee #2049)
 */

export function calculateFee(swapFee: bigint, toDestTransactionFee: bigint): bigint {
  // Single addition of toDestTransactionFee instead of duplicate double-counting
  const feeNative = swapFee + toDestTransactionFee;
  return feeNative;
}
