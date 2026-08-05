#!/usr/bin/env bash
# Test cold start wall-clock deadline completion

start_time=$(date +%s)
output=$(./hooks/ensure-monk-agent.sh)
elapsed=$(($(date +%s) - start_time))

if [ $elapsed -le 16 ] && echo "$output" | grep -q "did not become ready"; then
  echo "✅ PASS: Hook emitted JSON error payload before 20s host timeout (elapsed: ${elapsed}s)"
  exit 0
else
  echo "❌ FAIL: Hook exceeded deadline or failed to emit JSON"
  exit 1
fi
