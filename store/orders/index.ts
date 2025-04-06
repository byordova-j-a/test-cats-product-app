import { defineStore } from 'pinia';
import { getDate } from '~/utils/getDate';
import { useNotificationsStore } from '../notifications';

type TOrderssStore = {
  ordersList: TOrder[];
};

export const useOrdersStore = defineStore('orders', {
  state: (): TOrderssStore => ({ ordersList: [] }),

  getters: {
    getOrdersList: (state) => state.ordersList
  },

  actions: {
    async setOrdersList() {
      const { addNotification } = useNotificationsStore();
      const { data, error } = await useFetch('/api/orders', {
        method: 'GET'
      });

      if (data.value) {
        const { orders } = data.value;
        this.ordersList = orders.map(({ id, name, status: orderStatus, created_at, price: orderPrice, amount }) => {
          let statusText = '';
          let status = EOrderStatus.NOT_DEFINED;

          switch (orderStatus) {
            case EOrderStatus.CANCELED: {
              statusText = 'отменён';
              status = EOrderStatus.CANCELED;
              break;
            }
            case EOrderStatus.DELIVERED: {
              statusText = 'доставлен';
              status = EOrderStatus.DELIVERED;
              break;
            }
            case EOrderStatus.ON_THE_WAY: {
              statusText = 'в пути';
              status = EOrderStatus.ON_THE_WAY;
              break;
            }
            case EOrderStatus.NOT_DEFINED:
            default:
              statusText = 'не определено';
          }

          const { created_date, created_at_time } = getDate(created_at);

          const price = typeof orderPrice === 'number' ? new Intl.NumberFormat('ru').format(orderPrice) + '₽' : '-';

          return {
            id,
            name,
            price,
            created_date,
            created_at_time,
            statusText,
            status,
            amount
          };
        });
      }

      if (error.value) {
        addNotification(error.value.statusMessage || DEFAULT_ERROR_MESSAGE);
      }
    }
  }
});
