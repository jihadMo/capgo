#!/usr/bin/env bash
# Test uninstall-monk-agent.sh with apostrophe in home path

export HOME="/tmp/test_home_O'Connor"
mkdir -p "$HOME/.gemini/config"
cfg="$HOME/.gemini/config/mcp_config.json"

cat << 'EOF' > "$cfg"
{
  "mcpServers": {
    "monk": {"serverUrl": "http://127.0.0.1:7419/mcp"},
    "preserved": {"serverUrl": "http://127.0.0.1:9999/mcp"}
  }
}
EOF

source ./scripts/uninstall-monk-agent.sh
remove_antigravity_mcp "$cfg"

if grep -q '"monk"' "$cfg"; then
  echo "❌ FAIL: monk entry was not removed from apostrophe path"
  exit 1
else
  echo "✅ PASS: monk entry successfully removed from apostrophe path"
fi
