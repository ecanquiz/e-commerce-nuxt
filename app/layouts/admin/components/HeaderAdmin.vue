<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const close = () => { isOpen.value = false }
const toggle = () => { isOpen.value = !isOpen.value }

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
}

watch(isOpen, (val) => {
    // Prevent body scroll when drawer is open
    if (import.meta.client) {
        document.body.style.overflow = val ? 'hidden' : ''
    }
})

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    if (import.meta.client) document.body.style.overflow = ''
})

const go = (path: string) => {
    close()
    router.push(path)
}
</script>

<template>
    <div>
        <header class="bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
            <div class="flex items-center">
                <button
class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring" aria-label="Abrir menú"
                    @click="toggle">
                    <Icon name="lucide:menu" size="24" class="text-gray-700" />
                </button>

                <NuxtLink to="/admin" class="ml-3 font-bold text-lg text-gray-900">Admin</NuxtLink>
            </div>

            <div class="flex items-center space-x-3">
                <button class="p-2 rounded-md hover:bg-gray-100" title="Ajustes">
                    <Icon name="lucide:settings" size="20" class="text-gray-700" />
                </button>
                <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200" title="Perfil">
                    <Icon name="lucide:user" size="20" class="text-gray-700" />
                </button>
            </div>
        </header>

        <!-- Drawer + overlay -->
        <transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 z-40">
                <!-- overlay -->
                <div class="absolute inset-0 bg-black/40" aria-hidden="true" @click="close" />

                <!-- drawer -->
                <aside class="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform">
                    <div class="flex items-center justify-between px-4 py-3 border-b">
                        <div class="text-lg font-semibold">Panel Admin</div>
                        <button class="p-2 rounded-md hover:bg-gray-100" aria-label="Cerrar menú" @click="close">
                            <Icon name="lucide:x" size="20" class="text-gray-700" />
                        </button>
                    </div>

                    <nav class="p-4 space-y-1">
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/admin')">Dashboard</button>
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/admin/users')">Usuarios</button>
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/admin/inventory')">Inventario</button>
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/admin/products')">Productos</button>
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/admin/orders')">Órdenes</button>
                        <hr class="my-2">
                        <button
class="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                            @click="go('/dashboard/vineyard')">Mi viñedo</button>
                    </nav>

                    <div class="mt-auto p-4 border-t">
                        <NuxtLink to="/" class="text-sm text-gray-600 hover:underline">Ver sitio</NuxtLink>
                    </div>
                </aside>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
