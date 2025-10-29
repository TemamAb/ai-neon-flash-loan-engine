#!/bin/bash
echo "AINEON PRODUCTION MONITOR"
echo "========================="
echo "Start Time: $(date)"
echo ""

# Check PM2 status
echo "PM2 Status:"
pm2 status

echo ""
echo "API Endpoints:"
curl -s http://localhost:3003/api/health | jq '.status' 2>/dev/null || curl -s http://localhost:3003/api/health | grep status

echo ""
echo "System Resources:"
pm2 monit
