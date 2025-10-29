#!/bin/bash
echo "Ìºê AINEON EXCLUSIVE DASHBOARD MONITOR"
echo "====================================="
echo "Ì∫´ NO OTHER APPLICATIONS PERMITTED"
echo "‚úÖ ONLY AINEON SERVICES AUTHORIZED"
echo ""

while true; do
    clear
    echo "Ìµí $(date)"
    echo "ÌæØ AINEON EXCLUSIVE ZONE"
    echo "========================"
    
    # Kill any unauthorized processes
    unauthorized=$(ps aux | grep -E "node.*(3000|3001|3002|3005|8080|8000)" | grep -v grep | grep -v "backend-3003")
    if [ -n "$unauthorized" ]; then
        echo "Ì∫´ UNAUTHORIZED PROCESS DETECTED - TERMINATING"
        ps aux | grep -E "node.*(3000|3001|3002|3005|8080|8000)" | grep -v grep | grep -v "backend-3003" | awk '{print $2}' | xargs kill -9 2>/dev/null
    fi
    
    # Show AINEON status
    performance=$(curl -s http://localhost:3003/api/performance 2>/dev/null)
    if [ -n "$performance" ]; then
        totalProfit=$(echo "$performance" | grep -o '"totalProfit":[^,]*' | cut -d':' -f2)
        tradesExecuted=$(echo "$performance" | grep -o '"tradesExecuted":[^,]*' | cut -d':' -f2)
        echo "Ì≤∞ AINEON Profit: \$${totalProfit}"
        echo "Ì≥à AINEON Trades: ${tradesExecuted}"
        echo "‚úÖ STATUS: EXCLUSIVE CONTROL ACTIVE"
    else
        echo "Ì¥Ñ RESTARTING AINEON DASHBOARD..."
        pkill -f node 2>/dev/null
        node backend-3003.mjs &
        sleep 5
    fi
    
    echo ""
    echo "Ì∫´ PORT MONITORING: ACTIVE"
    echo "‚è≥ Refresh in 15 seconds..."
    sleep 15
done
