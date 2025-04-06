import { defineStore } from 'pinia';
import { useNotificationsStore } from '../notifications';

type TUsersStore = {
  currentUser: TUser | null;
};

export const useUsersStore = defineStore('users', {
  state: (): TUsersStore => ({ currentUser: null }),

  getters: {
    getCurrentUser: (state) => state.currentUser
  },

  actions: {
    async setCurrentUser() {
      const { addNotification } = useNotificationsStore();

      const { data, error } = await useFetch('/api/user', {
        method: 'GET'
      });

      if (data.value) {
        const { name, surname } = data.value;
        this.currentUser = { name, surname };
      }
      if (error.value) {
        addNotification(error.value.statusMessage || DEFAULT_ERROR_MESSAGE);
      }
    },

    async login(requestBody: { username: string; password: string }): Promise<{ success: boolean; errorMessage: string }> {
      try {
        await $fetch('/api/login', {
          method: 'POST',
          body: requestBody
        });

        return { success: true, errorMessage: '' };
      } catch (err) {
        let errorMessage = '';
        if (errorHasStatus(err)) {
          if (err.status === 401) errorMessage = 'нет пользователя с такими данными';
          else errorMessage = err.message;
        } else {
          errorMessage = 'неожиданная ошибка';
        }

        return { success: false, errorMessage };
      }
    }
  }
});
