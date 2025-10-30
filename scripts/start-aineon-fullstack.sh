#!/bin/bash
echo "íº€ STARTING AINEON FULL STACK..."

# Kill existing processes on ports 3000-3010
for port in {3000..3010}; do
  lsof -ti:$port | xargs kill -9 2>/dev/null
done

# Start backend
echo "í³¡ Starting Master Dashboard Backend..."
cd backend
node master-dashboard-server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "í¾¨ Starting Frontend Development Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "âœ… AINEON FULL STACK STARTED!"
echo "í³Š Backend: http://localhost:3000"
echo "í¾¨ Frontend: http://localhost:5173 (or your Vite port)"
echo "í´Œ WebSocket: ws://localhost:3001"

# Handle cleanup
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
