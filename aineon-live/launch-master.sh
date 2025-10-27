#!/bin/bash
echo "� AINEON MASTER DASHBOARD - PORT 3000"
echo "� Single Command Center | All Modules Integrated"

# Clear port
pid=$(netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | head -1)
[ ! -z "$pid" ] && taskkill //PID $pid //F 2>/dev/null

# Build and launch
cd aineon-live
echo "� Building master dashboard..."
npm run build

echo "� Launching MASTER DASHBOARD..."
echo "� http://localhost:3000"

# Launch and open browser
npm run preview -- --port 3000 --host &
sleep 3
start "http://localhost:3000"

echo "✅ MASTER DASHBOARD DEPLOYED!"
echo "� All 9 modules integrated in single command center"
wait
