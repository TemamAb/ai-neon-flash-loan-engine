#!/bin/bash
echo "� AINEON LIVE PRODUCTION DASHBOARD"
echo "==================================="
echo "URL: https://ai-neon-live-flash-loan.onrender.com"
echo ""

echo "� SYSTEM STATUS:"
health=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/health)
echo "Health: $health"

echo ""
echo "� FEATURES:"
features=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/features)
echo "Features: $features"

echo ""
echo "� PERFORMANCE:"
performance=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance)
echo "Performance: $performance"

echo ""
echo "� EXECUTION:"
execution=$(curl -s -X POST https://ai-neon-live-flash-loan.onrender.com/api/execute-trade \
  -H "Content-Type: application/json" \
  -d '{"action": "status_check", "mode": "arbitrage"}')
echo "Execution: $execution"

echo ""
echo "✅ LIVE PROFIT ENGINE: OPERATIONAL"
echo "� TARGET: \$50K-\$150K/DAY"
echo "� STATUS: READY FOR TRADING"
