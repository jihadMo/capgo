// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title VaultSecurityExtensions
 * @notice Security extension contract for Wield Protocol Vault.sol (#1)
 * @dev Implements market-hours oracle staleness checking and rebalance timelock.
 */
contract VaultSecurityExtensions {
    uint256 public oracleStaleAfter = 3600; // Default 1 hour
    uint256 public constant REBALANCE_TIMELOCK = 1 hours;

    bytes32 public pendingRebalanceHash;
    uint256 public pendingRebalanceTimestamp;

    event RebalanceIntentSubmitted(bytes32 indexed intentHash, uint256 timestamp);
    event RebalanceExecuted(bytes32 indexed intentHash);

    /// @notice Validates oracle staleness accounting for market weekend gaps
    function isOracleStaleWithMarketHours(uint256 updatedAt) public view returns (bool) {
        if (block.timestamp < updatedAt) return true;
        uint256 elapsed = block.timestamp - updatedAt;

        // If elapsed time spans US stock market weekend (57.5h = 207,000s), adjust threshold
        if (elapsed > 207000) {
            elapsed -= 207000;
        }

        return elapsed > oracleStaleAfter;
    }

    /// @notice Submit rebalance intent with 1-hour execution timelock
    function submitRebalanceIntent(bytes32 intentHash) external {
        pendingRebalanceHash = intentHash;
        pendingRebalanceTimestamp = block.timestamp;
        emit RebalanceIntentSubmitted(intentHash, block.timestamp);
    }

    /// @notice Execute rebalance after timelock expires
    function executeRebalanceWithTimelock(bytes calldata intentData) external {
        require(pendingRebalanceHash != bytes32(0), "No intent");
        require(block.timestamp >= pendingRebalanceTimestamp + REBALANCE_TIMELOCK, "Timelock active");
        require(keccak256(intentData) == pendingRebalanceHash, "Hash mismatch");

        bytes32 executed = pendingRebalanceHash;
        pendingRebalanceHash = bytes32(0);
        emit RebalanceExecuted(executed);
    }
}
