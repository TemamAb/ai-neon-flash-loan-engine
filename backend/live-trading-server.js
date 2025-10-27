const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });

console.log('íº€ AINEON Live Trading Server started on port 3004');

const tradingData = {
  profit: 284700,
  accuracy: 98.3,
  health: 99.97,
  activeBots: 47,
  totalBots: 50,
  dailyVolume: 12400000,
  ethPrice: 3250.42,
  activeTrades: 12
};

wss.on('connection', (ws) => {
  console.log('í³¡ Trading Dashboard Connected');
  
  // Send initial data
  ws.send(JSON.stringify({
    type: 'INIT',
    ...tradingData
  }));

  // Real-time simulation
  const interval = setInterval(() => {
    // Simulate market movements
    tradingData.profit += (Math.random() - 0.5) * 2500;
    tradingData.accuracy = 98 + Math.random() * 0.6;
    tradingData.ethPrice += (Math.random() - 0.5) * 50;
    tradingData.activeTrades = 10 + Math.floor(Math.random() * 5);
    tradingData.dailyVolume += (Math.random() - 0.5) * 100000;
    
    // Simulate bot status changes
    if (Math.random() > 0.95) {
      tradingData.activeBots = Math.min(tradingData.totalBots, tradingData.activeBots + 1);
    } else if (Math.random() > 0.98) {
      tradingData.activeBots = Math.max(0, tradingData.activeBots - 1);
    }

    ws.send(JSON.stringify({
      type: 'UPDATE',
      profit: `+$${(tradingData.profit / 1000).toFixed(1)}K`,
      accuracy: `${tradingData.accuracy.toFixed(1)}%`,
      health: `${tradingData.health.toFixed(2)}%`,
      bots: `${tradingData.activeBots}/${tradingData.totalBots}`,
      volume: `$${(tradingData.dailyVolume / 1000000).toFixed(1)}M`,
      ethPrice: `$${tradingData.ethPrice.toFixed(2)}`,
      activeTrades: tradingData.activeTrades,
      timestamp: Date.now()
    }));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('í³¡ Trading Dashboard Disconnected');
  });
});
