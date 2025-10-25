import { useAuthStore } from '~/store/auth';

export default () => {
  const auth = useAuthStore();

  return computed(() => 
    auth.user?.roles![0]!.name === 'admin' ? 'Admin' : 'Vineyard')
}
