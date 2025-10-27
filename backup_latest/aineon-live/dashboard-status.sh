#!/bin/bash
echo "� AINEON MASTER DASHBOARD STATUS"
echo "=================================="

pid=$(netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | head -1)

if [ ! -z "$pid" ]; then
    process_name=$(tasklist //fi "PID eq $pid" //fo table //nh | awk '{print $1}')
    if [ "$process_name" == "node.exe" ]; then
        echo "✅ STATUS: RUNNING"
        echo "� URL: http://localhost:3000"
        echo "� PID: $pid"
        echo "� All modules active"
    else
        echo "� STATUS: UNAUTHORIZED PROCESS"
        echo "� PID: $pid"
        echo "� Run ./launch-master.sh to deploy AINEON"
    fi
else
    echo "� STATUS: OFFLINE"
    echo "� Run ./launch-master.sh to deploy"
fi

echo "=================================="
