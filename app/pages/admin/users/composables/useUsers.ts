import { ref, onMounted } from 'vue'
import { useNotification } from '~/composables/useNotification'
import { useAuthStore } from '~/store/auth'

export function useUsers() {
    const auth = useAuthStore()
    const notifier = useNotification()
    const users = ref<User[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const page = ref(1)
    const limit = ref(10)
    const total = ref(0)

    async function fetchUsers(p = page.value, l = limit.value) {
        loading.value = true
        error.value = null
        try {
            const { data, error: err, execute } = useEncryptedFetch<UserListResponse>('/api/admin/users', {
                method: 'GET',
                key: `users-page-${useId}`,
                lazy: true,
                query: { page: p, limit: l },
                headers: { Authorization: `Bearer ${auth.token}` },
                server: false,
                immediate: true
            })

            await execute()

            // handle transport-level error from composable
            if (err?.value) {
                const msg = err.value instanceof Error ? err.value.message : String(err.value)
                notifier.error(`Error fetching users: ${msg || 'Unknown error'}`)
                users.value = []
                total.value = 0
                return
            }

            const res = data.value
            if (res && Array.isArray(res.users)) {
                users.value = res.users as unknown as User[]
                total.value = typeof res.total === 'number' ? res.total : 0
                page.value = typeof res.page === 'number' ? res.page : p
                limit.value = typeof res.limit === 'number' ? res.limit : l
            } else {
                users.value = []
                total.value = 0
            }
        } catch (e: unknown) {
            if (e && typeof e === 'object') {
                const err = e as Record<string, unknown>
                if ('message' in err && typeof err.message === 'string') {
                    error.value = err.message
                } else {
                    error.value = 'Error fetching users'
                }
            } else {
                error.value = 'Error fetching users'
            }
        } finally {
            loading.value = false
        }
    }

    async function createUser(payload: Partial<ApiUser> & { password?: string }) {
        loading.value = true
        try {
            const { data, error } = useEncryptedFetch('/api/admin/users',
                { method: 'POST', body: payload, headers: { Authorization: `Bearer ${auth.token}` } }
            )
            await fetchUsers()
            if (error?.value) {
                const msg = error.value instanceof Error ? error.value.message : String(error.value)
                notifier.error(`Error creando usuario: ${msg || 'Unknown error'}`)
                throw new Error(msg || 'Error creando usuario')
            }
            notifier.success('Usuario creado correctamente', { icon: 'lucide-check-circle' })
            return data.value
        } catch (e: unknown) {
            const errMsg = (() => {
                if (e instanceof Error) return e.message
                if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
                    return (e as { message?: string }).message as string
                }
                return 'Error creando usuario'
            })()
            notifier.error(errMsg)
            throw e
        } finally {
            loading.value = false
        }
    }

    async function updateUser(id: string, payload: Partial<ApiUser> & { password?: string }) {
        loading.value = true
        try {
            const res = await $fetch(`/api/admin/users/${id}`, { method: 'PATCH', body: payload, headers: { Authorization: `Bearer ${auth.token}` } })
            await fetchUsers()
            notifier.success('Usuario actualizado correctamente')
            return res
        } catch (e: unknown) {
            const errMsg = (() => {
                if (e instanceof Error) return e.message
                if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
                    return (e as { message?: string }).message as string
                }
                return 'Error actualizando usuario'
            })()
            notifier.error(errMsg)
            throw e
        } finally {
            loading.value = false
        }
    }

    async function deleteUser(id: string) {
        loading.value = true
        try {
            const res = await $fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${auth.token}` } })
            await fetchUsers()
            notifier.success('Usuario eliminado correctamente')
            return res
        } catch (e: unknown) {
            const errMsg = (() => {
                if (e instanceof Error) return e.message
                if (e && typeof e === 'object' && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
                    return (e as { message?: string }).message as string
                }
                return 'Error eliminando usuario'
            })()
            notifier.error(errMsg)
            throw e
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        void fetchUsers()
    })

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
