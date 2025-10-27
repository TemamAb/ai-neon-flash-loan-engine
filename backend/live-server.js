consconsole.log('íº€ AINEON Live Trading Server: ws://localhost:3004');

const tradingData = {
  profit: 284700,
  ethPrice: 3250.42,
  activeTrades: 12
};

wss.on('connection', (ws) => {
  console.log('í³¡ Dashboard Connected');
  
  const interval = setInterval(() => {
    tradingData.profit += (Math.random() - 0.5) * 2500;
    tradingData.ethPrice += (Math.random() - 0.5) * 50;
    tradingData.activeTrades = 10 + Math.floor(Math.random() * 5);
    
    ws.send(JSON.stringify({
      profit: "+$" + (tradingData.profit / 1000).toFixed(1) + "K",
      ethPrice: "$" + tradingData.ethPrice.toFixed(2),
      activeTrades: tradingData.activeTrades,
      timestamp: Date.now()
    }));
  }, 1000);

  ws.on('close', () => clearInterval(interval));
});
