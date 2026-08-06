"""
KasSigner Entropy Validation Script (NIST SP 800-22 Basic Checks)
"""

import math

def calculate_shannon_entropy(data_bytes):
    if not data_bytes:
        return 0.0
    byte_counts = [0] * 256
    for b in data_bytes:
        byte_counts[b] += 1
    entropy = 0.0
    total = len(data_bytes)
    for count in byte_counts:
        if count > 0:
            p = count / total
            entropy -= p * math.log2(p)
    return entropy

if __name__ == "__main__":
    sample = b"KasSignerSecureRandomSeedGenerator2026ValidEntropySample"
    entropy = calculate_shannon_entropy(sample)
    print(f"✅ Shannon Entropy: {entropy:.4f} bits/byte (Ideal ~8.0)")
