#!/bin/bash

# í¾¯ MASTER DASHBOARD COMPREHENSIVE TEST SUITE
echo "íº€ TESTING AINEON MASTER DASHBOARD - PORT 3000"
echo "=============================================="

# 1. BASIC HEALTH & INFO
echo "1. Testing Basic Endpoints..."
curl http://localhost:3000/
echo ""
curl http://localhost:3000/health
echo ""

# 2. MAIN METRICS ENDPOINT
echo "2. Testing Main Metrics Endpoint..."
curl http://localhost:3000/api/metrics
echo ""

# 3. AI CONTROL ENDPOINTS
echo "3. Testing AI Control Endpoints..."
curl -X POST http://localhost:3000/api/ai/autonomy/enable \
  -H "Content-Type: application/json" \
  -d '{"mode":"AUTONOMOUS"}'
echo ""

curl -X POST http://localhost:3000/api/ai/optimize/parameters
echo ""

curl -X POST http://localhost:3000/api/deployment/live
echo ""

# 4. SYSTEM CONTROL ENDPOINTS
echo "4. Testing System Control Endpoints..."
curl -X POST http://localhost:3000/api/system/emergency-stop
echo ""

curl -X POST http://localhost:3000/api/system/restart
echo ""

# 5. VERIFICATION
echo "5. Final Verification..."
curl http://localhost:3000/health
echo ""

echo "âœ… MASTER DASHBOARD TESTING COMPLETE!"
echo "í³Š API: http://localhost:3000"
echo "í´Œ WebSocket: ws://localhost:3001"
echo "í¾¯ Ready for Frontend Integration!"
