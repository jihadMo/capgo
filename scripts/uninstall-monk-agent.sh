#!/usr/bin/env bash
# Monk Agent Uninstaller (Fixed for apostrophe paths in Python fallback)

remove_antigravity_mcp() {
  local mcp_cfg="$1"
  if [ ! -f "$mcp_cfg" ]; then
    return 0
  fi

  if command -v jq >/dev/null 2>&1; then
    tmp=$(mktemp)
    jq 'del(.mcpServers.monk)' "$mcp_cfg" > "$tmp" && mv "$tmp" "$mcp_cfg"
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c '
import json, sys
cfg_path = sys.argv[1]
try:
    with open(cfg_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if "mcpServers" in data and "monk" in data["mcpServers"]:
        del data["mcpServers"]["monk"]
        with open(cfg_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
except Exception as e:
    sys.exit(1)
' "$mcp_cfg" 2>/dev/null || true
  fi
}
