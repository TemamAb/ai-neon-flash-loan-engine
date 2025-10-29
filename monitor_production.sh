#!/bin/bash
echo "ÔøΩÔøΩ AINEON PRODUCTION MONITOR - LIVE"
echo "==================================="

# Production Health
echo "Ìºê PRODUCTION STATUS:"
prod_health=$(curl -s https://ai-neon-flash-loan-engine.onrender.com/api/health)
echo "$prod_health"

# Local Engine Status  
echo ""
echo "Ì∫Ä LOCAL ENGINE STATUS:"
local_engine=$(curl -s http://localhost:3003/api/engine/status)
echo "$local_engine"

echo ""
echo "Ì≤∞ TRADING READINESS:"
local_trading=$(curl -s http://localhost:3003/api/trading/performance) 
echo "$local_trading"

echo ""
echo "ÌæØ PHASE 3: OPERATIONAL"
echo "Ì≤µ TARGET: \$50K-\$150K/DAY"
echo "‚è∞ NEXT: EXECUTE ARBITRAGE"
