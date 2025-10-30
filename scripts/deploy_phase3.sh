#!/bin/bash

echo "�️ CHIEF ARCHITECT - PHASE 3 DEPLOYMENT"

# 1. Fix backend file first
echo "� Fixing backend syntax..."
sed -i 's/\\`/`/g' backend-3003.mjs 2>/dev/null
sed -i 's/\\\\//g' backend-3003.mjs 2>/dev/null

# 2. Health Check
echo "� Checking System Health..."
curl -s https://ai-neon-flash-loan-engine.onrender.com/api/health

# 3. Start backend locally first
echo "� Starting Backend Server..."
node backend-3003.mjs &

# 4. Wait for server to start
sleep 3

# 5. Test local engine endpoint
echo "� Testing Local Engine Control..."
curl -X PATCH http://localhost:3003/api/engine \
  -H "Content-Type: application/json" \
  -d '{"mode": "maximum_profit", "target_daily": 150000}'

echo "� DEPLOYMENT COMPLETE - Backend running on port 3003"
