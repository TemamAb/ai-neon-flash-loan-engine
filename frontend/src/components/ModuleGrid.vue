<template>
  <div class="module-grid" :class="viewMode">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  viewMode: 'DEFAULT' | 'ADVANCED';
}>();
</script>

<style scoped>
.module-grid {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.module-grid.DEFAULT {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.module-grid.ADVANCED {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>
