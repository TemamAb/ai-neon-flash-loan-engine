#!/bin/bash

echo "í´ AINEON CONFIGURATION DISCOVERY"

echo ""
echo "í³ Checking directory structure..."
find . -name "*.env*" -o -name "*config*" -o -name "*.json" -o -name "*.js" -o -name "*.ts" | grep -v node_modules | head -20

echo ""
echo "í¼ Checking for API configurations..."
find . -type f -exec grep -l "api.*aineon\|aineon.*api\|localhost.*300\|ws://\|wss://" {} \; 2>/dev/null | head -10

echo ""
echo "í´§ Checking package.json for scripts..."
if [ -f "package.json" ]; then
    grep -A 10 -B 2 "scripts" package.json
fi

echo ""
echo "í³Š Checking for environment files..."
if [ -f ".env" ]; then
    echo "í³„ .env file found (first 10 lines):"
    head -10 .env
elif [ -f ".env.local" ]; then
    echo "í³„ .env.local file found (first 10 lines):"
    head -10 .env.local
elif [ -f ".env.production" ]; then
    echo "í³„ .env.production file found (first 10 lines):"
    head -10 .env.production
else
    echo "âŒ No environment files found"
fi

echo ""
echo "í·„ï¸ Checking for database configurations..."
find . -type f -exec grep -l "postgres\|database\|DB_HOST\|DB_NAME" {} \; 2>/dev/null | head -5

echo ""
echo "í´— Checking for WebSocket configurations..."
find . -type f -exec grep -l "websocket\|ws://\|wss://\|socket.io" {} \; 2>/dev/null | head -5

echo ""
echo "í²° Checking for wallet/blockchain configurations..."
find . -type f -exec grep -l "ethers\|web3\|metamask\|wallet\|relayer" {} \; 2>/dev/null | head -5
