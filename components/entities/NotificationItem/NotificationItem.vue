<template>
  <div
    class="notification-item"
    :class="{ showing: isNotificationShowing }"
  >
    <p>{{ currentNotification?.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '~/store/notifications';

const notificationsStore = useNotificationsStore();
const currentNotification = computed(() => notificationsStore.getCurrentNotification);

const isNotificationShowing = ref(false);

watch(
  () => notificationsStore.getCurrentNotification,
  (currentNotification) => {
    if (!currentNotification) return;

    setTimeout(() => {
      isNotificationShowing.value = true;
    }, 0);

    setTimeout(() => {
      isNotificationShowing.value = false;
      setTimeout(() => {
        notificationsStore.removeCurrentNotification();
      }, 500);
    }, 2000);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.notification-item {
  user-select: none;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 183, 183);
  transform: translateY(110%);
  transition-property: transform;
  transition-duration: 400ms;
  color: rgb(244, 99, 99);
  font-family: '18vag';
  font-weight: normal;
}

.notification-item p {
  text-align: center;
}

.showing {
  transform: translateY(0%);
}

@media #{$desktop-breakpoint} {
  .notification-item {
    height: get-desktop-size(100);
    width: get-desktop-size(300);
    font-size: get-desktop-size(24);
    border-top-left-radius: get-desktop-size(10);
    box-shadow:
      inset get-desktop-size(5) get-desktop-size(5) get-desktop-size(1) white,
      get-desktop-size(3) get-desktop-size(3) get-desktop-size(6) rgb(191, 163, 157),
      get-desktop-size(-3) get-desktop-size(-3) get-desktop-size(6) rgb(191, 163, 157);
  }
}

@media #{$mobile-breakpoint} {
  .notification-item {
    height: get-mobile-size(80);
    width: get-mobile-size(180);
    font-size: get-mobile-size(22);
    border-top-left-radius: get-mobile-size(10);
    box-shadow:
      inset get-mobile-size(3) get-mobile-size(3) get-mobile-size(1) white,
      get-mobile-size(3) get-mobile-size(3) get-mobile-size(6) rgb(191, 163, 157),
      get-mobile-size(-3) get-mobile-size(-3) get-mobile-size(6) rgb(191, 163, 157);
  }
}
</style>
