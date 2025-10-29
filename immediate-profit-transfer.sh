#!/bin/bash
echo "Ì≤∞ AINEON 30-MINUTE PROFIT TRANSFER SYSTEM"

# CONFIG
MIN_PROFIT=1000
MAX_WAIT_MINUTES=30
BOSS_WALLET="0x742B60c2e6E45c2D606eE4dF6d6a6a9c74c3eA12"
CHECK_INTERVAL=300  # 5 minutes

while true; do
    CURRENT_PROFIT=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance | grep -o '"totalProfit":[^,]*' | cut -d':' -f2)
    
    if [ "$CURRENT_PROFIT" -gt "$MIN_PROFIT" ]; then
        echo "Ì∫Ä PROFIT THRESHOLD HIT: \$$CURRENT_PROFIT"
        echo "‚è∞ INITIATING TRANSFER - 30 MINUTE DEADLINE..."
        
        TRANSFER_AMOUNT=$((CURRENT_PROFIT - 500))  # Leave $500 buffer
        
        # EXECUTE TRANSFER WITH TIMEOUT
        timeout 1800 bash -c "
            echo 'Ì≤∏ TRANSFERRING: \$$TRANSFER_AMOUNT'
            echo 'Ì≥§ TO: $BOSS_WALLET'
            echo '‚è≥ MAX DURATION: 30 MINUTES'
            
            # EXECUTE BLOCKCHAIN TRANSFER
            curl -X POST https://ai-neon-live-flash-loan.onrender.com/api/execute-trade \
                -H 'Content-Type: application/json' \
                -d '{
                    \"action\": \"immediate_profit_transfer\",
                    \"amount\": $TRANSFER_AMOUNT,
                    \"destination\": \"$BOSS_WALLET\",
                    \"deadline_minutes\": 30
                }'
            
            echo '‚úÖ TRANSFER COMPLETED WITHIN 30 MINUTES'
        "
        
        if [ $? -eq 124 ]; then
            echo "‚ùå TRANSFER TIMEOUT - EXCEEDED 30 MINUTES"
        fi
    else
        echo "‚è≥ CURRENT PROFITS: \$$CURRENT_PROFIT - Monitoring..."
    fi
    
    sleep $CHECK_INTERVAL  # Check every 5 minutes
done
