<template>
  <div class="module optimization-engine">
    <div class="module-header">
      <h3>í´§ Optimization Engine</h3>
    </div>
    
    <div class="module-content">
      <div class="optimization-stats">
        <div class="stat">
          <div class="stat-value">15</div>
          <div class="stat-label">Active Strategies</div>
        </div>
        <div class="stat">
          <div class="stat-value">8</div>
          <div class="stat-label">In Research</div>
        </div>
        <div class="stat">
          <div class="stat-value">94.7%</div>
          <div class="stat-label">Backtest Accuracy</div>
        </div>
      </div>
      
      <div class="improvement-metric">
        <div class="improvement-label">Performance Improvement</div>
        <div class="improvement-value">+12.3%</div>
      </div>
      
      <div class="optimization-queue">
        <h4>Active Optimizations</h4>
        <div class="queue-item">
          <div class="queue-name">Genetic Algorithm</div>
          <div class="queue-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 78%"></div>
            </div>
            <span>78%</span>
          </div>
        </div>
        <div class="queue-item">
          <div class="queue-name">Parameter Tuning</div>
          <div class="queue-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 45%"></div>
            </div>
            <span>45%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptimizationEngineModule'
}
</script>

<style scoped>
.optimization-engine {
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

.optimization-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.improvement-metric {
  text-align: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 20px;
}

.improvement-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.improvement-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--accent-color);
}

.optimization-queue h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.queue-item:last-child {
  border-bottom: none;
}

.queue-name {
  font-weight: 500;
}

.queue-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-color);
  border-radius: 3px;
  transition: width 0.3s;
}

.queue-progress span {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 30px;
  text-align: right;
}
</style>
