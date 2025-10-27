<template>
  <div class="module trading-parameters">
    <div class="module-header">
      <h3>⚙️ Trading Parameters</h3>
    </div>
    
    <div class="module-content">
      <div class="performance-metrics">
        <div class="metric-card">
          <div class="metric-value">98.7%</div>
          <div class="metric-label">Success Rate</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">450ms</div>
          <div class="metric-label">Avg Latency</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">+50%</div>
          <div class="metric-label">Profit vs Target</div>
        </div>
      </div>
      
      <div class="parameter-controls">
        <div class="control-group">
          <label class="control-label">Max Position Size</label>
          <div class="control-value">$500,000</div>
        </div>
        
        <div class="control-group">
          <label class="control-label">Slippage Tolerance</label>
          <div class="control-value">0.5%</div>
        </div>
        
        <div class="control-group">
          <label class="control-label">Gas Price Limit</label>
          <div class="control-value">150 Gwei</div>
        </div>
        
        <div class="control-group">
          <label class="control-label">Min Profit Threshold</label>
          <div class="control-value">$1,000</div>
        </div>
      </div>
      
      <div class="risk-indicator">
        <div class="risk-label">Risk Score</div>
        <div class="risk-bar">
          <div class="risk-fill" :style="{ width: '72%' }"></div>
        </div>
        <div class="risk-value">7.2/10</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradingParametersModule'
}
</script>

<style scoped>
.trading-parameters {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.module-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.module-content {
  padding: 20px;
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.metric-card {
  text-align: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.metric-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.metric-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.parameter-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.control-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.control-value {
  font-weight: 500;
}

.risk-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.risk-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.risk-bar {
  flex: 1;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.risk-fill {
  height: 100%;
  background: var(--accent-color);
  border-radius: 3px;
  transition: width 0.3s;
}

.risk-value {
  font-weight: bold;
  font-size: 14px;
}
</style>
