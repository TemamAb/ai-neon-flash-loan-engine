#!/bin/bash
echo "Ì∫Ä DEPLOYING AINEON SMART CONTRACTS TO BLOCKCHAIN..."

# CHECK IF WE HAVE DEPLOYMENT TOOLS
echo "Ì¥ß CHECKING DEPLOYMENT ENVIRONMENT:"
which npx || echo "‚ùå npx not found"
which npm || echo "‚ùå npm not found"

# CHECK FOR HARDHAT/TRUFFLE CONFIG
echo ""
echo "Ì≥ã CHECKING DEPLOYMENT FRAMEWORKS:"
find . -name "hardhat.config.*" -o -name "truffle-config.*" | head -5

# ATTEMPT TO DEPLOY CONTRACTS
echo ""
echo "ÌæØ ATTEMPTING CONTRACT DEPLOYMENT..."
if [ -f "package.json" ]; then
    echo "Ì≥¶ INSTALLING DEPENDENCIES..."
    npm install
    
    echo "Ì∫Ä RUNNING DEPLOYMENT SCRIPTS..."
    npx hardhat compile 2>/dev/null || npx truffle compile 2>/dev/null || echo "‚ùå No deployment framework found"
    
    # CHECK FOR DEPLOYMENT SCRIPTS
    find . -name "deploy*.js" -o -name "migrations/*.js" | head -5
else
    echo "‚ùå package.json not found"
fi

echo ""
echo "ÌæØ DEPLOYMENT STATUS: CONTRACTS READY BUT NOT DEPLOYED"
echo "Ì≤° TO DEPLOY: Need private key and run deployment scripts"
echo "Ì¥ë REQUIRED: Replace 'your_private_key_here' in .env file"
