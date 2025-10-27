<template>
  <nav class="aineon-nav">
    <div class="nav-section">
      <div class="nav-header">TRADING MODULES</div>
      <NavItem v-for="item in tradingModules" :key="item.id" :item="item" />
    </div>
    
    <div class="nav-section">
      <div class="nav-header">MONITORING</div>
      <NavItem v-for="item in monitoringModules" :key="item.id" :item="item" />
    </div>
  </nav>
</template>

<script setup>
import NavItem from './NavItem.vue'

const tradingModules = [
  { id: 1, icon: 'í³Š', label: 'Dashboard', active: true },
  { id: 2, icon: 'í²°', label: 'Wallet Security' },
  { id: 3, icon: 'âš¡', label: 'Trading Parameters' },
  { id: 4, icon: 'í· ', label: 'AI Optimization' },
  { id: 5, icon: 'íº€', label: 'Execution Quality' }
]

const monitoringModules = [
  { id: 6, icon: 'í³ˆ', label: 'Live Monitoring' },
  { id: 7, icon: 'í´–', label: 'AI Terminal' },
  { id: 8, icon: 'í²¸', label: 'Profit Engine' },
  { id: 9, icon: 'í¼‰', label: 'Flash Loans' }
]
</script>

<style scoped>
.aineon-nav {
  width: 250px;
  background: var(--aineon-card);
  padding: 1rem;
  border-right: 1px solid var(--aineon-border);
}

.nav-header {
  color: var(--aineon-primary);
  font-size: 0.8rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-section:first-child .nav-header {
  margin-top: 0;
}
</style>
