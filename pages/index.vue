<template>
  <div class="index"><EntityOrdersTable :list="ordersList" /></div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/store/orders';
const store = useOrdersStore();

await callOnce('ordersList', () => store.setOrdersList(), { mode: 'navigation' });

const ordersList = computed(() => store.getOrdersList);
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
