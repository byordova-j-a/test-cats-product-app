<template>
  <div class="main">
    <div
      class="header"
      :class="isUserShowed ? 'header-expanded' : 'header-hidden'"
    >
      <div
        class="title"
        @click="expandHeader"
      >
        <p>Кошка на ладошке</p>
        <SvgoArrow class="arrow" />
      </div>
      <div class="user-block">
        <div class="user">
          <p>Имя: {{ currentUser?.name || '-' }}</p>
          <p>Фамилия: {{ currentUser?.surname || '-' }}</p>
        </div>
        <UIButton
          text="Выход"
          class="exit-button"
          @click="logout"
        />
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
    <EntityNotificationItem />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users';

const store = useUsersStore();

await callOnce('currentUser', () => store.setCurrentUser(), { mode: 'navigation' });
const currentUser = computed(() => store.getCurrentUser);

const expandHeader = () => {
  isUserShowed.value = !isUserShowed.value;
};

const isUserShowed = ref(false);

const logout = () => {
  const authorizationCookie = useCookie('authorization');
  authorizationCookie.value = null;

  return navigateTo('/', { external: true });
};
</script>

<style scoped lang="scss">
.main {
  height: 100svh;
  width: 100svw;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  z-index: 1;
  font-weight: normal;
  background-color: rgb(250, 183, 183);
  color: white;
  box-sizing: border-box;
  display: flex;
  cursor: default;
  overflow: hidden;
  align-items: center;
}

.title {
  position: relative;
  font-family: 'Cataneo';
  user-select: none;
}

.title::after {
  content: 'Товары для кошек';
  display: block;
  position: absolute;
  font-family: '18vag';
  font-weight: normal;
}

.user-block {
  font-family: '18vag';
  display: flex;
  align-items: center;
}

.user p {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

.content {
  flex-grow: 1;
}

@media #{$desktop-breakpoint} {
  .header {
    height: get-desktop-size(120);
    padding: get-desktop-size(20);
    box-shadow: get-desktop-size(0) get-desktop-size(2) get-desktop-size(10) rgb(191, 163, 157);
    justify-content: space-between;
  }

  .title {
    font-size: get-desktop-size(50);
    pointer-events: none;
  }

  .title::after {
    font-size: get-desktop-size(20);
    right: 0;
  }

  .user-block {
    height: get-desktop-size(80);
    gap: get-desktop-size(40);
    padding: 0 get-desktop-size(40);
    border-radius: get-desktop-size(20);
    box-shadow:
      get-desktop-size(-3) get-desktop-size(3) get-desktop-size(1) white,
      get-desktop-size(3) get-desktop-size(-3) get-desktop-size(1) white;
  }

  .user {
    font-size: get-desktop-size(30);
    max-width: get-desktop-size(640);
  }
  .arrow {
    display: none;
  }
}

@media #{$mobile-breakpoint} {
  .content {
    margin-top: get-mobile-size(50);
  }

  .header {
    position: absolute;
    box-shadow: get-mobile-size(0) get-mobile-size(2) get-mobile-size(5) rgb(191, 163, 157);
    flex-direction: column;
  }

  .header-expanded {
    height: get-mobile-size(240);
  }

  .header-hidden {
    height: get-mobile-size(80);
  }

  .title {
    font-size: get-mobile-size(34);
    width: 100%;
    box-sizing: border-box;
    padding: get-mobile-size(20) get-mobile-size(10);
    cursor: pointer;
  }

  .title::after {
    font-size: get-mobile-size(18);
    left: get-mobile-size(10);
  }

  .user-block {
    height: get-mobile-size(120);
    flex-shrink: 0;
    position: relative;
    width: calc(100% - get-mobile-size(20));
    border-radius: get-mobile-size(20);
    box-shadow:
      get-mobile-size(-3) get-mobile-size(3) get-mobile-size(1) white,
      get-mobile-size(3) get-mobile-size(-3) get-mobile-size(1) white;
    flex-direction: column;
    justify-content: space-between;
    margin-top: get-mobile-size(20);
  }

  .user {
    font-size: get-mobile-size(20);
    width: 100%;
    padding: get-mobile-size(10);
    box-sizing: border-box;
  }

  .exit-button {
    width: 100%;
  }
  .arrow {
    position: absolute;
    height: get-mobile-size(15);
    width: get-mobile-size(15);
    bottom: get-mobile-size(4);
    left: get-mobile-size(180);
  }
  .header-expanded .arrow {
    transform: rotate(180deg);
  }
}
</style>
