# KasSigner Security Architecture & Threat Model

Comprehensive security hardening proposal and threat model for air-gapped Schnorr transaction signing.

## 1. Threat Matrix & Mitigations

| Threat Vector | Mitigation Strategy | Implementation Status |
| :--- | :--- | :--- |
| **Physical Seizure / Coercion** | Duress Passphrase / Hidden Wallet Derivation | Proposed (`src/security/duress.rs`) |
| **Weak RNG / Entropy Depletion** | NIST SP 800-90A HMAC-DRBG + HW Entropy Blend | Recommended |
| **QR Code Buffer Overflow** | Max 1024-byte QR payload length validation | Implemented |
| **Side-Channel Timing Attacks** | Constant-time Schnorr signature verification (`subtle` crate) | Implemented |

## 2. Duress Passphrase Specification
- **Standard Passphrase**: Yields Primary Vault Account.
- **Duress Passphrase**: Yields Decoy Account with valid Schnorr keys and minimal decoy balances.

## 3. Bug Bounty Scope & Guidelines
- In-scope: QR parser memory safety, Schnorr key derivation leakage, WASM side-channel.
- Out-of-scope: Physical hardware tampering without PIN entry.
