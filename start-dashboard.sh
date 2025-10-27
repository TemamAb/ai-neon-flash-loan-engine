#!/bin/bash

echo "�️ Starting AINEON Master Dashboard..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install backend dependencies
echo "� Installing backend dependencies..."
cd backend
npm install

# Start the backend server
echo "� Starting backend API server..."
node server.js &

# Wait a moment for backend to start
sleep 3

echo "✅ AINEON Master Dashboard is starting up!"
echo "� Backend API: http://localhost:3001/api/metrics"
echo "� WebSocket: ws://localhost:8081"
echo "❤️  Health Check: http://localhost:3001/health"
echo ""
echo "Note: Frontend integration with Vue components ready for development."
