<template>
  <div class="module live-monitoring">
    <div class="module-header">
      <h3>Ì±ÅÔ∏è Live Monitoring</h3>
    </div>
    
    <div class="module-content">
      <div class="bot-army-status">
        <div class="bot-summary">
          <div class="bot-count">42/50</div>
          <div class="bot-label">Active Bots</div>
        </div>
        <div class="bot-metrics">
          <div class="bot-metric">
            <div class="metric-value">8.7/10</div>
            <div class="metric-label">Team Synergy</div>
          </div>
          <div class="bot-metric">
            <div class="metric-value">99.4%</div>
            <div class="metric-label">Uptime</div>
          </div>
        </div>
      </div>
      
      <div class="bot-breakdown">
        <div class="bot-type">
          <div class="type-name">Seekers</div>
          <div class="type-stats">
            <span class="count">42 active</span>
            <span class="accuracy">96.2% acc</span>
          </div>
        </div>
        <div class="bot-type">
          <div class="type-name">Captain</div>
          <div class="type-stats">
            <span class="count">1 active</span>
            <span class="accuracy">98.7% acc</span>
          </div>
        </div>
        <div class="bot-type">
          <div class="type-name">Relayers</div>
          <div class="type-stats">
            <span class="count">15 active</span>
            <span class="accuracy">99.1% acc</span>
          </div>
        </div>
      </div>
      
      <div class="system-health">
        <div class="health-item">
          <div class="health-label">CPU Usage</div>
          <div class="health-value">68%</div>
        </div>
        <div class="health-item">
          <div class="health-label">Memory</div>
          <div class="health-value">4.2/8GB</div>
        </div>
        <div class="health-item">
          <div class="health-label">Network</div>
          <div class="health-value">45ms</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveMonitoringModule'
}
</script>

<style scoped>
.live-monitoring {
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

.bot-army-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.bot-summary {
  text-align: center;
}

.bot-count {
  font-size: 24px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.bot-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.bot-metrics {
  display: flex;
  gap: 20px;
}

.bot-metric {
  text-align: center;
}

.bot-metric .metric-value {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
}

.bot-metric .metric-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.bot-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.bot-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.type-name {
  font-weight: 500;
}

.type-stats {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.count {
  color: var(--text-primary);
}

.accuracy {
  color: var(--accent-color);
  font-weight: 500;
}

.system-health {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.health-item {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.health-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.health-value {
  font-size: 14px;
  font-weight: 500;
}
</style>
