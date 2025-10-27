const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const { networkInterfaces } = require('os');

console.log('Ì∫Ä STARTING AINEON INTEGRATED DASHBOARD SYSTEM');
console.log('==============================================');

const app = express();
app.use(cors());
app.use(express.json());

// Root route - FIX for "Cannot GET /"
app.get('/', (req, res) => {
  res.json({
    message: 'Ì∫Ä AINEON Trading System API',
    version: '2.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      dashboard: '/dashboard/metrics',
      strategy: '/strategy/optimize',
      ai: '/ai/decisions/logs'
    },
    timestamp: new Date().toISOString()
  });
});

// Import and initialize dashboard API
const dashboardAPI = require('./api/dashboard-api');
app.use('/dashboard', dashboardAPI);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: ['dashboard', 'websocket', 'trading'],
    port: server.address().port
  });
});

// Dashboard metrics endpoint (direct)
app.get('/dashboard/metrics', (req, res) => {
  console.log('Ì≥ä Dashboard metrics requested');
  
  const mockMetrics = {
    wallet: {
      multiSigStatus: 'Connected',
      connectedWallets: 3,
      securityLevel: 'High',
      balance: 15420.50
    },
    trading: {
      activeTrades: 8,
      successRate: 82.5,
      totalVolume: 125430.75,
      dailyProfit: 3420.25
    },
    monitoring: {
      botsActive: 12,
      systemLoad: 45,
      responseTime: 120,
      uptime: '99.8%'
    },
    optimization: {
      currentStrategy: 'Momentum Arbitrage',
      optimizationProgress: 87,
      improvements: '+5.2%',
      nextOptimization: '2 hours'
    },
    profit: {
      totalProfits: 2147380.50,
      dailyProfit: 3420.25,
      weeklyProfit: 23850.75,
      withdrawalReady: 12500.00
    },
    ai: {
      currentMode: 'AUTONOMOUS',
      confidence: 0.87,
      decisionsToday: 156,
      learningProgress: 92
    },
    security: {
      threatLevel: 'Low',
      activeAlerts: 0,
      lastScan: new Date().toISOString(),
      protectionStatus: 'Active'
    },
    health: {
      systemStatus: 'Optimal',
      cpuUsage: 45,
      memoryUsage: 62,
      networkStatus: 'Stable'
    }
  };
  
  res.json(mockMetrics);
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
app.get('/ai/decisions', (req, res) => {
  console.log('Ì∑† Fetching AI decisions');
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
      },
      {
        id: 3,
        action: 'HOLD',
        symbol: 'SOL/USD',
        confidence: 0.78,
        timestamp: new Date(Date.now() - 600000).toISOString(),
        reasoning: 'Market consolidation phase detected'
      }
    ]
  });
});

// Get local IP address
function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// Start server on available port
function findAvailablePort(startPort = 5000, maxPort = 5010) {
  const net = require('net');
  
  return new Promise((resolve, reject) => {
    function tryPort(port) {
      if (port > maxPort) {
        reject(new Error(`No available ports between ${startPort}-${maxPort}`));
        return;
      }

      const tester = net.createServer();
      tester.listen(port, () => {
        tester.close(() => {
          resolve(port);
        });
      });
      
      tester.on('error', () => {
        tryPort(port + 1);
      });
    }
    
    tryPort(startPort);
  });
}

let server;

async function startServer() {
  try {
    const port = await findAvailablePort(5000, 5010);
    const localIP = getLocalIP();
    
    server = http.createServer(app);
    
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
            const tradingData = {
              profit: (Math.random() * 1000 + 2000).toFixed(2),
              activeTrades: Math.floor(Math.random() * 5) + 1,
              successRate: (Math.random() * 20 + 75).toFixed(1),
              timestamp: new Date().toISOString()
            };
            
            ws.send(JSON.stringify({
              type: 'TRADING_UPDATE',
              payload: tradingData
            }));
          }
        }, 3000),

        ai: setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            const aiData = {
              currentStrategy: 'Momentum Arbitrage',
              confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
              decisionsProcessed: Math.floor(Math.random() * 50) + 100,
              timestamp: new Date().toISOString()
            };
            
            ws.send(JSON.stringify({
              type: 'AI_UPDATE',
              payload: aiData
            }));
          }
        }, 5000),

        security: setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            const securityData = {
              threatLevel: 'Low',
              activeAlerts: 0,
              lastScan: new Date().toISOString()
            };
            
            ws.send(JSON.stringify({
              type: 'SECURITY_UPDATE',
              payload: securityData
            }));
          }
        }, 10000)
      };

      ws.on('close', () => {
        console.log('Ì¥å WebSocket connection closed');
        clearInterval(intervals.trading);
        clearInterval(intervals.ai);
        clearInterval(intervals.security);
      });

      ws.on('error', (error) => {
        console.error('‚ùå WebSocket error:', error);
        clearInterval(intervals.trading);
        clearInterval(intervals.ai);
        clearInterval(intervals.security);
      });
    });

    server.listen(port, () => {
      console.log(`‚úÖ Backend API server running on http://${localIP}:${port}`);
      console.log(`Ì¥å WebSocket server running on ws://${localIP}:${port}/ws`);
      console.log('Ì≥ä Dashboard: http://localhost:' + port + '/dashboard/metrics');
      console.log('Ìø• Health: http://localhost:' + port + '/health');
      console.log('ÌæØ Test root: http://localhost:' + port + '/');
      console.log('‚úÖ INTEGRATED SYSTEM READY');
      console.log('==========================');
    });

  } catch (error) {
    console.error('‚ùå Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();
