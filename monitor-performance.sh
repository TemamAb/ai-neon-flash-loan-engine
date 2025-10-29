#!/bin/bash
echo "� AINEON LIVE PERFORMANCE MONITOR"
echo "=================================="
echo "Monitoring: https://ai-neon-live-flash-loan.onrender.com/api/performance"
echo "Press Ctrl+C to stop monitoring"
echo ""

while true; do
  clear
  echo "� Last Update: $(date)"
  echo "========================"
  
  # Get performance data
  performance=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance)
  
  # Extract key metrics
  totalProfit=$(echo "$performance" | grep -o '"totalProfit":[^,]*' | cut -d':' -f2)
  tradesExecuted=$(echo "$performance" | grep -o '"tradesExecuted":[^,]*' | cut -d':' -f2)
  profitPerHour=$(echo "$performance" | grep -o '"profitPerHour":[^,]*' | cut -d':' -f2)
  dailyProjection=$(echo "$performance" | grep -o '"dailyProjection":[^,}]*' | cut -d':' -f2)
  
  echo "� Total Profit: \$${totalProfit}"
  echo "� Trades Executed: ${tradesExecuted}"
  echo "⚡ Profit/Hour: \$${profitPerHour}"
  echo "� Daily Projection: \$${dailyProjection}"
  echo ""
  echo "⏳ Next update in 10 seconds..."
  sleep 10
done
