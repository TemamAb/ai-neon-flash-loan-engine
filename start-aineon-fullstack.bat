@echo off
echo íº€ STARTING AINEON FULL STACK...

echo í³¡ Starting Master Dashboard Backend...
cd backend
start /B node master-dashboard-server.js

timeout /t 3 /nobreak > nul

echo í¾¨ Starting Frontend Development Server...
cd ..\frontend
npm run dev

echo âœ… AINEON FULL STACK STARTED!
echo í³Š Backend: http://localhost:3000
echo í¾¨ Frontend: Check the new terminal window for the frontend URL
echo í´Œ WebSocket: ws://localhost:3001
