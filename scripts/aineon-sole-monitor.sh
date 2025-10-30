#!/bin/bash
echo "� AINEON EXCLUSIVE DASHBOARD MONITOR"
echo "====================================="
echo "� NO OTHER APPLICATIONS PERMITTED"
echo "✅ ONLY AINEON SERVICES AUTHORIZED"
echo ""

while true; do
    clear
    echo "� $(date)"
    echo "� AINEON EXCLUSIVE ZONE"
    echo "========================"
    
    # Kill any unauthorized processes
    unauthorized=$(ps aux | grep -E "node.*(3000|3001|3002|3005|8080|8000)" | grep -v grep | grep -v "backend-3003")
    if [ -n "$unauthorized" ]; then
        echo "� UNAUTHORIZED PROCESS DETECTED - TERMINATING"
        ps aux | grep -E "node.*(3000|3001|3002|3005|8080|8000)" | grep -v grep | grep -v "backend-3003" | awk '{print $2}' | xargs kill -9 2>/dev/null
    fi
    
    # Show AINEON status
    performance=$(curl -s http://localhost:3003/api/performance 2>/dev/null)
    if [ -n "$performance" ]; then
        totalProfit=$(echo "$performance" | grep -o '"totalProfit":[^,]*' | cut -d':' -f2)
        tradesExecuted=$(echo "$performance" | grep -o '"tradesExecuted":[^,]*' | cut -d':' -f2)
        echo "� AINEON Profit: \$${totalProfit}"
        echo "� AINEON Trades: ${tradesExecuted}"
        echo "✅ STATUS: EXCLUSIVE CONTROL ACTIVE"
    else
        echo "� RESTARTING AINEON DASHBOARD..."
        pkill -f node 2>/dev/null
        node backend-3003.mjs &
        sleep 5
    fi
    
    echo ""
    echo "� PORT MONITORING: ACTIVE"
    echo "⏳ Refresh in 15 seconds..."
    sleep 15
done
