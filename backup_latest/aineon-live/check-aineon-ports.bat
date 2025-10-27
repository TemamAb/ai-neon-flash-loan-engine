@echo off
chcp 65001 >nul
echo � AINEON PORT STATUS - Ports 3000-3010
echo ===========================================

for /L %%i in (3000,1,3010) do (
    set "port_status=� Port %%i: AVAILABLE"
    
    for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%%i " ^| findstr "LISTENING"') do (
        if not "%%p"=="" (
            for /f "tokens=1" %%c in ('tasklist /fi "PID eq %%p" /fo table /nh') do (
                if "%%c"=="node.exe" (
                    set "port_status=✅ Port %%i: AINEON ACTIVE (PID: %%p)"
                ) else (
                    set "port_status=� Port %%i: UNAUTHORIZED - PID: %%p"
                )
            )
        )
    )
    
    echo %port_status%
)

echo ===========================================
echo �️  Ports 3000-3010 reserved for AINEON use
pause
