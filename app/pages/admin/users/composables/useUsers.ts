import { ref, onMounted } from 'vue';
import { useNotification } from '~/composables/useNotification';
import { useAuthStore } from '~/store/auth';

export function useUsers() {
  const auth = useAuthStore();
  const notifier = useNotification();
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1);
  const limit = ref(10);
  const total = ref(0);

  async function fetchUsers(p = page.value, l = limit.value) {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: err, execute, refresh } = useEncryptedFetch<UserListResponse>('/api/admin/users', {
        method: 'GET',
        key: `get-users-${p}-${l}`,
        query: { page: p, limit: l },
        headers: { Authorization: `Bearer ${auth.token}` },
        immediate: true
      });

      await refresh();

      // handle transport-level error from composable
      if (err?.value) {
        const msg = err.value instanceof Error ? err.value.message : String(err.value);
        notifier.error(`Error fetching users: ${msg || 'Unknown error'}`);
        users.value = [];
        total.value = 0;
        return;
      }

      /*result.users = result.users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'user.roles[0].name', //Parche mejorar luego de acuerdo a la necesidad
        // role: user.roles.map(r => ({ id: r.id, name: r.name, description: r.description, is_active: r.is_active })),
        is_email_verified: user.is_email_verified,
        email_verification_token: null,
        password_reset_token: null,
        password_reset_expires: null,
        avatar: null,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at
      }))*/

      const res = {
        users: data.value?.users || [],
        total: data.value?.total || 0,
        page: p ?? 1,
        limit: l ?? 10,
        totalPages: data.value?.totalPages || 0
      };

      if (res && Array.isArray(res.users)) {
        users.value = res.users as unknown as User[];
        total.value = typeof res.total === 'number' ? res.total : 0;
        page.value = typeof res.page === 'number' ? res.page : p;
        limit.value = typeof res.limit === 'number' ? res.limit : l;
      } else {
        users.value = [];
        total.value = 0;
      }
    } catch (e: unknown) {
      if (e && typeof e === 'object') {
        const err = e as Record<string, unknown>;
        if ('message' in err && typeof err.message === 'string') {
          error.value = err.message;
        } else {
          error.value = 'Error fetching users';
        }
      } else {
        error.value = 'Error fetching users';
      }
    } finally {
        loading.value = false;
    }
  }

  async function createUser(payload: Partial<ApiUser> & { password?: string }) {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: err, execute } = useEncryptedFetch<UserListResponse>('/api/admin/users', {
        method: 'POST',
        key: `post-users`,
        body: payload,
        headers: { Authorization: `Bearer ${auth.token}` },
        //server: true,
        immediate: false,
        onRequest: () => console.log('🔐 Resetting password...'),
        onResponse: () => console.log('✅ Password reset completed'),
        onResponseError: ({ error }) => console.error('🔐 Password reset failed:', error)
      });

      await execute();

      await fetchUsers(page.value, limit.value);

      notifier.success('Usuario creado correctamente', { icon: 'lucide-check-circle' });
      return data;
    } catch (e: unknown) {
        const errMsg = (() => {
          if (e instanceof Error) return e.message;
          if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
            return (e as { message?: string }).message as string;
          }
          return 'Error creando usuario';
        })();
        notifier.error(errMsg);
        throw e;
    } finally {
        loading.value = false;
    }
  }

  async function updateUser(id: string, payload: Partial<ApiUser> & { password?: string }) {
    loading.value = true;
    try {
      const res = await $fetch<ApiUser>(`/api/admin/users/${id}`, {
        method: 'PATCH',
        body: payload,
        headers: { Authorization: `Bearer ${auth.token}` },
        // key: `update-user-${useId}`
      });
      // if (error?.value) {
      //     const msg = error.value instanceof Error ? error.value.message : String(error.value)
      //     notifier.error(`Error actualizando usuario: ${msg || 'Unknown error'}`)
      //     throw new Error(msg || 'Error actualizando usuario')
      // }
      notifier.success('Usuario actualizado correctamente');
      await fetchUsers(page.value, limit.value);
      return res;
    } catch (e: unknown) {
      const errMsg = (() => {
        if (e instanceof Error) return e.message;
        if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
          return (e as { message?: string }).message as string;
        }
        return 'Error actualizando usuario';
      })();
      notifier.error(errMsg);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteUser(id: string) {
    loading.value = true;
    try {
      const res = await $fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${auth.token}` } });
      await fetchUsers();
      notifier.success('Usuario eliminado correctamente');
      return res;
    } catch (e: unknown) {
      const errMsg = (() => {
        if (e instanceof Error) return e.message;
        if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
          return (e as { message?: string }).message as string;
        }
        return 'Error eliminando usuario';
      })();
      notifier.error(errMsg);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    loading,
    error,
    page,
    limit,
    total,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}
