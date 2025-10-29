#!/bin/bash
echo "Ì≤π AINEON LIVE TRADING DASHBOARD"
echo "================================"
echo "Start Time: $(date)"
echo ""

while true; do
  clear
  echo "Ìµí Last Update: $(date)"
  echo "========================"
  
  # Get performance data
  performance=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance)
  health=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/health)
  
  echo "Ì≤∞ PERFORMANCE:"
  echo "$performance" | grep -o '"totalProfit":[^,]*\|"tradesExecuted":[^,]*\|"profitPerHour":[^,]*' | sed 's/"/ /g'
  
  echo ""
  echo "ÔøΩÔøΩ STATUS:"
  echo "$health" | grep -o '"status":[^,]*\|"mission":[^,]*' | sed 's/"/ /g' | head -2
  
  echo ""
  echo "ÌæØ TARGET: $50K-$150K/DAY"
  echo "‚è≥ Next update in 10 seconds..."
  sleep 10
done
