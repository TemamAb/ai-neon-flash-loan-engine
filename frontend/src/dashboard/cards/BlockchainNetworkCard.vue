<template>
  <BaseCard title="BLOCKCHAIN NETWORK">
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">Block:</span>
        <span class="metric-value">#18,342K</span>
      </div>
      <div class="metric">
        <span class="metric-label">Gas:</span>
        <span class="metric-value">25 Gwei</span>
      </div>
      <div class="metric">
        <span class="metric-label">Txs/s:</span>
        <span class="metric-value">142</span>
      </div>
      <div class="metric">
        <span class="metric-label">Pending:</span>
        <span class="metric-value">12</span>
      </div>
      <select class="card-select">
        <option>All Networks</option>
        <option>Ethereum</option>
        <option>BSC</option>
      </select>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
