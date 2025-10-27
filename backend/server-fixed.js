const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

console.log('Ì∫Ä STARTING AINEON INTEGRATED DASHBOARD SYSTEM');
console.log('==============================================');

const app = express();
app.use(cors());
app.use(express.json());

// Import and initialize dashboard API
const dashboardAPI = require('./api/dashboard-api');
app.use('/dashboard', dashboardAPI);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: ['dashboard', 'websocket', 'trading']
  });
});

// Strategy optimization endpoint
app.post('/strategy/optimize', (req, res) => {
  console.log('ÌæØ Strategy optimization requested');
  // Simulate optimization process
  setTimeout(() => {
    res.json({
      status: 'optimized',
      improvements: {
        successRate: '+5.2%',
        riskAdjusted: '+3.8%',
        executionSpeed: '+12.1%'
      },
      timestamp: new Date().toISOString()
    });
  }, 2000);
});

// AI autonomy endpoints
app.post('/ai/autonomy/enable', (req, res) => {
  console.log('Ì¥ñ Full AI autonomy enabled');
  res.json({
    status: 'autonomous',
    mode: 'FULL_AI',
    timestamp: new Date().toISOString()
  });
});

app.post('/ai/mode', (req, res) => {
  const { mode } = req.body;
  console.log(`ÌæØ AI mode changed to: ${mode}`);
  res.json({
    status: 'updated',
    mode: mode,
    timestamp: new Date().toISOString()
  });
});

// AI decisions endpoint
app.get('/ai/decisions/logs', (req, res) => {
  console.log('Ì∑† Fetching AI decision logs');
  res.json({
    decisions: [
      {
        id: 1,
        action: 'BUY',
        symbol: 'ETH/USD',
        confidence: 0.87,
        timestamp: new Date().toISOString(),
        reasoning: 'Bullish pattern detected with 87% confidence'
      },
      {
        id: 2,
        action: 'SELL',
        symbol: 'BTC/USD', 
        confidence: 0.92,
        timestamp: new Date(Date.now() - 300000).toISOString(),
        reasoning: 'Resistance level reached with 92% confidence'
      }
    ]
  });
});

// Start server on available port
function startServer(port = 5000) {
  const server = http.createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocket.Server({ 
    server,
    path: '/ws'
  });

  wss.on('connection', (ws) => {
    console.log('Ì¥å New WebSocket connection established');
    
    // Send initial connection message
    ws.send(JSON.stringify({
      type: 'CONNECTION_ESTABLISHED',
      payload: { message: 'Connected to AINEON Trading System' }
    }));

    // Simulate real-time data updates
    const intervals = {
      trading: setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'TRADING_UPDATE',
            payload: {
              profit: (Math.random() * 1000 + 2000).toFixed(2),
              activeTrades: Math.floor(Math.random() * 5) + 1,
              successRate: (Math.random() * 20 + 75).toFixed(1),
              timestamp: new Date().toISOString()
            }
          }));
        }
      }, 3000),

      ai: setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'AI_UPDATE',
            payload: {
              currentStrategy: 'Momentum Arbitrage',
              confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
              decisionsProcessed: Math.floor(Math.random() * 50) + 100,
              timestamp: new Date().toISOString()
            }
          }));
        }
      }, 5000)
    };

    ws.on('close', () => {
      console.log('Ì¥å WebSocket connection closed');
      clearInterval(intervals.trading);
      clearInterval(intervals.ai);
    });

    ws.on('error', (error) => {
      console.error('‚ùå WebSocket error:', error);
      clearInterval(intervals.trading);
      clearInterval(intervals.ai);
    });
  });

  server.listen(port, () => {
    console.log(`‚úÖ Backend API server running on port ${port}`);
    console.log(`Ì¥å WebSocket server running on port ${port}/ws`);
    console.log('‚úÖ INTEGRATED SYSTEM READY');
    console.log('==========================');
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`‚ö†Ô∏è  Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('‚ùå Server error:', error);
    }
  });
}

// Start the server
startServer(5000);
