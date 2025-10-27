<template>
  <div class="module wallet-security">
    <div class="module-header">
      <h3>ÔøΩÔøΩ Wallet & Security</h3>
    </div>
    
    <div class="module-content">
      <div class="security-status">
        <div class="status-item">
          <div class="status-icon">Ìª°Ô∏è</div>
          <div class="status-info">
            <div class="status-label">System Security</div>
            <div class="status-value secure">9.6/10</div>
          </div>
        </div>
        
        <div class="status-item">
          <div class="status-icon">Ì¥ç</div>
          <div class="status-info">
            <div class="status-label">Active Threats</div>
            <div class="status-value safe">0</div>
          </div>
        </div>
        
        <div class="status-item">
          <div class="status-icon">Ì∫´</div>
          <div class="status-info">
            <div class="status-label">MEV Attacks Blocked</div>
            <div class="status-value">17</div>
          </div>
        </div>
      </div>
      
      <div class="wallet-balances">
        <h4>Multi-Chain Balances</h4>
        <div class="balance-grid">
          <div class="balance-item">
            <div class="chain">Ethereum</div>
            <div class="amount">$5.78M</div>
            <div class="percentage">45%</div>
          </div>
          <div class="balance-item">
            <div class="chain">BSC</div>
            <div class="amount">$3.21M</div>
            <div class="percentage">25%</div>
          </div>
          <div class="balance-item">
            <div class="chain">Polygon</div>
            <div class="amount">$2.31M</div>
            <div class="percentage">18%</div>
          </div>
          <div class="balance-item">
            <div class="chain">Arbitrum</div>
            <div class="amount">$1.54M</div>
            <div class="percentage">12%</div>
          </div>
        </div>
      </div>
      
      <div class="security-metrics">
        <div class="metric">
          <div class="metric-label">Multi-Sig Status</div>
          <div class="metric-value">2/3 Ready</div>
        </div>
        <div class="metric">
          <div class="metric-label">Last Audit</div>
          <div class="metric-value">2 hours ago</div>
        </div>
        <div class="metric">
          <div class="metric-label">API Key Rotation</div>
          <div class="metric-value">3 days ago</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletSecurityModule'
}
</script>

<style scoped>
.wallet-security {
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

.security-status {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.status-icon {
  font-size: 20px;
}

.status-info {
  flex: 1;
}

.status-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.status-value {
  font-size: 18px;
  font-weight: bold;
}

.status-value.secure {
  color: var(--accent-color);
}

.status-value.safe {
  color: var(--accent-color);
}

.wallet-balances h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.balance-grid {
  display: grid;
  gap: 8px;
  margin-bottom: 20px;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.chain {
  font-weight: 500;
}

.amount {
  font-weight: bold;
}

.percentage {
  color: var(--text-secondary);
  font-size: 14px;
}

.security-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.metric {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.metric-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.metric-value {
  font-size: 14px;
  font-weight: 500;
}
</style>
