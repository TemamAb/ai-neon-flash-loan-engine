<template>
  <BaseCard title="CONTINUE OPTIMIZATION" interactive>
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">Delta:</span>
        <span class="metric-value">+2.3%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Profit:</span>
        <span class="metric-value">+$12.4K</span>
      </div>
      <div class="metric">
        <span class="metric-label">Success:</span>
        <span class="metric-value">+0.5%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Speed:</span>
        <span class="metric-value">-12ms</span>
      </div>
      <div class="metric">
        <span class="metric-label">Frequency:</span>
        <span class="metric-value">5m</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Optimize</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
