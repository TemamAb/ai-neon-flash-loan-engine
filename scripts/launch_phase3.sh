#!/bin/bash
echo "ÌøóÔ∏è CHIEF ARCHITECT - PHASE 3 LAUNCH"
echo "==================================="

# Kill existing processes
pkill -f "node backend" 2>/dev/null
sleep 2

# Start backend
echo "Ì∫Ä Starting AINEON Production Engine..."
node backend-3003.mjs &

# Wait and test
sleep 5
echo "‚úÖ Testing endpoints..."
curl -s http://localhost:3003/api/health > /dev/null && echo "Health: ONLINE"
curl -s http://localhost:3003/api/engine/status > /dev/null && echo "Engine: ONLINE"
curl -s http://localhost:3003/api/trading/performance > /dev/null && echo "Trading: ONLINE"

echo ""
echo "ÌæØ PHASE 3 ACTIVATED"
echo "Ì≤µ TARGET: \$50K-\$150K DAILY PROFIT"
echo "‚è∞ STATUS: READY FOR EXECUTION"
