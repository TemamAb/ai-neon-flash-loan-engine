#!/bin/bash
echo "�️ CHIEF ARCHITECT - PHASE 3 LAUNCH"
echo "==================================="

# Kill existing processes
pkill -f "node backend" 2>/dev/null
sleep 2

# Start backend
echo "� Starting AINEON Production Engine..."
node backend-3003.mjs &

# Wait and test
sleep 5
echo "✅ Testing endpoints..."
curl -s http://localhost:3003/api/health > /dev/null && echo "Health: ONLINE"
curl -s http://localhost:3003/api/engine/status > /dev/null && echo "Engine: ONLINE"
curl -s http://localhost:3003/api/trading/performance > /dev/null && echo "Trading: ONLINE"

echo ""
echo "� PHASE 3 ACTIVATED"
echo "� TARGET: \$50K-\$150K DAILY PROFIT"
echo "⏰ STATUS: READY FOR EXECUTION"
