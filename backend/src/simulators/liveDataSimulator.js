const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  console.log('Client connected to Live Data Simulator');
  
  // Send initial data
  ws.send(JSON.stringify({
    type: 'init',
    profit: 284700,
    accuracy: 98.3,
    health: 99.97
  }));

  // Simulate live updates
  const interval = setInterval(() => {
    const profitChange = (Math.random() - 0.5) * 2000;
    const newProfit = 284700 + profitChange;
    
    ws.send(JSON.stringify({
      type: 'update',
      profit: Math.round(newProfit),
      timestamp: Date.now()
    }));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('íº€ AINEON Live Data Simulator running on ws://localhost:3001');
