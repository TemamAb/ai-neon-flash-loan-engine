<template>
  <header class="dashboard-header">
    <div class="header-left">
      <h1 class="platform-title">AINEON TRADING PLATFORM</h1>
    </div>
    
    <div class="header-center">
      <div class="profit-display">
        <span class="profit-label">Total P&L:</span>
        <span class="profit-amount">${{ formatProfit(totalProfit) }}</span>
      </div>
    </div>
    
    <div class="header-right">
      <div class="header-controls">
        <div class="control-item">
          <span class="control-label">ETH/USD</span>
        </div>
        
        <div class="control-item">
          <span class="control-label">í´„ {{ refreshInterval }}s</span>
        </div>
        
        <button class="connect-btn" @click="connectWallet">
          í´— Connect
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const totalProfit = ref(2147380);
const refreshInterval = ref(5);

const formatProfit = (amount: number) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const connectWallet = () => {
  console.log('í´— Connecting wallet...');
  // Wallet connection logic will be implemented
};
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a2e;
  border-bottom: 1px solid #2d2d44;
  height: 70px;
}

.platform-title {
  font-size: 1.4rem;
  font-weight: 300;
  color: #4caf50;
  letter-spacing: 0.5px;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.profit-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.profit-label {
  color: #cccccc;
  font-weight: 300;
}

.profit-amount {
  color: #4caf50;
  font-weight: 300;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.control-item {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border: 1px solid #2d2d44;
}

.control-label {
  color: #cccccc;
  font-weight: 300;
  font-size: 0.9rem;
}

.connect-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
}

.connect-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}
</style>
