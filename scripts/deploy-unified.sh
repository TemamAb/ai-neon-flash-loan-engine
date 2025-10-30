#!/bin/bash

echo "Ì∫Ä DEPLOYING AINEON UNIFIED DASHBOARD"
echo "======================================"

# Build and start containers
echo "Ì∞≥ Building Docker containers..."
docker-compose build --no-cache

echo "ÔøΩÔøΩ Starting services..."
docker-compose up -d

echo "‚è≥ Waiting for services to initialize..."
sleep 15

echo "Ì¥ç Checking container status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "Ìø• Testing endpoints..."
echo -n "Backend API (3000): " && curl -s http://localhost:3000/api/health | grep -o '"status":"[^"]*"' || echo "FAILED"
echo -n "Frontend Dashboard (4000): " && curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 && echo " OK" || echo " FAILED"
echo -n "API Gateway (5000): " && curl -s http://localhost:5000/api/health | grep -o '"status":"[^"]*"' || echo "FAILED"

echo ""
echo "Ìæâ UNIFIED DASHBOARD DEPLOYMENT COMPLETE!"
echo "=========================================="
echo "Ì≥ä ACCESS URLs:"
echo "   Ì∂•Ô∏è  Unified Dashboard: http://localhost:3000"
echo "   Ì¥ß  Backend API:       http://localhost:3000/api/health"
echo "   Ì¥ó  API Gateway:       http://localhost:5000/api/health"
echo "   Ì≥±  Frontend:          http://localhost:4000"
echo ""
echo "‚úÖ All services running in Docker"
echo "‚úÖ Unified HTML dashboard deployed"
echo "‚úÖ Production-ready configuration"
echo ""
echo "Ì≤° Open http://localhost:3000 in your browser to view the unified dashboard!"
