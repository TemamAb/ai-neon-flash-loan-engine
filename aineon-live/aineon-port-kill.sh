#!/bin/bash
echo "í´« KILLING PROCESSES ON AINEON PORTS (3000-3010)"

for port in {3000..3010}; do
    # Find PID using netstat (Windows/Git Bash)
    pid=$(netstat -ano | grep ":$port " | grep LISTEN | awk '{print $5}' | head -1)
    
    if [ ! -z "$pid" ] && [ "$pid" != "0" ]; then
        echo "íº¨ Killing process on port $port (PID: $pid)"
        taskkill //PID $pid //F 2>/dev/null
    fi
done

echo "âœ… All AINEON ports cleared!"
