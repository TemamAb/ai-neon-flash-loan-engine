<template>
  <div id="app">
    <MasterDashboard />
  </div>
</template>

<script setup lang="ts">
import MasterDashboard from './dashboard/MasterDashboard.vue';

console.log('�� AINEON Trading Platform Starting...');
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0f0f23;
  color: #cccccc;
  min-height: 100vh;
  font-weight: 300;
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a2e;
}

::-webkit-scrollbar-thumb {
  background: #4caf50;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #45a049;
}
</style>
