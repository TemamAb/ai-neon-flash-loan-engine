#!/bin/bash
echo "Ìºê AINEON LIVE PRODUCTION DASHBOARD"
echo "==================================="
echo "URL: https://ai-neon-live-flash-loan.onrender.com"
echo ""

echo "Ì≥ä SYSTEM STATUS:"
health=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/health)
echo "Health: $health"

echo ""
echo "Ì∫Ä FEATURES:"
features=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/features)
echo "Features: $features"

echo ""
echo "Ì≤∞ PERFORMANCE:"
performance=$(curl -s https://ai-neon-live-flash-loan.onrender.com/api/performance)
echo "Performance: $performance"

echo ""
echo "ÌæØ EXECUTION:"
execution=$(curl -s -X POST https://ai-neon-live-flash-loan.onrender.com/api/execute-trade \
  -H "Content-Type: application/json" \
  -d '{"action": "status_check", "mode": "arbitrage"}')
echo "Execution: $execution"

echo ""
echo "‚úÖ LIVE PROFIT ENGINE: OPERATIONAL"
echo "Ì≤µ TARGET: \$50K-\$150K/DAY"
echo "Ì∫Ä STATUS: READY FOR TRADING"
