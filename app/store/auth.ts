import type { User } from '~/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const login = async (credentials: any) => { /* ... */ };
  return { user, login };
});
