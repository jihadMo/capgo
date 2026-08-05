# Wield Protocol Vault Security Hardening & Audit Response (#1)

Comprehensive security review and technical resolution for findings in `Vault.sol` (Solidity 0.8.24).

---

## 1. Oracle Staleness Guard with Market Hours Awareness (Finding 1)

### Issue
`oracleStaleAfter` set to 3600s or 172800s can falsely validate 67+ hour stale prices during US market weekend gaps (Fri 4:00 PM ET to Mon 9:30 AM ET).

### Solution
Implement market-hours aware staleness validation:

```solidity
function isOracleStaleWithMarketHours(uint256 updatedAt) public view returns (bool) {
    if (block.timestamp < updatedAt) return true;
    uint256 elapsed = block.timestamp - updatedAt;
    
    // Weekend gap offset: if current time is Monday morning and updated on Friday afternoon,
    // subtract weekend hours (57.5h = 207,000s) from effective staleness calculation.
    uint256 effectiveStaleness = elapsed;
    if (elapsed > 207000 && isWeekendGap(updatedAt, block.timestamp)) {
        effectiveStaleness -= 207000;
    }
    
    return effectiveStaleness > oracleStaleAfter;
}
```

---

## 2. Rebalance Timelock & Front-Running Protection (Finding 2)

### Issue
Single-step `rebalance()` allows agent keys to immediately sell positions to USDG, altering `totalAssets()` and share price before deposit execution.

### Solution
Enforce a 1-hour Intent-Execution Timelock on agent rebalance operations:

```solidity
uint256 public constant REBALANCE_TIMELOCK_DELAY = 1 hours;
bytes32 public pendingRebalanceHash;
uint256 public pendingRebalanceTimestamp;

function submitRebalanceIntent(bytes32 intentHash) external onlyAgent {
    pendingRebalanceHash = intentHash;
    pendingRebalanceTimestamp = block.timestamp;
    emit RebalanceIntentSubmitted(intentHash, block.timestamp);
}

function executeRebalance(bytes calldata intentData) external onlyAgent {
    require(pendingRebalanceHash != bytes32(0), "No pending intent");
    require(block.timestamp >= pendingRebalanceTimestamp + REBALANCE_TIMELOCK_DELAY, "Timelock active");
    require(keccak256(intentData) == pendingRebalanceHash, "Hash mismatch");
    
    pendingRebalanceHash = bytes32(0);
    _execute(intentData);
}
```

---

## 3. Emergency Exit NatSpec & Explicit Controls (Finding 3)

### Issue
`emergencyWithdrawAll()` intentionally bypasses `paused` state to guarantee owner liquidity exit, but lacks documentation.

### Solution
Add explicit NatSpec documentation:

```solidity
/// @notice Emergency exit function bypasses protocol pause state.
/// @dev Intentionally unpaused to allow liquidity extraction during emergency pause mode.
function emergencyWithdrawAll() external onlyOwner {
    // ...
}
```
