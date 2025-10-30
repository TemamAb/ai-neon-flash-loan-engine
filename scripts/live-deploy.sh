#!/usr/bin/env bash
# ====================================================
# AINEON LIVE DASHBOARD - ONE COMMAND DEPLOY (Windows Git Bash)
# ====================================================
set -e

echo "Ì¥¥ Killing processes on ports 3000‚Äì3010..."
for port in {3000..3010}; do
  pid=$(netstat -ano | grep ":$port " | awk '{print $5}' | tr -d '\r')
  if [ ! -z "$pid" ]; then
    echo "Killing PID $pid on port $port"
    cmd.exe /c "taskkill /PID $pid /F"
  fi
done
echo "‚úÖ All ports 3000‚Äì3010 cleared."

# -----------------------------
# 1Ô∏è‚É£ Start backend servers
# -----------------------------
ROOT_DIR=$(pwd)
cd "$ROOT_DIR"

# Start main orchestrator (API)
if [ -f main-orchestrator.js ]; then
  echo "‚ö° Starting main-orchestrator.js (API 3000)..."
  node main-orchestrator.js &
  echo "main-orchestrator.js PID: $!"
else
  echo "‚ùå main-orchestrator.js not found!"
fi

# Start metrics server (WebSocket / metrics)
if [ -f metrics-server.js ]; then
  echo "‚ö° Starting metrics-server.js (WS 3001)..."
  node metrics-server.js &
  echo "metrics-server.js PID: $!"
else
  echo "‚ùå metrics-server.js not found!"
fi

# -----------------------------
# 2Ô∏è‚É£ Serve frontend dashboard
# -----------------------------
cd frontend
echo "Ì≥å Serving frontend dashboard at http://localhost:3002/master-dashboard.html"
python -m http.server 3002 &

# -----------------------------
# 3Ô∏è‚É£ Open browser automatically
# -----------------------------
cmd.exe /c start http://localhost:3002/master-dashboard.html

echo "‚úÖ LIVE Aineon Dashboard deployed successfully!"
echo "Ì≤° Logs for backend are visible in this terminal."
