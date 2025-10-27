<template>
  <BaseCard title="CONNECT WALLET" interactive>
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">Status:</span>
        <span class="metric-value">Connect</span>
      </div>
      <div class="metric">
        <span class="metric-label">Address:</span>
        <span class="metric-value">[Auto]</span>
      </div>
      <div class="metric">
        <span class="metric-label">Balance:</span>
        <span class="metric-value">$0.00</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Connect</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
