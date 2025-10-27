#!/bin/bash
echo "� AINEON LAYOUT DEVELOPMENT MODE"
echo "=================================="
echo "�� Testing: Navigation System & Theme"
echo "� NOT production deployment"

# Clear port 3000 for clean development
echo "� Preparing development environment..."
netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | xargs -r taskkill //F //PID 2>/dev/null

echo "� Starting Vite development server..."
echo "� Development URL: http://localhost:3000"
echo ""
echo "� TESTING FOCUS:"
echo "   ✅ Left sidebar navigation"
echo "   ✅ Color theme & styling"
echo "   ✅ Module placeholders"
echo "   ✅ Responsive layout"
echo "   ✅ Header metrics"
echo ""
echo "� NOT testing:"
echo "   ❌ Module functionality"
echo "   ❌ Live trading data"
echo "   ❌ Wallet connections"
echo "   ❌ AI integrations"
echo ""
echo "� This is HOT-RELOAD development mode"
echo "   Changes will auto-refresh in browser"

cd aineon-live
npm run dev -- --port 3000 --host
