#!/usr/bin/env python3
"""
Claude Code Pre-Tool-Use Hook: Destructive Command Guard
Blocks dangerous bash commands (rm -rf, DROP TABLE, git push --force, TRUNCATE, DELETE FROM without WHERE).
"""
import sys
import os
import json
import re
import datetime

# Define destructive patterns to block
DESTRUCTIVE_PATTERNS = [
    (r"\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\b|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r\b", "rm -rf (Recursive forced removal)"),
    (r"\bgit\s+push\s+.*(--force|-f)\b", "git push --force (Forced git push)"),
    (r"\bDROP\s+TABLE\b", "DROP TABLE SQL statement"),
    (r"\bTRUNCATE\b", "TRUNCATE SQL statement"),
    (r"\bDELETE\s+FROM\b(?![^;]*\bWHERE\b)", "DELETE FROM without WHERE clause"),
]

def log_blocked_attempt(cmd, project_path):
    log_dir = os.path.expanduser("~/.claude/hooks")
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, "blocked.log")
    
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    log_entry = f"[{timestamp}] Project: {project_path} | Blocked Command: {cmd}\n"
    
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry)

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        # If input is not JSON, check CLI args if provided
        data = {}

    cmd = ""
    project_path = os.getcwd()

    if isinstance(data, dict):
        tool_input = data.get("tool_input", {})
        if isinstance(tool_input, dict):
            cmd = tool_input.get("command", "")
        elif isinstance(tool_input, str):
            cmd = tool_input
        if "cwd" in data:
            project_path = data["cwd"]
    
    if not cmd and len(sys.argv) > 1:
        cmd = " ".join(sys.argv[1:])

    if not cmd:
        sys.exit(0)

    # Check for destructive command patterns
    for pattern, description in DESTRUCTIVE_PATTERNS:
        if re.search(pattern, cmd, re.IGNORECASE):
            log_blocked_attempt(cmd, project_path)
            print(f"\n[SECURITY GUARD BLOCKED] Destructive command detected: {description}", file=sys.stderr)
            print(f"Command '{cmd}' was intercepted to prevent unintended data loss.\n", file=sys.stderr)
            sys.exit(1)

    sys.exit(0)

if __name__ == "__main__":
    main()
