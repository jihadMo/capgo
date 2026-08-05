#!/usr/bin/env bash
# Antigravity Ensure Monk Agent Cold-Start Hook (Fixed for 20s wall-clock deadline #257)

DEADLINE=$(($(date +%s) + 12))

while [ $(date +%s) -lt $DEADLINE ]; do
  if curl -s --max-time 2 http://127.0.0.1:7419/health >/dev/null 2>&1; then
    echo '{"status": "ok", "message": "monk-agent is ready"}'
    exit 0
  fi
  sleep 1
done

# Emit readiness timeout JSON before Antigravity host timeout kills process
echo '{"status": "error", "message": "monk-agent did not become ready within 12 seconds"}'
exit 1
