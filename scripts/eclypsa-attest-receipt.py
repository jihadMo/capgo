"""
ECLYPSA AI Signed Receipt Generator (#2)
"""

import hmac
import hashlib
import json
import time

def generate_signed_receipt(task_id, target, plugin_name, artifact_hash, secret_key="eclypsa-default-secret"):
    payload = {
        "taskId": task_id,
        "target": target,
        "plugin": plugin_name,
        "artifactHash": artifact_hash,
        "timestamp": int(time.time()),
        "issuer": "ECLYPSA-AI"
    }
    serialized = json.dumps(payload, sort_keys=True).encode('utf-8')
    signature = hmac.new(secret_key.encode('utf-8'), serialized, hashlib.sha256).hexdigest()
    
    return {
        "payload": payload,
        "signature": signature,
        "algorithm": "HMAC-SHA256"
    }

if __name__ == "__main__":
    receipt = generate_signed_receipt("task-101", "example.com", "banner-grabber", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
    print(f"✅ Generated Signed Receipt:\n{json.dumps(receipt, indent=2)}")
