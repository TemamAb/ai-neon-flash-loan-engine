<template>
  <BaseCard title="WITHDRAW PROFITS" interactive>
    <div class="card-content">
      <div class="metric">
        <span class="metric-label">Available:</span>
        <span class="metric-value">$12.4K</span>
      </div>
      <input class="card-input" placeholder="Threshold: 5000" value="5000">
      <div class="metric">
        <span class="metric-label">Wallet:</span>
        <span class="metric-value">0x7423..</span>
      </div>
      <div class="toggle-switch">
        <span class="toggle-label">Auto:</span>
        <span class="metric-value">ON</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">Withdraw</button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>
