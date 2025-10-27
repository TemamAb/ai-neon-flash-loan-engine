#!/bin/bash
echo "Ì∫Ä AINEON QUICK LAUNCH - GIT BASH"
echo "Ì¥´ Clearing ports..."

# Kill existing processes
for port in {3000..3010}; do
    pid=$(netstat -ano | grep ":$port " | grep LISTEN | awk '{print $5}' | head -1)
    [ ! -z "$pid" ] && taskkill //PID $pid //F 2>/dev/null
done

echo "Ì≥¶ Building dashboard..."
cd aineon-live
npm run build

echo "Ìºê Launching AINEON on port 3000..."
echo "Ì∂•Ô∏è  Browser will open automatically..."

# Start server and open browser
npm run preview -- --port 3000 --host &
sleep 3
start "http://localhost:3000"

echo "‚úÖ AINEON DASHBOARD RUNNING!"
echo "ÌæØ Access at: http://localhost:3000"
echo "Ì≤° Press Ctrl+C to stop"
wait
