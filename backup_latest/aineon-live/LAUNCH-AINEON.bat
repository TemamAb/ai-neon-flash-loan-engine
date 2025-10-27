@echo off
chcp 65001 >nul
echo � AINEON WINDOWS LAUNCHER
echo � Clearing ports 3000-3010...

:: Kill processes on AINEON ports
for /L %%i in (3000,1,3010) do (
    for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%%i " ^| findstr "LISTENING"') do (
        if not "%%p"=="" (
            echo � Killing process on port %%i (PID: %%p)
            taskkill /PID %%p /F >nul 2>&1
        )
    )
)

echo � Building AINEON Dashboard...
cd aineon-live
call npm run build

echo � Starting AINEON on port 3000...
start "" "http://localhost:3000"
call npm run preview -- --port 3000 --host

echo ✅ AINEON DASHBOARD LAUNCHED!
echo � Access at: http://localhost:3000
pause
