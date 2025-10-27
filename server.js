const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (for dashboard.html)
app.use(express.static('.'));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OPERATIONAL', 
    service: 'AINEON Backend API',
    port: 3000,
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    deployment: 'UNIFIED_DASHBOARD'
  });
});

// Modules status endpoint
app.get('/api/modules/status', (req, res) => {
  res.json({
    ai_terminal: { status: "ACTIVE", accuracy: 0.94, version: "2.1.0" },
    bot_monitoring: { active_bots: 5, success_rate: 0.87, total_trades: 1247 },
    profit_management: { total: 147382, reinvested: 117905, daily_target: 200000 },
    optimization: { score: 0.89, learning: 0.76, learningTarget: 100 },
    security: { threats: 0, exposure: 0.15, last_scan: new Date().toISOString() },
    performance: { health: 1.0, uptime: 0.999, response_time: 234 },
    wallet: { balance: 2400000, status: "SECURE", multisig: true },
    strategies: { active: 2, performance: 0.85, total_strategies: 8 }
  });
});

// Trading performance endpoint
app.get('/api/trading/performance', (req, res) => {
  res.json({
    profit_today: 147382,
    profit_last_hour: 18293,
    profit_weekly: 892347,
    ai_confidence: 0.94,
    active_opportunities: 47,
    success_rate: 0.87,
    avg_execution_time: 234,
    gas_saved: 2400,
    total_trades: 1247,
    win_rate: 0.87
  });
});

// Blockchain status endpoint
app.get('/api/blockchain/status', (req, res) => {
  res.json({
    chains: [
      { name: "Ethereum", connected: true, latency: 45, block: 18459283 },
      { name: "BSC", connected: true, latency: 32, block: 32849213 },
      { name: "Polygon", connected: true, latency: 28, block: 49218421 },
      { name: "Arbitrum", connected: true, latency: 38, block: 12849213 },
      { name: "Optimism", connected: true, latency: 41, block: 89218421 }
    ],
    total_opportunities: 47,
    cross_chain_arbitrage: 12
  });
});

// Wallet status endpoint
app.get('/api/wallet/status', (req, res) => {
  res.json({
    address: "0xd6Ef692B34c14000912f429ed503685cBD9C52E0",
    balance: 2400000,
    multisig_status: "ACTIVE",
    transactions_today: 23,
    total_assets: 3,
    security_score: 0.95
  });
});

// Engine status endpoint
app.get('/api/engine/status', (req, res) => {
  res.json({
    engine: "RUNNING",
    ai_core: "ACTIVE",
    version: "2.0.0",
    uptime: 86400,
    mode: "AI_MAX",
    performance: "OPTIMAL",
    last_optimization: new Date().toISOString()
  });
});

// Risk calculation endpoint
app.post('/api/risk/calculate', (req, res) => {
  const { riskLevel } = req.body;
  const presets = {
    LOW: { 
      maxPositionSize: 100000, 
      stopLossThreshold: -0.02, 
      dailyLossLimit: 10000, 
      leverageMultiplier: 1,
      expectedProfitPerHour: 5000,
      confidenceThreshold: 90,
      riskScore: 0.2
    },
    MEDIUM: { 
      maxPositionSize: 500000, 
      stopLossThreshold: -0.05, 
      dailyLossLimit: 50000, 
      leverageMultiplier: 3,
      expectedProfitPerHour: 15000,
      confidenceThreshold: 75,
      riskScore: 0.5
    },
    HIGH: { 
      maxPositionSize: 2000000, 
      stopLossThreshold: -0.10, 
      dailyLossLimit: 200000, 
      leverageMultiplier: 10,
      expectedProfitPerHour: 50000,
      confidenceThreshold: 60,
      riskScore: 0.8
    }
  };
  res.json(presets[riskLevel] || presets.MEDIUM);
});

// Serve dashboard.html as root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`íº€ AINEON Unified Dashboard Backend running on port ${PORT}`);
  console.log(`í³Š Dashboard: http://localhost:${PORT}`);
});
