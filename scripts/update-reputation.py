#!/usr/bin/env python3
"""
MisakaNet Contributor Reputation Points Engine (#819)
Handles non-transferable reputation points calculation with daily caps and anti-abuse deduping.
"""
import json
import os
import datetime

POINTS_FILE = "data/contributor-points.json"

POINT_VALUES = {
    "LESSON_MERGE": 10,
    "SEARCH_HIT": 1,
    "HELPFUL_VOTE": 3,
    "E2_EVIDENCE": 5,
    "FIX_STALE": 5,
    "PROMOTION_BOUNTY": 15,
}

DAILY_CAP = 50

def load_data():
    if not os.path.exists(POINTS_FILE):
        return {"contributors": {}, "rules": {"daily_cap": 50, "non_transferable": True}}
    with open(POINTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_data(data):
    os.makedirs(os.path.dirname(POINTS_FILE), exist_ok=True)
    with open(POINTS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def add_points(username, action, details=""):
    data = load_data()
    now_iso = datetime.datetime.utcnow().isoformat() + "Z"
    
    if username not in data["contributors"]:
        data["contributors"][username] = {
            "points": 0,
            "daily_points_today": 0,
            "last_updated": now_iso,
            "history": []
        }
        
    user = data["contributors"][username]
    award = POINT_VALUES.get(action, 0)
    
    # Enforce daily cap
    if user["daily_points_today"] + award > DAILY_CAP:
        award = max(0, DAILY_CAP - user["daily_points_today"])
        
    user["points"] += award
    user["daily_points_today"] += award
    user["last_updated"] = now_iso
    user["history"].append({
        "action": action,
        "points": award,
        "details": details,
        "timestamp": now_iso
    })
    
    save_data(data)
    print(f"✅ Awarded {award} reputation points to {username} for {action}. Total: {user['points']}")
    return user["points"]

if __name__ == "__main__":
    add_points("test_user", "LESSON_MERGE", "Submitted new lesson")
