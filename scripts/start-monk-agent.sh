#!/usr/bin/env bash
# Monk Agent Launcher (Fixed for non-object JSON root in Antigravity mcp_config.json)

validate_and_register_antigravity() {
  local mcp_cfg="$1"
  if [ ! -f "$mcp_cfg" ]; then
    return 0
  fi

  if command -v jq >/dev/null 2>&1; then
    if ! jq -e 'type == "object"' "$mcp_cfg" >/dev/null 2>&1; then
      echo "Warning: $mcp_cfg root is not a JSON object; skipping automatic registration."
      return 0
    fi
  elif command -v python3 >/dev/null 2>&1; then
    if ! python3 -c 'import json, sys; cfg = json.load(open(sys.argv[1])); sys.exit(0 if isinstance(cfg, dict) else 1)' "$mcp_cfg" >/dev/null 2>&1; then
      echo "Warning: $mcp_cfg root is not a JSON object; skipping automatic registration."
      return 0
    fi
  fi
}
