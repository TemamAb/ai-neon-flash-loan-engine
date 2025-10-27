<template>
  <div class="module execution-quality">
    <div class="module-header">
      <h3>í³ˆ Execution Quality</h3>
    </div>
    
    <div class="module-content">
      <div class="dex-performance">
        <h4>DEX Performance</h4>
        <div class="dex-list">
          <div class="dex-item">
            <div class="dex-name">Uniswap V3</div>
            <div class="dex-stats">
              <span class="success-rate">99.2%</span>
              <span class="latency">1.8s</span>
            </div>
          </div>
          <div class="dex-item">
            <div class="dex-name">Sushiswap</div>
            <div class="dex-stats">
              <span class="success-rate">98.7%</span>
              <span class="latency">2.3s</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quality-metrics">
        <div class="quality-item">
          <div class="quality-label">Price Impact</div>
          <div class="quality-value">0.08%</div>
        </div>
        <div class="quality-item">
          <div class="quality-label">MEV Protection</div>
          <div class="quality-value">96%</div>
        </div>
        <div class="quality-item">
          <div class="quality-label">Gas Optimization</div>
          <div class="quality-value">23% saved</div>
        </div>
      </div>
      
      <div class="efficiency-score">
        <div class="score-label">Overall Efficiency</div>
        <div class="score-value">92%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExecutionQualityModule'
}
</script>

<style scoped>
.execution-quality {
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

.dex-performance h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.dex-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.dex-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.dex-name {
  font-weight: 500;
}

.dex-stats {
  display: flex;
  gap: 16px;
}

.success-rate {
  color: var(--accent-color);
  font-weight: bold;
}

.latency {
  color: var(--text-secondary);
  font-size: 14px;
}

.quality-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.quality-item {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.quality-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.quality-value {
  font-size: 14px;
  font-weight: 500;
}

.efficiency-score {
  text-align: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.score-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.score-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--accent-color);
}
</style>
