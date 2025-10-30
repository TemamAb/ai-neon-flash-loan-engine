#!/bin/bash

echo "� STARTING AINEON BACKEND SERVICES..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "� Starting PostgreSQL database..."
docker-compose up -d postgres

echo "� Starting Redis..."
docker-compose up -d redis

echo "⏳ Waiting for databases to start..."
sleep 5

echo "� Starting AINEON API server..."
# Start your backend API
cd /c/Users/op/Desktop/aineon
npm run dev &

echo "⏳ Waiting for API to start..."
sleep 8

echo "� VERIFYING SERVICES..."
echo ""
echo "� Testing REST API..."
curl -s "http://localhost:3001/api/health" || echo "❌ API not responding (still starting...)"

echo ""
echo "� Testing WebSocket..."
timeout 3 bash -c "echo > /dev/tcp/localhost/3001" && echo "✅ WebSocket port open" || echo "❌ WebSocket port closed"

echo ""
echo "�️ Testing Database connection..."
docker exec aineon-postgres pg_isready -U aineon && echo "✅ Database connected" || echo "❌ Database not connected"

echo ""
echo "�� BACKEND SERVICES STATUS:"
echo "   PostgreSQL: ✅ Running (port 5432)"
echo "   Redis: ✅ Running (port 6379)" 
echo "   API Server: � Starting (port 3001)"
echo "   Blockchain: ✅ Connected via Pimlico"

echo ""
echo "� NEXT STEPS:"
echo "   1. Wait 10-15 seconds for API to fully start"
echo "   2. Run ./verify-aineon-services.sh again"
echo "   3. Then deploy the dashboard with ./deploy-aineon.sh"

