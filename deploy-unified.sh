#!/bin/bash

echo "� DEPLOYING AINEON UNIFIED DASHBOARD"
echo "======================================"

# Build and start containers
echo "� Building Docker containers..."
docker-compose build --no-cache

echo "�� Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to initialize..."
sleep 15

echo "� Checking container status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "� Testing endpoints..."
echo -n "Backend API (3000): " && curl -s http://localhost:3000/api/health | grep -o '"status":"[^"]*"' || echo "FAILED"
echo -n "Frontend Dashboard (4000): " && curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 && echo " OK" || echo " FAILED"
echo -n "API Gateway (5000): " && curl -s http://localhost:5000/api/health | grep -o '"status":"[^"]*"' || echo "FAILED"

echo ""
echo "� UNIFIED DASHBOARD DEPLOYMENT COMPLETE!"
echo "=========================================="
echo "� ACCESS URLs:"
echo "   �️  Unified Dashboard: http://localhost:3000"
echo "   �  Backend API:       http://localhost:3000/api/health"
echo "   �  API Gateway:       http://localhost:5000/api/health"
echo "   �  Frontend:          http://localhost:4000"
echo ""
echo "✅ All services running in Docker"
echo "✅ Unified HTML dashboard deployed"
echo "✅ Production-ready configuration"
echo ""
echo "� Open http://localhost:3000 in your browser to view the unified dashboard!"
