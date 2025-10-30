#!/bin/bash
echo "ÔøΩÔøΩ AINEON UNIFIED DEPLOYMENT"
taskkill //f //im node.exe >nul 2>&1
echo "Ì≥ç Starting Dashboard Fleet..."
node dashboard-service.ts --port=3000 &
node backend-3003.mjs --port=3001 &  
node websocket-service.ts --port=3002 &
node main-orchestrator.cjs --port=3003 &
node health-monitor.js --port=3004 &
node real-trading-engine.mjs --port=3005 &
echo "‚úÖ Services starting on ports 3000-3005"
echo "Ìºê Dashboard: http://localhost:3000"
start http://localhost:3000
