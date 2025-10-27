const express = require('express');
const cors = require('cors');
const DashboardWebSocketServer = require('./websocket/dashboard-stream');
const dashboardApi = require('./api/dashboard-metrics');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('í¿—ï¸ STARTING AINEON INTEGRATED DASHBOARD SYSTEM');
console.log('==============================================');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', dashboardApi);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'AINEON Integrated Dashboard',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    integrations: [
      'multi-sig-manager',
      'performance-monitor', 
      'pattern-analyzer',
      'profit-withdrawal',
      'enhanced-security',
      'health-monitor',
      'strategy-selector',
      'execution-timing'
    ]
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'íº€ AINEON Integrated Dashboard API',
    version: '2.0.0',
    status: 'OPERATIONAL',
    endpoints: {
      metrics: 'GET /api/metrics',
      aiAutonomy: 'POST /api/ai/autonomy/enable',
      optimize: 'POST /api/ai/optimize/parameters',
      health: 'GET /health'
    },
    realTimeUpdates: 'WebSocket: ws://localhost:8081'
  });
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`í³Š Integrated Dashboard API: http://localhost:${PORT}`);
  console.log(`í¹º Health Check: http://localhost:${PORT}/health`);
  console.log(`í³ˆ Metrics: http://localhost:${PORT}/api/metrics`);
});

// Start WebSocket server
const wsServer = new DashboardWebSocketServer();
wsServer.start();

console.log('âœ… INTEGRATED SYSTEM READY');
console.log('==========================');

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    wsServer.stop();
    console.log('Integrated system shut down');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    wsServer.stop();
    console.log('Integrated system shut down');
    process.exit(0);
  });
});
