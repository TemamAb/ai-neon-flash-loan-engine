<template>
  <div class="live-trading">
    <!-- Enhanced Header with Live Data -->
    <div class="status-bar">
      <div class="status-item">
        <span class="label">ETH Price:</span>
        <span class="value">{{ ethPrice }}</span>
      </div>
      <div class="status-item">
        <span class="label">Active Trades:</span>
        <span class="value">{{ activeTrades }}</span>
      </div>
      <div class="status-item">
        <span class="label">Live PNL:</span>
        <span class="value" :class="{ positive: isProfitPositive }">{{ liveProfit }}</span>
      </div>
    </div>

    <!-- Trading Controls -->
    <div class="trading-controls">
      <button class="btn btn-primary" @click="executeTrade('BUY')">íº€ BUY</button>
      <button class="btn btn-danger" @click="executeTrade('SELL')">í³‰ SELL</button>
      <button class="btn btn-warning" @click="emergencyStop">í»‘ E-STOP</button>
    </div>

    <!-- Advanced Metrics -->
    <div class="advanced-metrics">
      <div class="metric-card">
        <div class="metric-title">Sharp Ratio</div>
        <div class="metric-value">2.8</div>
        <div class="metric-trend up">+0.3</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Max Drawdown</div>
        <div class="metric-value">-4.2%</div>
        <div class="metric-trend stable">Stable</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Win Rate</div>
        <div class="metric-value">76.5%</div>
        <div class="metric-trend up">+2.1%</div>
      </div>
    </div>

    <!-- Connection Status -->
    <div class="connection-status" :class="connectionStatus">
      WebSocket: {{ connectionStatus.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveTrading',
  data() {
    return {
      ws: null,
      ethPrice: '$3,250.42',
      activeTrades: 12,
      liveProfit: '+$1.4K',
      connectionStatus: 'connecting',
      isProfitPositive: true
    }
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.ws = new WebSocket('ws://localhost:3004');
      
      this.ws.onopen = () => {
        this.connectionStatus = 'connected';
        console.log('âœ… Connected to AINEON Trading Server');
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.updateTradingData(data);
      };
      
      this.ws.onclose = () => {
        this.connectionStatus = 'disconnected';
        setTimeout(() => this.connectWebSocket(), 3000);
      };
      
      this.ws.onerror = (error) => {
        this.connectionStatus = 'error';
        console.error('WebSocket error:', error);
      };
    },
    
    updateTradingData(data) {
      if (data.type === 'UPDATE') {
        this.liveProfit = data.profit;
        this.ethPrice = data.ethPrice;
        this.activeTrades = data.activeTrades;
        this.isProfitPositive = data.profit.includes('+');
      }
    },
    
    executeTrade(side) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'TRADE_EXECUTE',
          side: side,
          pair: 'ETH/USD',
          amount: 0.1,
          timestamp: Date.now()
        }));
        console.log(`í³Š ${side} order sent`);
      }
    },
    
    emergencyStop() {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'EMERGENCY_STOP',
          timestamp: Date.now()
        }));
        console.log('í»‘ EMERGENCY STOP ACTIVATED');
      }
    }
  },
  
  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
</script>

<style scoped>
.live-trading {
  padding: 1rem;
}

.status-bar {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--aineon-card);
  border-radius: 8px;
}

.status-item {
  display: flex;
  flex-direction: column;
}

.status-item .label {
  font-size: 0.8rem;
  color: #9ca3af;
}

.status-item .value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--aineon-primary);
}

.status-item .value.positive {
  color: var(--aineon-primary);
}

.status-item .value.negative {
  color: #ef4444;
}

.trading-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--aineon-primary);
  color: var(--aineon-dark);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.advanced-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: var(--aineon-card);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--aineon-border);
}

.metric-title {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--aineon-primary);
  margin-bottom: 0.5rem;
}

.connection-status {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.connection-status.connected {
  background: rgba(0, 255, 136, 0.1);
  color: var(--aineon-primary);
  border: 1px solid var(--aineon-primary);
}

.connection-status.connecting {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.connection-status.disconnected {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid #ef4444;
}
</style>
