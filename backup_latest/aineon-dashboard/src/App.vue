<template>
  <div id="app" class="aineon-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">íº€</span>
          <span class="logo-text">AINEON MASTER DASHBOARD</span>
        </div>
      </div>
      
      <div class="header-center">
        <div class="profit-pulse">
          <span class="profit">${{ formatNumber(liveProfit) }}</span>
          <span class="pulse">í²¹</span>
        </div>
      </div>
      
      <div class="header-right">
        <select v-model="currency" class="currency-toggle">
          <option value="usd">USD</option>
          <option value="eth">ETH</option>
        </select>
        
        <select v-model="refreshInterval" class="refresh-toggle">
          <option value="1000">1s</option>
          <option value="2000">2s</option>
          <option value="5000">5s</option>
          <option value="10000">10s</option>
        </select>
        
        <select v-model="viewMode" class="mode-toggle">
          <option value="default">Default</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
      <div v-if="viewMode === 'default'" class="default-view">
        <div class="modules-grid">
          <QuickDeployModule />
          <WalletSecurityModule />
          <TradingParametersModule />
          <OptimizationEngineModule />
          <ExecutionQualityModule />
          <LiveMonitoringModule />
          <AITerminalModule />
          <ProfitWithdrawalModule />
          <FlashLoanModule />
        </div>
      </div>
      
      <div v-else class="advanced-view">
        <AdvancedDashboard />
      </div>
    </main>

    <!-- Alert Center -->
    <AlertCenter v-if="activeAlerts.length > 0" :alerts="activeAlerts" />
  </div>
</template>

<script>
import QuickDeployModule from './modules/QuickDeployModule.vue'
import WalletSecurityModule from './modules/WalletSecurityModule.vue'
import TradingParametersModule from './modules/TradingParametersModule.vue'
import OptimizationEngineModule from './modules/OptimizationEngineModule.vue'
import ExecutionQualityModule from './modules/ExecutionQualityModule.vue'
import LiveMonitoringModule from './modules/LiveMonitoringModule.vue'
import AITerminalModule from './modules/AITerminalModule.vue'
import ProfitWithdrawalModule from './modules/ProfitWithdrawalModule.vue'
import FlashLoanModule from './modules/FlashLoanModule.vue'
import AdvancedDashboard from './views/AdvancedDashboard.vue'
import AlertCenter from './components/AlertCenter.vue'

export default {
  name: 'App',
  components: {
    QuickDeployModule,
    WalletSecurityModule,
    TradingParametersModule,
    OptimizationEngineModule,
    ExecutionQualityModule,
    LiveMonitoringModule,
    AITerminalModule,
    ProfitWithdrawalModule,
    FlashLoanModule,
    AdvancedDashboard,
    AlertCenter
  },
  data() {
    return {
      liveProfit: 2147380,
      currency: 'usd',
      refreshInterval: 5000,
      viewMode: 'default',
      activeAlerts: []
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString()
    }
  },
  mounted() {
    // Start live updates
    setInterval(() => {
      // Simulate profit growth
      this.liveProfit += 384
    }, this.refreshInterval)
  }
}
</script>

<style>
:root {
  --bg-primary: #0f0f23;
  --bg-secondary: #1a1a2e;
  --card-bg: #16213e;
  --accent-color: #00ff00;
  --warning-color: #ff9900;
  --danger-color: #ff4444;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --border-color: #2d3748;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.aineon-dashboard {
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 18px;
}

.logo-icon {
  font-size: 24px;
}

.profit-pulse {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: bold;
  color: var(--accent-color);
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.header-right {
  display: flex;
  gap: 12px;
}

select {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}

.dashboard-main {
  padding: 24px;
}

.default-view .modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .default-view .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .default-view .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
