#!/bin/bash
echo "í¾¨ AINEON LAYOUT DEVELOPMENT MODE"
echo "=================================="
echo "ï¿½ï¿½ Testing: Navigation System & Theme"
echo "íº« NOT production deployment"

# Clear port 3000 for clean development
echo "í´§ Preparing development environment..."
netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | xargs -r taskkill //F //PID 2>/dev/null

echo "í³¦ Starting Vite development server..."
echo "í³ Development URL: http://localhost:3000"
echo ""
echo "í¾¯ TESTING FOCUS:"
echo "   âœ… Left sidebar navigation"
echo "   âœ… Color theme & styling"
echo "   âœ… Module placeholders"
echo "   âœ… Responsive layout"
echo "   âœ… Header metrics"
echo ""
echo "íº« NOT testing:"
echo "   âŒ Module functionality"
echo "   âŒ Live trading data"
echo "   âŒ Wallet connections"
echo "   âŒ AI integrations"
echo ""
echo "í²¡ This is HOT-RELOAD development mode"
echo "   Changes will auto-refresh in browser"

cd aineon-live
npm run dev -- --port 3000 --host
