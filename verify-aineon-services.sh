#!/bin/bash

echo "Ì¥ç VERIFYING AINEON SERVICES ARE RUNNING"

echo ""
echo "Ìºê Testing REST API..."
curl -s "http://localhost:3001/api/health" || echo "‚ùå API not responding"

echo ""
echo "Ì¥å Testing WebSocket..."
timeout 3 bash -c "echo > /dev/tcp/localhost/3001" && echo "‚úÖ WebSocket port open" || echo "‚ùå WebSocket port closed"

echo ""
echo "Ì∑ÑÔ∏è Testing Database..."
pg_isready -h localhost -p 5432 -d aineon -U aineon && echo "‚úÖ Database connected" || echo "‚ùå Database not connected"

echo ""
echo "Ì¥ó Testing Blockchain Connections..."
curl -s -X POST "https://api.pimlico.io/v1/1/rpc?apikey=pim_UbfKR9ocMe5ibNUCGgB8fE" \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' | grep -q "result" && echo "‚úÖ Ethereum RPC working" || echo "‚ùå Ethereum RPC failed"

echo ""
echo "Ì±õ Testing Wallet Address..."
echo "Wallet: 0xd6Ef692B34c14000912f429ed503685cBD9C52E0"

