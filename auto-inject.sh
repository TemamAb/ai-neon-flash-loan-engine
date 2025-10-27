#!/bin/bash
echo "ÌæØ STARTING AUTOMATED REAL DATA INJECTION..."

# Create the JavaScript injection file
cat > automated-injection.js << 'SCRIPT_EOF'
// Ì∫Ä AUTOMATED REAL DATA INJECTION
(function() {
    console.log('ÌæØ INJECTING REAL ARBITRAGE DATA...');
    
    // Fetch real data from AINEON backend
    Promise.all([
        fetch('http://localhost:3000/api/trading/performance').then(r => r.json()),
        fetch('http://localhost:3000/api/modules/status').then(r => r.json())
    ]).then(([performance, modules]) => {
        
        // Create real data overlay
        const overlay = document.createElement('div');
        overlay.id = 'aineon-real-data-overlay';
        overlay.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            color: #00ff00;
            padding: 20px;
            border: 3px solid #00ff00;
            border-radius: 10px;
            z-index: 10000;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            max-width: 350px;
            box-shadow: 0 0 20px #00ff00;
        \`;
        
        overlay.innerHTML = \`
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #00ff00;">Ì∫Ä REAL BACKEND DATA</h3>
                <div style="font-size: 12px; color: #00ffff;">Live from AINEON API</div>
            </div>
            <div style="line-height: 1.6;">
                <div>Ì≤∞ Today's Profit: <strong style="color: #00ff00;">\$\${performance.profit_today.toLocaleString()}</strong></div>
                <div>Ì¥ñ AI Confidence: <strong style="color: #00ff00;">\${(performance.ai_confidence * 100).toFixed(1)}%</strong></div>
                <div>Ì¥ç Opportunities: <strong style="color: #00ff00;">\${performance.active_opportunities}</strong></div>
                <div>‚ö° Active Bots: <strong style="color: #00ff00;">\${modules.bot_monitoring.active_bots}</strong></div>
                <div>Ì≥à Success Rate: <strong style="color: #00ff00;">\${(modules.bot_monitoring.success_rate * 100).toFixed(1)}%</strong></div>
            </div>
            <div style="margin-top: 15px; text-align: center;">
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #ff4444; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                    ‚ùå Close
                </button>
            </div>
        \`;
        
        document.body.appendChild(overlay);
        console.log('‚úÖ REAL DATA INJECTED: \$\${performance.profit_today} profit, \${performance.active_opportunities} opportunities');
        
    }).catch(error => {
        console.error('‚ùå Injection failed:', error);
    });
})();
SCRIPT_EOF

echo "Ì≥Å Injection script created: automated-injection.js"

# Start local server to serve the injection script
echo "Ìºê Starting injection server on port 8888..."
python3 -m http.server 8888 > /dev/null 2>&1 &
SERVER_PID=$!

echo ""
echo "=================================================="
echo "Ì∫Ä REAL DATA INJECTION READY!"
echo "=================================================="
echo ""
echo "Ì≥ä YOUR REAL DATA:"
curl -s http://localhost:3000/api/trading/performance | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'   Ì≤∞ Profit Today: \$\{data[\"profit_today\"]:,}')
print(f'   Ì¥ñ AI Confidence: {data[\"ai_confidence\"]*100:.1f}%')
print(f'   Ì¥ç Opportunities: {data[\"active_opportunities\"]}')
"
echo ""
echo "ÌæØ INJECTION METHODS:"
echo ""
echo "METHOD 1 - ONE-CLICK BOOKMARK:"
echo "  1. Open: http://localhost:8080"
echo "  2. Press F12 ‚Üí Console"
echo "  3. Paste this:"
echo "     fetch('http://localhost:8888/automated-injection.js').then(r=>r.text()).then(eval)"
echo ""
echo "METHOD 2 - DIRECT URL:"
echo "  Visit this in your browser:"
echo "  javascript:fetch('http://localhost:8888/automated-injection.js').then(r=>r.text()).then(eval)"
echo ""
echo "METHOD 3 - QUICK TEST:"
echo "  Run this command for instant verification:"
echo "  curl -s http://localhost:3000/api/trading/performance | grep -o '\"profit_today\":[0-9]*'"
echo ""
echo "Ì¥Ñ Server running... Press Ctrl+C to stop"
echo ""

# Wait for user input or keep running
wait $SERVER_PID
