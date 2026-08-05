#!/usr/bin/env bash
# macOS launchd configuration fast-path checker (Fixed regex wildcard matching for literal auth URLs)

launchd_configured() {
  local launchd_plist="$1"
  local auth_url="$2"
  local auth_client_id="$3"
  local auth_audience="$4"

  if [ ! -f "$launchd_plist" ]; then
    return 1
  fi

  # Use grep -Fq for literal fixed string matching
  if grep -Fq "<string>$auth_url</string>" "$launchd_plist" && \
     grep -Fq "<string>$auth_client_id</string>" "$launchd_plist" && \
     grep -Fq "<string>$auth_audience</string>" "$launchd_plist"; then
    return 0
  else
    return 1
  fi
}
