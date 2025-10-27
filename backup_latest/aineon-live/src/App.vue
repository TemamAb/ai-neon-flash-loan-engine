<template>
  <div id="app" class="aineon-enterprise">
    <header class="enterprise-header">
      <div class="header-brand">
        <div class="brand-text">
          <span class="brand-primary">AINEON</span>
          <span class="brand-secondary">QUANTUM TRADING</span>
        </div>
      </div>

      <div class="header-center">
        <div class="live-profit">
          <span class="profit-label">LIVE PROFIT</span>
          <span class="profit-value">$2,147,380</span>
          <span class="profit-pulse">Ì≤π</span>
        </div>
      </div>

      <div class="header-controls">
        <select class="control-select">
          <option value="1000">1s</option>
          <option value="2000">2s</option>
          <option value="5000">5s</option>
          <option value="10000">10s</option>
        </select>
        <select class="control-select">
          <option value="usd">USD</option>
          <option value="eth">ETH</option>
        </select>
        <div class="action-buttons">
          <button class="action-btn emergency professional">
            EMERGENCY STOP
          </button>
        </div>
      </div>
    </header>

    <div class="main-grid">
      <nav class="sidebar-navigation">
        <div class="nav-section">
          <h3 class="section-title">CORE MODULES</h3>
          <div class="nav-items">
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì≤º</span>
              <span class="nav-text">Wallet Security</span>
            </button>
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">‚öôÔ∏è</span>
              <span class="nav-text">Trading Parameters</span>
            </button>
          </div>
        </div>

        <div class="nav-section">
          <h3 class="section-title">TRADING ENGINE</h3>
          <div class="nav-items">
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì¥ß</span>
              <span class="nav-text">Optimization Engine</span>
            </button>
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì≥à</span>
              <span class="nav-text">Execution Quality</span>
            </button>
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì±ÅÔ∏è</span>
              <span class="nav-text">Live Monitoring</span>
            </button>
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì∑†</span>
              <span class="nav-text">AI Terminal</span>
            </button>
          </div>
        </div>

        <div class="nav-section">
          <h3 class="section-title">SECURITY & ASSETS</h3>
          <div class="nav-items">
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ì≤∞</span>
              <span class="nav-text">Profit Withdrawal</span>
            </button>
            <button class="nav-item" @click="setActiveModule('wallet-security')">
              <span class="nav-icon">Ìºâ</span>
              <span class="nav-text">Flash Loan Ops</span>
            </button>
          </div>
        </div>
      </nav>

      <main class="content-area">
        <div class="content-grid">
          <div class="grid-card">
            <div class="card-header">
              <h3>AINEON Dashboard</h3>
            </div>
            <div class="card-content">
              <p>Select a module from the navigation to begin</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setActiveModule(moduleId) {
      console.log("Module clicked:", moduleId)
      this.activeModule = moduleId
    }
  },
  name: 'App'
}
</script>

<style>
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #151521;
  --card-bg: #252536;
  --accent-primary: #00d4aa;
  --text-primary: #ffffff;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
}

.aineon-enterprise {
  height: 100vh;
}

.enterprise-header {
.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid #2d2d45;
}

.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: calc(100vh - 80px);
}

.sidebar-navigation {
  background: var(--bg-secondary);
  padding: 20px;
}

.content-area {
  padding: 24px;
  background: var(--bg-primary);
}

.content-grid {
  display: grid;
  gap: 20px;
}

.grid-card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: transparent;
  border: none;
  color: #a0a0c0;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
.nav-item.active {
  background: #00d4aa;
  color: black;
  font-weight: 600;
}
  background: #1e1e2d;
}

.action-btn.emergency.professional {
.control-select {
  background: #252536;
  color: #ffffff;
  border: 1px solid #2d2d45;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;
  min-width: 80px;
}
  background: #ff4444;
  color: white;
  border: 2px solid #ff4444;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
}
</style>
