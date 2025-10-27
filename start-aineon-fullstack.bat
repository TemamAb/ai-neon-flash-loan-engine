@echo off
echo � STARTING AINEON FULL STACK...

echo � Starting Master Dashboard Backend...
cd backend
start /B node master-dashboard-server.js

timeout /t 3 /nobreak > nul

echo � Starting Frontend Development Server...
cd ..\frontend
npm run dev

echo ✅ AINEON FULL STACK STARTED!
echo � Backend: http://localhost:3000
echo � Frontend: Check the new terminal window for the frontend URL
echo � WebSocket: ws://localhost:3001
