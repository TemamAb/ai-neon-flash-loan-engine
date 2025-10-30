#!/bin/bash

echo "Ì¥ç QUICK PORT SCAN (3000-3010, 5173)"

echo ""
echo "Port  Status      Service"
echo "----  ----------  -------"

for port in 5173 3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010; do
    if netstat -ano 2>/dev/null | grep ":$port " | grep LISTENING > /dev/null; then
        pid=$(netstat -ano | grep ":$port " | grep LISTENING | awk '{print $5}' | head -1)
        echo "$port  ‚ùå OCCUPIED  PID: $pid"
    else
        if [ $port -eq 5173 ]; then
            echo "$port  ‚úÖ VITE      Frontend Dashboard"
        else
            echo "$port  ‚úÖ FREE      Available for backend"
        fi
    fi
done

echo ""
echo "Ì≤° RECOMMENDATION: Use first available port above 3003"
