#!/bin/bash
echo "�� AINEON PRODUCTION MONITOR - LIVE"
echo "==================================="

# Production Health
echo "� PRODUCTION STATUS:"
prod_health=$(curl -s https://ai-neon-flash-loan-engine.onrender.com/api/health)
echo "$prod_health"

# Local Engine Status  
echo ""
echo "� LOCAL ENGINE STATUS:"
local_engine=$(curl -s http://localhost:3003/api/engine/status)
echo "$local_engine"

echo ""
echo "� TRADING READINESS:"
local_trading=$(curl -s http://localhost:3003/api/trading/performance) 
echo "$local_trading"

echo ""
echo "� PHASE 3: OPERATIONAL"
echo "� TARGET: \$50K-\$150K/DAY"
echo "⏰ NEXT: EXECUTE ARBITRAGE"
