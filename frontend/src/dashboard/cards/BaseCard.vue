<template>
  <div class="base-card" :class="{ interactive: interactive, glowing: interactive }">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div v-if="status" class="card-status" :class="status">
        {{ status }}
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  interactive?: boolean;
  status?: string;
}>();
</script>

<style scoped>
.base-card {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.6));
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 220px;
  position: relative;
  overflow: hidden;
}

.base-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #4caf50, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.base-card.interactive {
  border-color: rgba(76, 175, 80, 0.3);
  cursor: pointer;
}

.base-card.glowing:hover {
  border-color: rgba(76, 175, 80, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.base-card.glowing:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 300;
  color: #4caf50;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.card-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.card-content {
  color: #cccccc;
  font-weight: 300;
}

.card-actions {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Enhanced metric styling */
.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.metric:hover {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.metric:last-child {
  border-bottom: none;
}

.metric-label {
  color: #999999;
  font-size: 0.8rem;
  font-weight: 300;
}

.metric-value {
  color: #4caf50;
  font-size: 0.85rem;
  font-weight: 300;
  text-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.metric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
}

.metric-card .value {
  font-size: 1.1rem;
  color: #4caf50;
  font-weight: 300;
  margin-bottom: 0.25rem;
}

.metric-card .label {
  font-size: 0.7rem;
  color: #999999;
  font-weight: 300;
}

/* Enhanced input and button styling */
.card-input {
  width: 100%;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid #2d2d44;
  border-radius: 6px;
  color: #cccccc;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 300;
}

.card-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.card-select {
  width: 100%;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid #2d2d44;
  border-radius: 6px;
  color: #cccccc;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 300;
}

.card-select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.card-button {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 15px rgba(76, 175, 80, 0.3);
}

.card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
}

.toggle-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.toggle-label {
  font-size: 0.8rem;
  color: #999999;
  font-weight: 300;
}

.toggle-value {
  color: #4caf50;
  font-size: 0.85rem;
  font-weight: 300;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin: 0.5rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #45a049);
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
