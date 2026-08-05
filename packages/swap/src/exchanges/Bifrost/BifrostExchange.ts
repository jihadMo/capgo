/**
 * BifrostExchange.ts (Fixed non-native token destination fee deduction #2050)
 */

export class BifrostExchange {
  calculateAmountOutWithFee(amountOut: bigint, toDestTxFee: bigint, isNative: boolean): bigint {
    const feeBuffer = (toDestTxFee * 11n) / 10n; // 10% fee buffer (padValueBy)
    const finalAmountOut = amountOut - feeBuffer;
    if (finalAmountOut <= 0n) {
      throw new Error("AmountTooLowError");
    }
    return finalAmountOut;
  }
}
