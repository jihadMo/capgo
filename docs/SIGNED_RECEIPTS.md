# ECLYPSA AI Portable Signed Receipts Integration

Integration guide for generating cryptographic signed receipts for ECLYPSA AI security task outputs, recon handoffs, and plugin execution artifacts using HMAC-SHA256 / BoundaryAttest patterns.

## Quick Usage

```bash
python scripts/eclypsa-attest-receipt.py \
  --task-id "task-9901" \
  --target "192.168.1.1" \
  --plugin "recon-banner-grabber" \
  --secret "my-signing-key"
```
