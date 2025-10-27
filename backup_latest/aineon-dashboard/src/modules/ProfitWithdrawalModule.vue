<template>
  <div class="module profit-withdrawal">
    <div class="module-header">
      <h3>í²° Profit Withdrawal</h3>
    </div>
    
    <div class="module-content">
      <div class="profit-summary">
        <div class="total-profit">$2,147,380</div>
        <div class="profit-label">Total Profits</div>
      </div>
      
      <div class="withdrawal-metrics">
        <div class="metric">
          <div class="metric-value">$12,400</div>
          <div class="metric-label">Tax Optimization Saved</div>
        </div>
        <div class="metric">
          <div class="metric-value">96%</div>
          <div class="metric-label">Withdrawal Efficiency</div>
        </div>
        <div class="metric">
          <div class="metric-value">100%</div>
          <div class="metric-label">Compliance Score</div>
        </div>
      </div>
      
      <div class="withdrawal-schedule">
        <h4>Next Withdrawal</h4>
        <div class="schedule-details">
          <div class="detail">
            <span class="label">Amount:</span>
            <span class="value">$250,000</span>
          </div>
          <div class="detail">
            <span class="label">Tax Liability:</span>
            <span class="value">$37,500 (15%)</span>
          </div>
          <div class="detail">
            <span class="label">Distribution:</span>
            <span class="value">60% Cold Storage</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfitWithdrawalModule'
}
</script>

<style scoped>
.profit-withdrawal {
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

.profit-summary {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.total-profit {
  font-size: 32px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 8px;
}

.profit-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.withdrawal-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.metric {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.metric-value {
  font-size: 16px;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 4px;
}

.metric-label {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.2;
}

.withdrawal-schedule h4 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.schedule-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.detail:last-child {
  border-bottom: none;
}

.label {
  color: var(--text-secondary);
  font-size: 14px;
}

.value {
  font-weight: 500;
  font-size: 14px;
}
</style>
