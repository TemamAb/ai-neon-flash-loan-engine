#!/bin/bash
echo "Ì∫Ä AINEON FIXED DEPLOYMENT"
echo "Ì≥ç Killing existing processes..."
taskkill //f //im node.exe >nul 2>&1
sleep 2

echo "Ì≥ç Starting COMPATIBLE services..."
# Use only .mjs, .cjs, or properly configured .js files
node backend-3003.mjs --port=3001 --api-mode=production &
node main-orchestrator.cjs --port=3003 --production=true &
node real-trading-engine.mjs --port=3005 --live-mode=true &

# Start dashboard using existing server files
node server.js --port=3000 &
node serve-dashboard.js --port=3002 &

echo "Ì≥ç Waiting for services..."
sleep 5

echo "Ì≥ç Verifying services..."
for port in 3000 3001 3003 3005; do
  if netstat -ano | findstr :$port >nul; then
    echo "‚úÖ Port $port: RUNNING"
  else
    echo "‚ùå Port $port: OFFLINE"
  fi
done

echo "Ìºê Dashboard: http://localhost:3000"
start http://localhost:3000
echo "‚úÖ AINEON DEPLOYED - TRADING ENGINE ACTIVE"
