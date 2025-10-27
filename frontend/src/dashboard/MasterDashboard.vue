<template>
  <div class="master-dashboard">
    <DashboardHeader />
    
    <div class="dashboard-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading trading data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>Error loading data: {{ error }}</p>
        <button @click="loadDashboardData" class="retry-btn">Retry</button>
      </div>

      <!-- Main Dashboard Grid -->
      <div v-else class="dashboard-grid">
        <!-- Row 1: Interactive Cards -->
        <div class="grid-row">
          <ConnectWalletCard />
          <OptimizeTradingParamsCard />
          <OptimizeSimulateStrategyCard />
          <DeployToLiveCard />
          <ContinueOptimizationCard />
        </div>

        <!-- Row 2: Monitoring Cards -->
        <div class="grid-row">
          <MonitorLivePerformanceCard />
          <WithdrawProfitsCard />
          <LiveMonitoringAnalyticsCard />
          <BlockchainNetworkCard />
          <SystemHealthCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardHeader from '../components/DashboardHeader.vue';

// Import card components
import ConnectWalletCard from './cards/ConnectWalletCard.vue';
import OptimizeTradingParamsCard from './cards/OptimizeTradingParamsCard.vue';
import OptimizeSimulateStrategyCard from './cards/OptimizeSimulateStrategyCard.vue';
import DeployToLiveCard from './cards/DeployToLiveCard.vue';
import ContinueOptimizationCard from './cards/ContinueOptimizationCard.vue';
import MonitorLivePerformanceCard from './cards/MonitorLivePerformanceCard.vue';
import WithdrawProfitsCard from './cards/WithdrawProfitsCard.vue';
import LiveMonitoringAnalyticsCard from './cards/LiveMonitoringAnalyticsCard.vue';
import BlockchainNetworkCard from './cards/BlockchainNetworkCard.vue';
import SystemHealthCard from './cards/SystemHealthCard.vue';

const loading = ref(true);
const error = ref<string | null>(null);

const loadDashboardData = async () => {
  try {
    loading.value = true;
    error.value = null;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('í³Š Dashboard data loaded');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>

<style scoped>
.master-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
}

.dashboard-content {
  padding: 2rem;
  background: transparent;
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  color: #cccccc;
  text-align: center;
}

.spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #4caf50;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: 300;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
}

/* Responsive design */
@media (max-width: 1800px) {
  .grid-row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1400px) {
  .grid-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .grid-row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-content {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .grid-row {
    grid-template-columns: 1fr;
  }
  
  .dashboard-content {
    padding: 1rem;
  }
}
</style>
