#!/bin/bash
echo "ÌæØ AINEON MASTER DASHBOARD STATUS"
echo "=================================="

pid=$(netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | head -1)

if [ ! -z "$pid" ]; then
    process_name=$(tasklist //fi "PID eq $pid" //fo table //nh | awk '{print $1}')
    if [ "$process_name" == "node.exe" ]; then
        echo "‚úÖ STATUS: RUNNING"
        echo "Ì≥ç URL: http://localhost:3000"
        echo "Ì∂î PID: $pid"
        echo "Ì∫Ä All modules active"
    else
        echo "Ì∫® STATUS: UNAUTHORIZED PROCESS"
        echo "Ì∂î PID: $pid"
        echo "Ì¥´ Run ./launch-master.sh to deploy AINEON"
    fi
else
    echo "Ì¥¥ STATUS: OFFLINE"
    echo "Ì∫Ä Run ./launch-master.sh to deploy"
fi

echo "=================================="
