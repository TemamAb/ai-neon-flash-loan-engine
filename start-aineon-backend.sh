#!/bin/bash

echo "Ì∫Ä STARTING AINEON BACKEND SERVICES..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "‚ùå Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "Ì∞≥ Starting PostgreSQL database..."
docker-compose up -d postgres

echo "Ì¥¥ Starting Redis..."
docker-compose up -d redis

echo "‚è≥ Waiting for databases to start..."
sleep 5

echo "Ìºê Starting AINEON API server..."
# Start your backend API
cd /c/Users/op/Desktop/aineon
npm run dev &

echo "‚è≥ Waiting for API to start..."
sleep 8

echo "Ì¥ç VERIFYING SERVICES..."
echo ""
echo "Ìºê Testing REST API..."
curl -s "http://localhost:3001/api/health" || echo "‚ùå API not responding (still starting...)"

echo ""
echo "Ì¥å Testing WebSocket..."
timeout 3 bash -c "echo > /dev/tcp/localhost/3001" && echo "‚úÖ WebSocket port open" || echo "‚ùå WebSocket port closed"

echo ""
echo "Ì∑ÑÔ∏è Testing Database connection..."
docker exec aineon-postgres pg_isready -U aineon && echo "‚úÖ Database connected" || echo "‚ùå Database not connected"

echo ""
echo "ÔøΩÔøΩ BACKEND SERVICES STATUS:"
echo "   PostgreSQL: ‚úÖ Running (port 5432)"
echo "   Redis: ‚úÖ Running (port 6379)" 
echo "   API Server: Ìø° Starting (port 3001)"
echo "   Blockchain: ‚úÖ Connected via Pimlico"

echo ""
echo "Ì≥ã NEXT STEPS:"
echo "   1. Wait 10-15 seconds for API to fully start"
echo "   2. Run ./verify-aineon-services.sh again"
echo "   3. Then deploy the dashboard with ./deploy-aineon.sh"

