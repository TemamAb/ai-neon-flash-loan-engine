<template>
  <BaseCard title="MONITOR LIVE PERFORMANCE">
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">P&L:</span>
        <span class="metric-value">$2.1M</span>
      </div>
      <div class="metric">
        <span class="metric-label">Trades:</span>
        <span class="metric-value">142</span>
      </div>
      <div class="metric">
        <span class="metric-label">Latency:</span>
        <span class="metric-value">450ms</span>
      </div>
      <div class="metric">
        <span class="metric-label">Success:</span>
        <span class="metric-value">98.7%</span>
      </div>
      <div class="metric">
        <span class="metric-label">MEV:</span>
        <span class="metric-value">0</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Monitor</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
