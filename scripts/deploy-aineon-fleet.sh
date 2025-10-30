#!/bin/bash

echo "Ì¥¥ NUKING all processes on ports 3000-3010..."
for port in {3000..3010}; do
    lsof -ti:$port | xargs kill -9 2>/dev/null
    fuser -k $port/tcp 2>/dev/null
done

sleep 2

echo "Ì¥ç Verifying ports are clear..."
for port in {3000..3010}; do
    if netstat -an | grep ":$port " | grep LISTEN > /dev/null; then
        echo "‚ùå Port $port still occupied"
        PID=$(netstat -ano | grep ":$port " | awk '{print $5}' | head -1)
        if [ ! -z "$PID" ] && [ "$PID" != "0" ]; then
            taskkill /PID $PID /F 2>/dev/null
        fi
    else
        echo "‚úÖ Port $port CLEAR"
    fi
done

echo "ÌøóÔ∏è Building AINEON Dashboard..."
cd /c/Users/op/Desktop/aineon/frontend
npm run build

echo "Ì∫Ä DEPLOYING AINEON DASHBOARD FLEET on ports 3000-3010..."
for port in {3000..3010}; do
    npx serve dist -p $port -s &
    echo "Ì≥ç Port $port: AINEON Dashboard deployed"
done

sleep 5

echo "Ì¥ç Verifying deployment..."
for port in {3000..3010}; do
    if curl -s --connect-timeout 2 "http://localhost:$port" > /dev/null; then
        echo "‚úÖ Port $port: LIVE"
    else
        echo "‚ùå Port $port: OFFLINE"
    fi
done

echo "Ìºê OPENING AINEON COMMAND CENTER..."
cmd.exe /c start "http://localhost:3000"
cmd.exe /c start "http://localhost:3001" 
cmd.exe /c start "http://localhost:3002"
cmd.exe /c start "http://localhost:3003"

echo ""
echo "ÌæØ ================================="
echo "Ì∫Ä AINEON DASHBOARD FLEET DEPLOYED!"
echo "ÌæØ ================================="
echo ""
echo "Ì≥ä PRIMARY PORTS:"
echo "   Command Center: http://localhost:3000"
echo "   Live Monitor:   http://localhost:3001"
echo "   AI Terminal:    http://localhost:3002"
echo "   Profit Engine:  http://localhost:3003"
echo ""
echo "Ìª°Ô∏è  RESERVE PORTS: 3004-3010"
echo ""
echo "‚ö° FEATURES:"
echo "   ‚Ä¢ Real-time Profit Pulse"
echo "   ‚Ä¢ Multi-port redundancy"
echo "   ‚Ä¢ Dark theme architecture"
echo "   ‚Ä¢ Card-based dashboard"
echo "   ‚Ä¢ Live WebSocket integration"
echo ""
echo "Ì¥ß MANAGEMENT:"
echo "   View all: netstat -an | grep '3000\|3001\|3002\|3003'"
echo "   Kill all: pkill -f 'serve'"
echo "   Status: curl -I http://localhost:3000"
echo ""
echo "‚úÖ Ports 3000-3010 now dedicated to AINEON Trading Platform"
