<template>
  <BaseCard title="SYSTEM HEALTH">
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">CPU:</span>
        <span class="metric-value">45%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Memory:</span>
        <span class="metric-value">62%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Network:</span>
        <span class="metric-value">OK</span>
      </div>
      <div class="metric">
        <span class="metric-label">Uptime:</span>
        <span class="metric-value">99.4%</span>
      </div>
      <div class="metric">
        <span class="metric-label">Threats:</span>
        <span class="metric-value">0</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
