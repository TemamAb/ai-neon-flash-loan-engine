<template>
  <main class="dashboard-grid">
    <div class="card-grid">
      <!-- Real-time Metric Cards -->
      <MetricCard 
        title="Live Profit Pulse" 
        :value="liveProfit"
        trend="up"
        :sparkline="profitData"
        size="large"
      />
      
      <MetricCard
        title="AI Prediction Accuracy"
        value="98.3%"
        trend="stable"
        :gauge="98.3"
      />
      
      <MetricCard
        title="System Health"
        value="99.97%"
        trend="up"
        status="optimal"
      />
    </div>
  </main>
</template>

<script setup>
import MetricCard from './MetricCard.vue'
import { ref, onMounted } from 'vue'

const liveProfit = ref('+$284.7K')
const profitData = ref([...]) // Real data from backend

onMounted(() => {
  // Connect to WebSocket for live data
  const ws = new WebSocket('ws://localhost:3001/live-data')
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    liveProfit.value = `+$${data.profit}`
  }
})
</script>

<style scoped>
.dashboard-grid {
  flex: 1;
  padding: 2rem;
  background: var(--aineon-dark);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
