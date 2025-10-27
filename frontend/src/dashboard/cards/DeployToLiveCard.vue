<template>
  <BaseCard title="DEPLOY TO LIVE" interactive>
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">Strategies:</span>
        <span class="metric-value">15</span>
      </div>
      <div class="metric">
        <span class="metric-label">Active:</span>
        <span class="metric-value">12</span>
      </div>
      <div class="metric">
        <span class="metric-label">Queue:</span>
        <span class="metric-value">3</span>
      </div>
      <div class="metric">
        <span class="metric-label">Success:</span>
        <span class="metric-value">99.1%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Status:</span>
        <span class="metric-value">Ready</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Deploy</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
