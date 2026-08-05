#!/usr/bin/env bash
# Test launchd fast path literal fixed string matching

plist="/tmp/io.monk.agent.plist"

cat << 'EOF' > "$plist"
<plist version="1.0">
<dict>
  <key>MONK_AUTH_URL</key>
  <string>https://auth-monk-io</string>
  <key>MONK_CLIENT_ID</key>
  <string>monk-client-123</string>
  <key>MONK_AUDIENCE</key>
  <string>monk-api</string>
</dict>
</plist>
EOF

source ./scripts/launchd-auth-check.sh

# Checking with auth_url="https://auth.monk.io" should NOT match "https://auth-monk-io"
if launchd_configured "$plist" "https://auth.monk.io" "monk-client-123" "monk-api"; then
  echo "❌ FAIL: Regex matching allowed drifted auth URL to pass"
  exit 1
else
  echo "✅ PASS: Fixed string matching (-Fq) correctly detected drifted auth URL"
fi
