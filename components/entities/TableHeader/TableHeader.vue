<template>
  <div class="table-header">
    <p class="title">Список заказов</p>
    <div class="actions">
      <fieldset>
        <legend class="legend">Сортировать по дате:</legend>
        <div class="sort-elem">
          <div class="option">
            <input
              id="desc"
              v-model="sortDesc"
              type="radio"
              name="sort"
              :value="true"
              checked
            />
            <label for="desc">от новых к старым</label>
          </div>
          <div class="option">
            <input
              id="-desc"
              v-model="sortDesc"
              type="radio"
              name="sort"
              :value="false"
            />
            <label for="-desc">от старых к новым</label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="legend legend-filter">Выбрать:</legend>
        <div class="filter-elem">
          <div class="option">
            <input
              :id="EOrderStatus.ON_THE_WAY"
              v-model="selectedFilters"
              type="checkbox"
              :value="EOrderStatus.ON_THE_WAY"
            />
            <label :for="EOrderStatus.ON_THE_WAY">в пути</label>
          </div>
          <div class="option">
            <input
              :id="EOrderStatus.DELIVERED"
              v-model="selectedFilters"
              type="checkbox"
              :value="EOrderStatus.DELIVERED"
            />
            <label :for="EOrderStatus.DELIVERED">доствлен</label>
          </div>
          <div class="option">
            <input
              :id="EOrderStatus.CANCELED"
              v-model="selectedFilters"
              type="checkbox"
              :value="EOrderStatus.CANCELED"
            />
            <label :for="EOrderStatus.CANCELED">отменён</label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
const sortDesc = defineModel<boolean>('sortDesc', { required: true });
const selectedFilters = defineModel<EOrderStatus[]>('selectedFilters', { required: true });
</script>

<style scoped lang="scss">
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: '18vag';
  font-weight: normal;
}

.title {
  color: white;
  user-select: none;
}

.actions {
  color: white;
  display: flex;
  justify-content: space-between;
}

.sort-elem {
  display: flex;
  flex-direction: column;
}

.option {
  width: fit-content;
  display: flex;
  cursor: pointer;
}

.option label {
  cursor: pointer;
  height: 100%;
  display: block;
  user-select: none;
}

.filter-elem {
  display: flex;
}

.legend-filter {
  text-align: center;
}

input[type='radio'],
input[type='checkbox'] {
  accent-color: rgb(244, 99, 99);
  cursor: pointer;
  margin: 0;
  height: 100%;
}

.legend {
  user-select: none;
}

fieldset {
  margin: 0;
  border: 0;
}

@media #{$desktop-breakpoint} {
  .table-header {
    height: 17%;
    padding: 0 get-desktop-size(40);
  }

  .title {
    font-size: get-desktop-size(40);
  }

  .actions {
    width: get-desktop-size(770);
  }

  .legend {
    font-size: get-desktop-size(25);
  }

  .sort-elem {
    font-size: get-desktop-size(20);
    gap: get-desktop-size(10);
  }

  .option {
    height: get-desktop-size(20);
  }

  .option label {
    padding-left: get-desktop-size(10);
  }

  .filter-elem {
    font-size: get-desktop-size(20);
    gap: get-desktop-size(20);
  }

  fieldset {
    padding: get-desktop-size(5) get-desktop-size(10);
    padding-bottom: 0;
  }
}

@media #{$mobile-breakpoint} {
  .table-header {
    height: 20%;
    flex-direction: column;
    padding: get-mobile-size(10) get-mobile-size(15);
  }

  .title {
    font-size: get-mobile-size(25);
    margin-bottom: get-mobile-size(10);
  }

  .actions {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .legend {
    font-size: get-mobile-size(17);
  }

  .sort-elem {
    font-size: get-mobile-size(12);
    gap: get-mobile-size(5);
  }

  .option {
    height: get-mobile-size(20);
  }

  .option label {
    padding-left: get-mobile-size(10);
    display: flex;
    align-items: center;
  }

  .filter-elem {
    font-size: get-mobile-size(12);
    gap: get-mobile-size(1.5);
    flex-direction: column;
  }

  fieldset {
    padding: 0;
    padding-top: get-mobile-size(5);
  }
}
</style>
