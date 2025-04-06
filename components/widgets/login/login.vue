<template>
  <div class="login-widget">
    <div class="title">Вход в личный кабинет</div>
    <UIInput
      v-model="username"
      :error-message="errorMessage"
      :type="EType.TEXT"
      label="Username"
    />
    <UIInput
      v-model="password"
      :error-message="errorMessage"
      :type="EType.PASSWORD"
      label="Password"
    />
    <UIButton
      text="Войти"
      :disabled="isButtonDisabled || isLoading"
      @click="login"
    ></UIButton>
  </div>
</template>

<script setup lang="ts">
import { EType } from '~/components/ui/Input/models';
import { useUsersStore } from '~/store/users';
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const store = useUsersStore();

const isButtonDisabled = computed(() => !(username.value.trim() && password.value.trim()));
const isLoading = ref(false);

watch([() => username.value, () => password.value], () => {
  if (errorMessage.value) errorMessage.value = '';
});

const login = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  // timer added to demonstrate component behavior while waiting for response
  setTimeout(async () => {
    const requestState = await store.login({
      username: username.value,
      password: password.value
    });

    if (requestState.success) {
      return navigateTo('/', { external: true });
    } else {
      errorMessage.value = requestState.errorMessage;
      isLoading.value = false;
    }
  }, 1000);
};
</script>

<style scoped lang="scss">
.login-widget {
  color: white;
  background-color: rgb(250, 183, 183);
  font-weight: normal;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-family: 'Cataneo';
  user-select: none;
}

@media #{$desktop-breakpoint} {
  .login-widget {
    height: get-desktop-size(550);
    width: get-desktop-size(600);
    border-radius: get-desktop-size(40);
    padding: get-desktop-size(40);
    box-shadow:
      inset get-desktop-size(-5) get-desktop-size(5) get-desktop-size(1) white,
      inset get-desktop-size(5) get-desktop-size(-5) get-desktop-size(1) white,
      get-desktop-size(2) get-desktop-size(2) get-desktop-size(10) rgb(191, 163, 157),
      get-desktop-size(-2) get-desktop-size(-2) get-desktop-size(10) rgb(191, 163, 157);
  }
  .title {
    font-size: get-desktop-size(45);
  }
}

@media #{$mobile-breakpoint} {
  .login-widget {
    height: get-mobile-size(480);
    width: get-mobile-size(300);
    border-radius: get-mobile-size(40);
    padding: get-mobile-size(40) get-mobile-size(20);
    box-shadow:
      inset get-mobile-size(-5) get-mobile-size(5) get-mobile-size(1) white,
      inset get-mobile-size(5) get-mobile-size(-5) get-mobile-size(1) white,
      get-mobile-size(2) get-mobile-size(2) get-mobile-size(10) rgb(191, 163, 157),
      get-mobile-size(-2) get-mobile-size(-2) get-mobile-size(10) rgb(191, 163, 157);
  }
  .title {
    font-size: get-mobile-size(34);
    line-height: get-mobile-size(40);
    text-align: center;
  }
}
</style>
