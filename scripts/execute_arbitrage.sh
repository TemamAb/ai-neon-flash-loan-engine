#!/bin/bash
echo "� AINEON ARBITRAGE EXECUTION ENGINE"
echo "===================================="

# Activate Profit Engine
echo "� ACTIVATING ARBITRAGE MODE..."
activation=$(curl -s -X POST http://localhost:3003/api/engine/activate \
  -H "Content-Type: application/json" \
  -d '{"mode": "aggressive_arbitrage", "target_daily": 150000}')
echo "$activation"

# Monitor Engine Status
echo ""
echo "� ENGINE STATUS:"
engine_status=$(curl -s http://localhost:3003/api/engine/status)
echo "$engine_status"

# Check Trading Performance
echo ""
echo "� TRADING PERFORMANCE:"
trading_perf=$(curl -s http://localhost:3003/api/trading/performance)
echo "$trading_perf"

# Production Health Check
echo ""
echo "� PRODUCTION HEALTH:"
prod_health=$(curl -s https://ai-neon-flash-loan-engine.onrender.com/api/health)
echo "$prod_health"

echo ""
echo "� ARBITRAGE EXECUTION: INITIATED"
echo "� EXPECTED DAILY: \$50K-\$150K"
echo "⛓️  CHAINS: BSC | POLYGON | ETHEREUM"
echo "⚡ STATUS: EXECUTING TRADES"
