#!/bin/bash
echo "� STARTING AINEON FULL STACK..."

# Kill existing processes on ports 3000-3010
for port in {3000..3010}; do
  lsof -ti:$port | xargs kill -9 2>/dev/null
done

# Start backend
echo "� Starting Master Dashboard Backend..."
cd backend
node master-dashboard-server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "� Starting Frontend Development Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ AINEON FULL STACK STARTED!"
echo "� Backend: http://localhost:3000"
echo "� Frontend: http://localhost:5173 (or your Vite port)"
echo "� WebSocket: ws://localhost:3001"

# Handle cleanup
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
