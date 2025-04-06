<template>
  <div class="input">
    <label
      class="input-label"
      :for="inputId"
    >
      {{ componentProps.label }}</label
    >
    <div class="input-field">
      <input
        ref="inputElement"
        v-model="modelValue"
        :name="inputId"
        :type="inputType"
      />
      <div
        v-show="modelValue"
        class="icon"
        @click="clearInputValue"
      >
        <SvgoClose
          height="100%"
          width="100%"
        />
      </div>
      <div
        v-if="isTypePassword"
        class="icon"
        @click="changePasswordVisibility"
      >
        <SvgoEyeOpened
          v-show="!isPasswordVisible"
          class="eye"
          height="100%"
          width="100%"
        />
        <SvgoEyeClosed
          v-show="isPasswordVisible"
          class="eye eye-closed"
          height="100%"
          width="100%"
        />
      </div>
      <div class="error-message">{{ componentProps.errorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type TComponentProps, EType } from './models';

const inputId = useId();

const modelValue = defineModel<string>({ required: true });
const componentProps = defineProps<TComponentProps>();

const isPasswordVisible = ref(false);

const inputElement = ref<null | HTMLInputElement>(null);

const setInputFocus = () => {
  if (inputElement.value) {
    inputElement.value.focus();
  }
};
const clearInputValue = () => {
  modelValue.value = '';
  setInputFocus();
};

const changePasswordVisibility = async () => {
  const selectPosition = inputElement.value ? inputElement.value.selectionStart : 0;
  isPasswordVisible.value = !isPasswordVisible.value;
  setInputFocus();

  setTimeout(() => {
    if (inputElement.value) {
      inputElement.value.setSelectionRange(selectPosition, selectPosition);
    }
  }, 0);
};

const isTypePassword = computed(() => componentProps.type === EType.PASSWORD);

const inputType = computed(() => {
  if (componentProps.type === EType.TEXT) return EType.TEXT;

  return isPasswordVisible.value ? EType.TEXT : EType.PASSWORD;
});
</script>
<style scoped lang="scss">
.input {
  width: 100%;
  position: relative;
}

input {
  flex-grow: 1;
  outline: none;
  border: none;
  font-family: '18vag';
  box-sizing: border-box;
  padding: 0;
  position: relative;
  height: 100%;
  color: rgb(137, 62, 62);
  width: inherit;
}

.input-label {
  font-family: '18vag';
  user-select: none;
}

.input-field {
  width: 100%;
  background-color: white;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}

.icon {
  cursor: pointer;
  aspect-ratio: 1/1;
  height: 100%;
  position: relative;
}

.eye {
  position: absolute;
}

.error-message {
  position: absolute;
  top: 100%;
  color: red;
  font-family: '18vag';
  font-weight: normal;
  user-select: none;
}

@media #{$desktop-breakpoint} {
  input {
    font-size: get-desktop-size(30);
  }

  .input-field {
    padding: 0 get-desktop-size(10);
    gap: get-desktop-size(10);
    height: get-desktop-size(45);
    border-radius: get-desktop-size(10);
  }

  .input-label {
    font-size: get-desktop-size(24);
  }

  .eye-closed {
    top: get-desktop-size(8);
  }

  .error-message {
    font-size: get-desktop-size(20);
    line-height: get-desktop-size(28);
  }
}

@media #{$mobile-breakpoint} {
  input {
    font-size: get-mobile-size(22);
  }

  .input-field {
    padding: 0 get-mobile-size(10);
    gap: get-mobile-size(5);
    height: get-mobile-size(30);
    border-radius: get-mobile-size(10);
  }

  .input-label {
    font-size: get-mobile-size(24);
  }

  .eye-closed {
    top: get-mobile-size(4);
  }

  .error-message {
    font-size: get-mobile-size(14);
    line-height: get-mobile-size(20);
  }
}
</style>
