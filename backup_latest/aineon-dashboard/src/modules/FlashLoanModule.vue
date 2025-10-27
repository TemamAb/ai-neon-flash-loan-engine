<template>
  <div class="module flash-loan">
    <div class="module-header">
      <h3>í¼‰ Flash Loan Operations</h3>
    </div>
    
    <div class="module-content">
      <div class="utilization-metrics">
        <div class="utilization">
          <div class="util-value">68%</div>
          <div class="util-label">Capacity Used</div>
        </div>
        <div class="util-details">
          <div class="detail">
            <span>Deployed:</span>
            <span class="value">$68M</span>
          </div>
          <div class="detail">
            <span>Available:</span>
            <span class="value">$32M</span>
          </div>
          <div class="detail">
            <span>Total:</span>
            <span class="value">$100M</span>
          </div>
        </div>
      </div>
      
      <div class="provider-performance">
        <h4>Provider Performance</h4>
        <div class="providers-list">
          <div class="provider">
            <div class="provider-name">Aave</div>
            <div class="provider-stats">
              <span class="utilization">35% ($35M)</span>
              <span class="roi">3.4% ROI</span>
            </div>
          </div>
          <div class="provider">
            <div class="provider-name">dYdX</div>
            <div class="provider-stats">
              <span class="utilization">25% ($25M)</span>
              <span class="roi">2.9% ROI</span>
            </div>
          </div>
          <div class="provider">
            <div class="provider-name">Uniswap</div>
            <div class="provider-stats">
              <span class="utilization">5% ($5M)</span>
              <span class="roi">3.1% ROI</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="loan-analytics">
        <div class="analytics-item">
          <div class="analytics-label">Avg Loan Size</div>
          <div class="analytics-value">$2.1M</div>
        </div>
        <div class="analytics-item">
          <div class="analytics-label">Success Rate</div>
          <div class="analytics-value">98.3%</div>
        </div>
        <div class="analytics-item">
          <div class="analytics-label">Current ROI</div>
          <div class="analytics-value">3.2%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlashLoanModule'
}
</script>

<style scoped>
.flash-loan {
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

.utilization-metrics {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.utilization {
  text-align: center;
}

.util-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.util-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.util-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.detail .value {
  font-weight: 500;
}

.provider-performance h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.providers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.provider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.provider-name {
  font-weight: 500;
}

.provider-stats {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.utilization {
  color: var(--text-primary);
}

.roi {
  color: var(--accent-color);
  font-weight: 500;
}

.loan-analytics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.analytics-item {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.analytics-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.analytics-value {
  font-size: 14px;
  font-weight: 500;
}
</style>
