# Kin AI + TaskMarket Integration Guide

Integration guide for publishing Kin agent framework tasks on TaskMarket (Base Mainnet / USDC).

## Quick Setup

```bash
# 1. Initialize TaskMarket configuration
npx @lucid-agents/taskmarket init

# 2. Set environment variables
export TASKMARKET_PRIVATE_KEY="0x..."
export BASE_RPC_URL="https://mainnet.base.org"

# 3. Create a Guest Task Drop on Base Mainnet
npx @lucid-agents/taskmarket task create \
  --title "Kin AI Agent Task" \
  --reward 5 \
  --currency USDC \
  --network base
```
