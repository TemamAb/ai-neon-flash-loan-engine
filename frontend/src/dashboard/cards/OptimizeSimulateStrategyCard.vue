<template>
  <BaseCard title="OPTIMIZE & SIMULATE STRATEGY" interactive>
    <div class="card-content">
      <select class="card-select">
        <option>All Chains</option>
        <option>Ethereum</option>
        <option>BSC</option>
      </select>
      <select class="card-select">
        <option>All Pairs</option>
        <option>ETH/USD</option>
        <option>BTC/USD</option>
      </select>
      <div class="metric">
        <span class="metric-label">Backtest:</span>
        <span class="metric-value">30D</span>
      </div>
      <div class="metric">
        <span class="metric-label">ROI:</span>
        <span class="metric-value">3.2%</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Simulate</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
