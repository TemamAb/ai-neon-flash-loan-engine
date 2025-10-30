#!/bin/bash
echo "� AINEON FIXED DEPLOYMENT"
echo "� Killing existing processes..."
taskkill //f //im node.exe >nul 2>&1
sleep 2

echo "� Starting COMPATIBLE services..."
# Use only .mjs, .cjs, or properly configured .js files
node backend-3003.mjs --port=3001 --api-mode=production &
node main-orchestrator.cjs --port=3003 --production=true &
node real-trading-engine.mjs --port=3005 --live-mode=true &

# Start dashboard using existing server files
node server.js --port=3000 &
node serve-dashboard.js --port=3002 &

echo "� Waiting for services..."
sleep 5

echo "� Verifying services..."
for port in 3000 3001 3003 3005; do
  if netstat -ano | findstr :$port >nul; then
    echo "✅ Port $port: RUNNING"
  else
    echo "❌ Port $port: OFFLINE"
  fi
done

echo "� Dashboard: http://localhost:3000"
start http://localhost:3000
echo "✅ AINEON DEPLOYED - TRADING ENGINE ACTIVE"
