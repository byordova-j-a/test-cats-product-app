<template>
  <div class="card">
    <div><span class="title">Наименование:</span> {{ componentProps.name }}</div>
    <div><span class="title">Статус:</span> {{ componentProps.statusText }}</div>
    <div><span class="title">Стоимость:</span> {{ componentProps.price }}</div>
    <div><span class="title">Количество:</span> {{ componentProps.amount }}</div>
    <div><span class="title">Дата создания:</span> {{ componentProps.createdDate }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { TComponentProps } from './models';

const componentProps = defineProps<TComponentProps>();
</script>

<style scoped lang="scss">
.card {
  color: rgb(250, 183, 183);
  font-family: '18vag';
  font-weight: normal;
  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
  cursor: default;
}

.title {
  color: rgb(244, 99, 99);
}

@media #{$desktop-breakpoint} {
  .card {
    border-radius: get-desktop-size(20);
    gap: get-desktop-size(10);
    box-shadow:
      get-desktop-size(3) get-desktop-size(3) get-desktop-size(6) rgb(191, 163, 157),
      get-desktop-size(-3) get-desktop-size(-3) get-desktop-size(6) rgb(191, 163, 157);
    padding: get-desktop-size(20);
    font-size: get-desktop-size(20);
  }

  .title {
    font-size: get-desktop-size(24);
  }
}

@media #{$mobile-breakpoint} {
  .card {
    border-radius: get-mobile-size(20);
    gap: get-mobile-size(10);
    box-shadow:
      get-mobile-size(3) get-mobile-size(3) get-mobile-size(6) rgb(191, 163, 157),
      get-mobile-size(-3) get-mobile-size(-3) get-mobile-size(6) rgb(191, 163, 157);
    padding: get-mobile-size(20);
    font-size: get-mobile-size(18);
  }

  .title {
    font-size: get-mobile-size(20);
  }
}
</style>
