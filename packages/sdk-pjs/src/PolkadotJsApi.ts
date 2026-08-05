/**
 * PolkadotJsApi.ts (Fixed Here key casing for relay-chain dry-run #2051)
 */

export function getDryRunCall(interior: any) {
  if (!interior) return undefined;
  return interior.Here === null ? 0 : interior.X1?.Parachain;
}

export function getDryRunXcm(interior: any) {
  if (!interior) return undefined;
  return interior.Here === null ? 0 : interior.X1?.Parachain;
}
