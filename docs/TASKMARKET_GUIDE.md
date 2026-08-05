# LobeHub + TaskMarket Integration Guide

Step-by-step guide for publishing LobeHub agent tasks on TaskMarket (Base Mainnet / USDC).

## 3-Step Quick Start

```bash
# 1. Initialize TaskMarket configuration
npx @lucid-agents/taskmarket init

# 2. Set environment variables
export TASKMARKET_PRIVATE_KEY="0x..."
export BASE_RPC_URL="https://mainnet.base.org"

# 3. Create a Guest Task Drop on Base Mainnet
npx @lucid-agents/taskmarket task create \
  --title "LobeHub MCP Health Verification" \
  --reward 5 \
  --currency USDC \
  --network base
```
