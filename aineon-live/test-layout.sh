#!/bin/bash
echo "� AINEON LAYOUT QUICK TEST"
echo "============================"

# Check if development server is running
pid=$(netstat -ano | grep ":3000 " | grep LISTEN | awk '{print $5}' | head -1)

if [ ! -z "$pid" ]; then
    echo "✅ Development server: RUNNING (PID: $pid)"
    echo "� Open: http://localhost:3000"
    echo ""
    echo "� Test the following:"
    echo "   1. Left sidebar navigation"
    echo "   2. Click each module"
    echo "   3. Check theme colors"
    echo "   4. Verify responsive design"
    echo "   5. Test header controls"
else
    echo "❌ Development server: OFFLINE"
    echo "� Run ./dev-layout.sh to start development mode"
fi
