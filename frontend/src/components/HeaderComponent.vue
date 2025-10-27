<template>
  <header class="aineon-header">
    <div class="header-brand">
      <div class="logo">AINEON TRADING</div>
    </div>
    
    <div class="header-stats">
      <div class="profit-pulse">
        <span class="pulse-indicator"></span>
        <span class="profit-label">LIVE PROFIT PULSE:</span>
        <span class="profit-value">{{ liveProfit }}</span>
        <div class="profit-metric">Total Profit / {{ deploymentDays }} Days</div>
      </div>
    </div>

    <div class="header-controls">
      <select v-model="selectedPair" class="dropdown">
        <option value="ETH/USD">ETH/USD</option>
      </select>
      
      <select v-model="refreshRate" class="dropdown">
        <option value="1000">1s</option>
        <option value="5000">5s</option>
        <option value="10000">10s</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      liveProfit: '+$284.7K',
      deploymentDays: 47,
      selectedPair: 'ETH/USD',
      refreshRate: '1000'
    }
  }
}
</script>

<style scoped>
.aineon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: var(--aineon-card);
  border-bottom: 1px solid var(--aineon-border);
  height: 60px;
}

.logo {
  font-size: 1.1rem;
  color: var(--aineon-primary);
  letter-spacing: 0.5px;
}

.profit-pulse {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--aineon-primary);
  animation: profit-pulse 2s infinite;
}

@keyframes profit-pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(0, 255, 136, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
}

.profit-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.profit-value {
  font-size: 0.9rem;
  color: var(--aineon-primary);
}

.profit-metric {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 0.1rem;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.dropdown {
  background: var(--aineon-dark);
  border: 1px solid var(--aineon-border);
  color: #e5e7eb;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  min-width: 70px;
}
</style>
