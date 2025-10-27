@echo off
chcp 65001 >nul
echo Ì∫Ä AINEON WINDOWS LAUNCHER
echo Ì¥´ Clearing ports 3000-3010...

:: Kill processes on AINEON ports
for /L %%i in (3000,1,3010) do (
    for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%%i " ^| findstr "LISTENING"') do (
        if not "%%p"=="" (
            echo Ì∫® Killing process on port %%i (PID: %%p)
            taskkill /PID %%p /F >nul 2>&1
        )
    )
)

echo Ì≥¶ Building AINEON Dashboard...
cd aineon-live
call npm run build

echo Ìºê Starting AINEON on port 3000...
start "" "http://localhost:3000"
call npm run preview -- --port 3000 --host

echo ‚úÖ AINEON DASHBOARD LAUNCHED!
echo ÌæØ Access at: http://localhost:3000
pause
