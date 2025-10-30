#!/bin/bash
echo "� AINEON LIVE TRADING DASHBOARD"
echo "================================"
echo "Start Time: $(date)"
echo ""

while true; do
  clear
  echo "� Last Update: $(date)"
  echo "========================"
  
  # Get performance data
  performance=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance)
  health=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/health)
  
  echo "� PERFORMANCE:"
  echo "$performance" | grep -o '"totalProfit":[^,]*\|"tradesExecuted":[^,]*\|"profitPerHour":[^,]*' | sed 's/"/ /g'
  
  echo ""
  echo "�� STATUS:"
  echo "$health" | grep -o '"status":[^,]*\|"mission":[^,]*' | sed 's/"/ /g' | head -2
  
  echo ""
  echo "� TARGET: $50K-$150K/DAY"
  echo "⏳ Next update in 10 seconds..."
  sleep 10
done
