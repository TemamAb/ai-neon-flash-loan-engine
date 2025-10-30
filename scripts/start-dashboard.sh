#!/bin/bash

echo "ÌøóÔ∏è Starting AINEON Master Dashboard..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "‚ùå Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install backend dependencies
echo "Ì≥¶ Installing backend dependencies..."
cd backend
npm install

# Start the backend server
echo "Ì∫Ä Starting backend API server..."
node server.js &

# Wait a moment for backend to start
sleep 3

echo "‚úÖ AINEON Master Dashboard is starting up!"
echo "Ì≥ä Backend API: http://localhost:3001/api/metrics"
echo "Ì¥å WebSocket: ws://localhost:8081"
echo "‚ù§Ô∏è  Health Check: http://localhost:3001/health"
echo ""
echo "Note: Frontend integration with Vue components ready for development."
