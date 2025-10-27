#!/bin/bash
echo "ÌæØ AINEON PORT STATUS - Ports 3000-3010"
echo "==========================================="

for port in {3000..3010}; do
    pid=$(netstat -ano | grep ":$port " | grep LISTEN | awk '{print $5}' | head -1)
    
    if [ ! -z "$pid" ] && [ "$pid" != "0" ]; then
        process_name=$(tasklist //fi "PID eq $pid" //fo table //nh | awk '{print $1}')
        if [ "$process_name" == "node.exe" ]; then
            echo "‚úÖ Port $port: AINEON ACTIVE (PID: $pid)"
        else
            echo "Ì∫® Port $port: UNAUTHORIZED - $process_name (PID: $pid)"
        fi
    else
        echo "Ì¥í Port $port: AVAILABLE for AINEON"
    fi
done

echo "==========================================="
echo "Ìª°Ô∏è  Ports 3000-3010 reserved for AINEON use"
