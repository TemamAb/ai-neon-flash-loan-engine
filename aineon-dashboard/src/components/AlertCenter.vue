<template>
  <div class="alert-center" v-if="alerts.length > 0">
    <div class="alert-header">
      <h4>Ì∫® Active Alerts</h4>
      <span class="alert-count">{{ alerts.length }}</span>
    </div>
    <div class="alert-list">
      <div v-for="alert in alerts" :key="alert.id" class="alert-item">
        <div class="alert-icon">‚ö†Ô∏è</div>
        <div class="alert-content">
          <div class="alert-title">{{ alert.title }}</div>
          <div class="alert-message">{{ alert.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertCenter',
  props: {
    alerts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.alert-center {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background: var(--card-bg);
  border: 1px solid var(--danger-color);
  border-radius: 8px;
  z-index: 1000;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.alert-count {
  background: var(--danger-color);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.alert-list {
  max-height: 200px;
  overflow-y: auto;
}

.alert-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--danger-color);
}

.alert-message {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
