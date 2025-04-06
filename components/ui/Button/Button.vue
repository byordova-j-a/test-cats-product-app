<template>
  <div
    class="button"
    :class="{ disabled: componentProps.disabled }"
    @click="onButtonClick"
  >
    {{ componentProps.text }}
  </div>
</template>

<script lang="ts" setup>
import { defautlProps, type TComponentProps, type TcomponentEmits } from './models';
const componentProps = withDefaults(defineProps<TComponentProps>(), defautlProps);
const componetnEmits = defineEmits<TcomponentEmits>();

const onButtonClick = () => {
  if (componentProps.disabled) return;
  componetnEmits('click');
};
</script>
<style scoped lang="scss">
.button {
  background-color: rgb(242, 137, 137);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: '18vag';
  font-weight: normal;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  box-sizing: border-box;
}

.button:not(.disabled):hover {
  background-color: rgb(244, 99, 99);
}

.disabled {
  pointer-events: none;
  background-color: rgb(137, 62, 62);
}

@media #{$desktop-breakpoint} {
  .button {
    font-size: get-desktop-size(25);
    height: get-desktop-size(50);
    border-width: get-desktop-size(3);
    border-radius: get-desktop-size(20);
    padding: 0 get-desktop-size(20);
    box-shadow:
      get-desktop-size(2) get-desktop-size(2) get-desktop-size(1) white,
      get-desktop-size(-2) get-desktop-size(-2) get-desktop-size(1) white;
  }
}

@media #{$mobile-breakpoint} {
  .button {
    font-size: get-mobile-size(25);
    height: get-mobile-size(50);
    border-width: get-mobile-size(3);
    border-radius: get-mobile-size(20);
    padding: 0 get-mobile-size(20);
    box-shadow:
      get-mobile-size(2) get-mobile-size(2) get-mobile-size(1) white,
      get-mobile-size(-2) get-mobile-size(-2) get-mobile-size(1) white;
  }
}
</style>
