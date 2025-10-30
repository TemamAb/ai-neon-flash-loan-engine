// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BotOrchestrator {
    address public scoutBot;
    address public executionBot;
    address public riskBot;
    
    function setBots(address _scout, address _executor, address _risk) external {
        scoutBot = _scout;
        executionBot = _executor;
        riskBot = _risk;
    }
    
    function orchestrateTrade() external view returns (bool) {
        return scoutBot != address(0) && executionBot != address(0) && riskBot != address(0);
    }
}
