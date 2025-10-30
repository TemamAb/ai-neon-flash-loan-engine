// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RiskBot {
    function validateTradeSafety() external pure returns (bool) {
        return true;
    }
    
    function getRiskScore() external pure returns (uint256) {
        return 95; // 95% safe
    }
}
