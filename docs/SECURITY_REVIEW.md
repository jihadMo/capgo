# KasSigner Security Architecture Review & Threat Model

Comprehensive security analysis and threat modeling report for KasSigner air-gapped hardware signer.

## Core Security Pillars

1. **Air-Gapped Communication:** QR-code-only input/output channel ensuring no network interface exposure.
2. **Stateless Key Derivation:** Deterministic key generation from seed without persistent storage risks.
3. **Schnorr Signature Verification:** Cryptographic authenticity checks for firmware binaries.
4. **Duress Passphrase Protection:** Optional hidden wallet feature for physical coercion defense.

## NIST Entropy Validation

See `scripts/validate-entropy.py` for automated Statistical Test Suite (NIST SP 800-22) entropy validation.
