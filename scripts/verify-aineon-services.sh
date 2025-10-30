#!/bin/bash

echo "� VERIFYING AINEON SERVICES ARE RUNNING"

echo ""
echo "� Testing REST API..."
curl -s "http://localhost:3001/api/health" || echo "❌ API not responding"

echo ""
echo "� Testing WebSocket..."
timeout 3 bash -c "echo > /dev/tcp/localhost/3001" && echo "✅ WebSocket port open" || echo "❌ WebSocket port closed"

echo ""
echo "�️ Testing Database..."
pg_isready -h localhost -p 5432 -d aineon -U aineon && echo "✅ Database connected" || echo "❌ Database not connected"

echo ""
echo "� Testing Blockchain Connections..."
curl -s -X POST "https://api.pimlico.io/v1/1/rpc?apikey=pim_UbfKR9ocMe5ibNUCGgB8fE" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' | grep -q "result" && echo "✅ Ethereum RPC working" || echo "❌ Ethereum RPC failed"

echo ""
echo "� Testing Wallet Address..."
echo "Wallet: 0xd6Ef692B34c14000912f429ed503685cBD9C52E0"

