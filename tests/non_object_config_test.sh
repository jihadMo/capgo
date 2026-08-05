#!/usr/bin/env bash
# Test start-monk-agent.sh with non-object JSON root config

export HOME="/tmp/test_home_array_root"
mkdir -p "$HOME/.gemini/config"
cfg="$HOME/.gemini/config/mcp_config.json"

cat << 'EOF' > "$cfg"
[{"preserved":"still here"}]
EOF

source ./scripts/start-monk-agent.sh
validate_and_register_antigravity "$cfg"

if [ $? -eq 0 ]; then
  echo "✅ PASS: Non-object JSON root handled gracefully without aborting launcher"
else
  echo "❌ FAIL: Launcher aborted on non-object JSON root"
  exit 1
fi
