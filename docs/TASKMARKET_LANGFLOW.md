# Langflow + TaskMarket Integration Guide

Integration guide for adding TaskMarket delegation components to Langflow agent workflows (Base Mainnet / USDC).

## Quick Setup

```bash
# 1. Initialize TaskMarket configuration
npx @lucid-agents/taskmarket init

# 2. Set environment variables
export TASKMARKET_PRIVATE_KEY="0x..."
export BASE_RPC_URL="https://mainnet.base.org"

# 3. Create a Guest Task Drop on Base Mainnet
npx @lucid-agents/taskmarket task create \
  --title "Langflow Workflow Task Delegation" \
  --reward 5 \
  --currency USDC \
  --network base
```
