<template>
  <div class="orders-table">
    <EntityTableHeader
      v-model:sort-desc="sortingDesc"
      v-model:selected-filters="filters"
    />
    <div class="content-wrapper">
      <div
        ref="scrolledContent"
        class="content"
        :class="{ 'empty-content': !list.length }"
      >
        <div
          v-if="list.length"
          class="orders-list"
        >
          <UICard
            v-for="{ id, name, statusText, created_date, price, amount } in list"
            :key="id"
            :name="name"
            :status-text="statusText"
            :created-date="created_date"
            :price="price"
            :amount="amount"
          />
        </div>
        <div
          v-else
          class="empty-message"
        >
          Пусто :(
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TComponentProps } from './models';
const componentProps = defineProps<TComponentProps>();

const list = ref(componentProps.list);
const sortingDesc = ref(true);
const filters = ref<EOrderStatus[]>([]);

const scrolledContent = ref<null | HTMLElement>(null);

const sortFuc = (a: TOrder, b: TOrder) => {
  if (sortingDesc.value) {
    if (a.created_at_time < b.created_at_time) return 1;
    if (a.created_at_time > b.created_at_time) return -1;

    return 0;
  } else {
    if (a.created_at_time > b.created_at_time) return 1;
    if (a.created_at_time < b.created_at_time) return -1;

    return 0;
  }
};

const scrollTop = () => {
  if (!scrolledContent.value) return;
  scrolledContent.value.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

watch(
  () => sortingDesc.value,
  () => {
    list.value = list.value.sort(sortFuc);
    scrollTop();
  },
  { immediate: true }
);

watch(
  () => filters.value,
  (filters) => {
    list.value = componentProps.list.filter((item) => !filters.length || filters.includes(item.status)).sort(sortFuc);
    scrollTop();
  }
);
</script>

<style scoped lang="scss">
.orders-table {
  box-sizing: border-box;
  background-color: rgb(250, 183, 183);
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  background-color: white;
}

.content {
  height: 100%;
  position: relative;
  overflow-y: auto;
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.orders-list {
  position: absolute;
  width: 100%;
  display: grid;
  box-sizing: border-box;
}

.empty-message {
  color: rgb(250, 183, 183);
  font-family: '18vag';
  font-weight: normal;
}

@media #{$desktop-breakpoint} {
  .orders-table {
    height: get-desktop-size(900);
    width: get-desktop-size(1840);
    border-radius: get-desktop-size(40);
    box-shadow:
      inset get-desktop-size(-5) get-desktop-size(5) get-desktop-size(1) white,
      inset get-desktop-size(5) get-desktop-size(-5) get-desktop-size(1) white,
      get-desktop-size(2) get-desktop-size(2) get-desktop-size(10) rgb(191, 163, 157),
      get-desktop-size(-2) get-desktop-size(-2) get-desktop-size(10) rgb(191, 163, 157);
  }

  .content-wrapper {
    height: 83%;
    padding: get-desktop-size(20);
    border-radius: get-desktop-size(30);
    margin: get-desktop-size(20);
    margin-top: 0;
  }

  .orders-list {
    gap: get-desktop-size(20);
    padding: get-desktop-size(20);
    grid-template-columns: repeat(4, 1fr);
  }

  .empty-message {
    font-size: get-desktop-size(70);
  }
}

@media #{$mobile-breakpoint} {
  .orders-table {
    overflow: hidden;
    height: get-mobile-size(600);
    width: get-mobile-size(300);
    border-radius: get-mobile-size(20);
    box-shadow:
      inset get-mobile-size(-3) get-mobile-size(3) get-mobile-size(1) white,
      inset get-mobile-size(3) get-mobile-size(-3) get-mobile-size(1) white,
      get-mobile-size(1) get-mobile-size(1) get-mobile-size(5) rgb(191, 163, 157),
      get-mobile-size(-1) get-mobile-size(-1) get-mobile-size(5) rgb(191, 163, 157);
  }

  .content-wrapper {
    height: 80%;
    padding: get-mobile-size(10) get-mobile-size(5);
    border-radius: get-mobile-size(20);
    margin: get-mobile-size(15);
    margin-top: 0;
  }

  .orders-list {
    gap: get-mobile-size(20);
    padding: get-mobile-size(10) get-mobile-size(12);
    grid-template-columns: repeat(1, 1fr);
  }

  .empty-message {
    font-size: get-mobile-size(40);
  }
}
</style>
