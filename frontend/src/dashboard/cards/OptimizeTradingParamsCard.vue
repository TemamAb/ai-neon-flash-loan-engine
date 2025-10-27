<template>
  <BaseCard title="OPTIMIZE TRADING PARAMETERS" interactive status="Ready">
    <div class="card-content">
      <div class="input-group">
        <label class="input-label">Profit Target</label>
        <input class="card-input" placeholder="2,500" value="2,500">
      </div>
      
      <div class="input-group">
        <label class="input-label">Time Period</label>
        <select class="card-select">
          <option>Hour</option>
          <option selected>Day</option>
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
      
      <div class="metric-grid">
        <div class="metric-card">
          <div class="value">3.2%</div>
          <div class="label">Growth Rate</div>
        </div>
        <div class="metric-card">
          <div class="value">85%</div>
          <div class="label">Reinvestment</div>
        </div>
      </div>
      
      <div class="input-group">
        <label class="input-label">Risk Level</label>
        <select class="card-select">
          <option>Low</option>
          <option selected>Medium</option>
          <option>High</option>
        </select>
      </div>
      
      <div class="toggle-switch">
        <span class="toggle-label">Gasless Mode</span>
        <span class="toggle-value">ON</span>
      </div>
      
      <div class="toggle-switch">
        <span class="toggle-label">AI Control</span>
        <span class="toggle-value">ON</span>
      </div>
    </div>
    
    <template #actions>
      <button class="card-button">
        <span class="btn-icon">⚡</span>
        Optimize Parameters
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';
</script>

<style scoped>
.input-group {
  margin-bottom: 0.75rem;
}

.input-label {
  display: block;
  font-size: 0.75rem;
  color: #999999;
  margin-bottom: 0.25rem;
  font-weight: 300;
}
</style>
