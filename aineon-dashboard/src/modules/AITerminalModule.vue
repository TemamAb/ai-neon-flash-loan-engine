<template>
  <div class="module ai-terminal">
    <div class="module-header">
      <h3>í·  AI Terminal</h3>
    </div>
    
    <div class="module-content">
      <div class="ai-metrics">
        <div class="ai-metric">
          <div class="metric-value">96.2%</div>
          <div class="metric-label">Pattern Accuracy</div>
        </div>
        <div class="ai-metric">
          <div class="metric-value">94.8%</div>
          <div class="metric-label">Confidence Score</div>
        </div>
        <div class="ai-metric">
          <div class="metric-value">12</div>
          <div class="metric-label">Active Patterns</div>
        </div>
      </div>
      
      <div class="intelligence-status">
        <div class="status-item">
          <div class="status-label">Model Accuracy</div>
          <div class="status-value">97.1%</div>
        </div>
        <div class="status-item">
          <div class="status-label">Learning Rate</div>
          <div class="status-value">+2.3% weekly</div>
        </div>
      </div>
      
      <div class="prediction-analytics">
        <h4>Prediction Performance</h4>
        <div class="prediction-stats">
          <div class="stat">
            <div class="stat-value">89.7%</div>
            <div class="stat-label">Price Accuracy</div>
          </div>
          <div class="stat">
            <div class="stat-value">92.1%</div>
            <div class="stat-label">Volume Prediction</div>
          </div>
          <div class="stat">
            <div class="stat-value">94.3%</div>
            <div class="stat-label">Trend Detection</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AITerminalModule'
}
</script>

<style scoped>
.ai-terminal {
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

.ai-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.ai-metric {
  text-align: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.ai-metric .metric-value {
  font-size: 18px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.ai-metric .metric-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.intelligence-status {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.status-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.status-value {
  font-weight: 500;
}

.prediction-analytics h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.prediction-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.stat .stat-value {
  font-size: 16px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 2px;
}

.stat .stat-label {
  font-size: 11px;
  color: var(--text-secondary);
}
</style>
