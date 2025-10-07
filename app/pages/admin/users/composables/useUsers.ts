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

            const { data, error, execute } = useEncryptedFetch<any>('/api/admin/users', {
            method: 'GET',
            query: { page: p, limit: l },
            headers: {
                Authorization: `Bearer ${auth.token}`
            },          
            key: `admi-users-${Date.now()}`,
            immediate: false,
            onRequest: () => console.log('🔐 Fetching profile...'),
            onResponse: () => console.log('✅ Profile fetched successfully')
            })

            await execute()

            if (data.value && typeof data.value === 'object') {
                const r = data.value as Record<string, unknown>
                if ('users' in r && Array.isArray(r.users)) {
                    users.value = r.users as User[]
                } else {
                    users.value = []
                }
                if ('total' in r && typeof r.total === 'number') total.value = r.total
            } else {
                users.value = []
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
            const res = await $fetch('/api/admin/users',
                { method: 'POST', body: payload, headers: { Authorization: `Bearer ${auth.token}` } }
            )
            await fetchUsers()
            notifier.success('Usuario creado correctamente', { icon: 'lucide-check-circle' })
            return res
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
