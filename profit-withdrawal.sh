#!/bin/bash
echo "í²° AINEON PROFIT WITHDRAWAL SYSTEM ACTIVATED"

# CONFIGURATION
MIN_WITHDRAWAL_AMOUNT=1000
BOSS_WALLET="0x742B60c2e6E45c2D606eE4dF6d6a6a9c74c3eA12"  # Boss MetaMask Wallet
AINEON_CONTRACT="0x8a4d7a3A7D7a5c5C5c5c5c5c5c5c5c5c5c5c5c5c"  # AINEON Treasury

# GET CURRENT PROFITS
echo "í´ CHECKING CURRENT PROFITS..."
CURRENT_PROFITS=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance | grep -o '"totalProfit":[^,]*' | cut -d':' -f2)

echo "í²° CURRENT AINEON PROFITS: \$$CURRENT_PROFITS"

# WITHDRAWAL LOGIC
if [ "$CURRENT_PROFITS" -gt "$MIN_WITHDRAWAL_AMOUNT" ]; then
    WITHDRAWAL_AMOUNT=$((CURRENT_PROFITS - 500))  # Leave $500 for operations
    
    echo "í¾¯ INITIATING PROFIT WITHDRAWAL..."
    echo "í²¸ AMOUNT: \$$WITHDRAWAL_AMOUNT"
    echo "í³¤ TO: $BOSS_WALLET"
    
    # EXECUTE BLOCKCHAIN WITHDRAWAL
    curl -X POST https://ai-neon-live-flash-loan.onrender.com/api/execute-trade \
        -H "Content-Type: application/json" \
        -d '{
            "action": "withdraw_profits",
            "amount": '$WITHDRAWAL_AMOUNT',
            "destination": "'$BOSS_WALLET'",
            "type": "profit_distribution"
        }'
    
    echo ""
    echo "âœ… PROFIT WITHDRAWAL EXECUTED!"
    echo "í²° TRANSFERRED: \$$WITHDRAWAL_AMOUNT"
    echo "í¾¯ REMAINING: \$500 (operational buffer)"
else
    echo "â³ PROFITS BELOW WITHDRAWAL THRESHOLD"
    echo "í¾¯ TARGET: \$$MIN_WITHDRAWAL_AMOUNT+ required"
    echo "í³ˆ CURRENT: \$$CURRENT_PROFITS"
fi

# SCHEDULE AUTOMATIC WITHDRAWALS
echo ""
echo "í´„ SETTING UP AUTOMATIC WITHDRAWALS..."
(crontab -l 2>/dev/null; echo "0 */6 * * * /bin/bash /path/to/profit-withdrawal.sh") | crontab -

echo ""
echo "í¾¯ AINEON PROFIT SYSTEM: OPERATIONAL"
echo "í²¸ AUTO-WITHDRAWAL: EVERY 6 HOURS"
echo "í²° MINIMUM: \$$MIN_WITHDRAWAL_AMOUNT"
echo "í³¤ DESTINATION: BOSS METAMASK WALLET"
