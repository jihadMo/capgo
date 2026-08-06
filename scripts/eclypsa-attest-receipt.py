"""
ECLYPSA AI Real Ed25519 BoundaryAttest v0.1 Compatible Receipt Generator (#2)
"""

import json
import base64
import hashlib
from datetime import datetime, timezone
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization

def generate_eclypsa_signed_receipt(task_id, target_ref, plugin_name, artifact_hash, private_key=None):
    if private_key is None:
        private_key = ed25519.Ed25519PrivateKey.generate()

    public_key = private_key.public_key()
    pub_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )
    pubkey_id = "sha256:" + hashlib.sha256(pub_bytes).hexdigest()

    claim = {
        "receipt_version": "experimental-interop-v0.1",
        "receipt_role": "server_attested",
        "event_id": f"eclypsa-task-{task_id}",
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "action_type": "eclypsa.security_task",
        "status": "success",
        "task_id": task_id,
        "target_ref": target_ref,
        "plugin_name": plugin_name,
        "artifact_hash": f"sha256:{artifact_hash}",
        "artifact_hash_alg": "sha256"
    }

    serialized_claim = json.dumps(claim, sort_keys=True).encode('utf-8')
    signature_bytes = private_key.sign(serialized_claim)
    signature_b64 = base64.b64encode(signature_bytes).decode('utf-8')

    return {
        "claim": claim,
        "signature": signature_b64,
        "public_key_id": pubkey_id
    }

if __name__ == "__main__":
    receipt = generate_eclypsa_signed_receipt(
        "task-101",
        "example.com",
        "banner-grabber",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    )
    print(json.dumps(receipt, indent=2))
