#!/bin/bash
echo "� DEPLOYING AINEON SMART CONTRACTS TO BLOCKCHAIN..."

# CHECK IF WE HAVE DEPLOYMENT TOOLS
echo "� CHECKING DEPLOYMENT ENVIRONMENT:"
which npx || echo "❌ npx not found"
which npm || echo "❌ npm not found"

# CHECK FOR HARDHAT/TRUFFLE CONFIG
echo ""
echo "� CHECKING DEPLOYMENT FRAMEWORKS:"
find . -name "hardhat.config.*" -o -name "truffle-config.*" | head -5

# ATTEMPT TO DEPLOY CONTRACTS
echo ""
echo "� ATTEMPTING CONTRACT DEPLOYMENT..."
if [ -f "package.json" ]; then
    echo "� INSTALLING DEPENDENCIES..."
    npm install
    
    echo "� RUNNING DEPLOYMENT SCRIPTS..."
    npx hardhat compile 2>/dev/null || npx truffle compile 2>/dev/null || echo "❌ No deployment framework found"
    
    # CHECK FOR DEPLOYMENT SCRIPTS
    find . -name "deploy*.js" -o -name "migrations/*.js" | head -5
else
    echo "❌ package.json not found"
fi

echo ""
echo "� DEPLOYMENT STATUS: CONTRACTS READY BUT NOT DEPLOYED"
echo "� TO DEPLOY: Need private key and run deployment scripts"
echo "� REQUIRED: Replace 'your_private_key_here' in .env file"
