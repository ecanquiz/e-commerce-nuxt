<script lang="ts" setup>
import UserTable from './components/UserTable.vue'
import UserForm from './components/UserForm.vue'
import { useUsers } from './composables/useUsers'
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const usersApi = useUsers()
const { users, loading: _loading, createUser, updateUser, deleteUser } = usersApi

const selectedUser = ref<ApiUser | null>(null)
const formMode = ref<'create' | 'edit'>('create')

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const deleteCandidate = ref<ApiUser | null>(null)

function onCreate() {
    selectedUser.value = null
    formMode.value = 'create'
    showFormModal.value = true
}

function onEdit(user: ApiUser) {
    selectedUser.value = user
    formMode.value = 'edit'
    showFormModal.value = true
}

async function onDelete(user: ApiUser) {
    // open confirm modal
    deleteCandidate.value = user
    showDeleteModal.value = true
}

async function confirmDelete() {
    if (!deleteCandidate.value) return
    await deleteUser(deleteCandidate.value.id)
    deleteCandidate.value = null
    showDeleteModal.value = false
}

async function onSubmit(payload: Partial<ApiUser> & { password?: string } | { __errors?: string[] }) {
    if (formMode.value === 'create') {
        await createUser(payload as Partial<ApiUser> & { password?: string })
    } else if (formMode.value === 'edit' && selectedUser.value) {
        await updateUser(selectedUser.value.id, payload as Partial<ApiUser> & { password?: string })
    }
    // close modal after successful submit
    showFormModal.value = false
}

function onCancel() {
    selectedUser.value = null
    formMode.value = 'create'
    showFormModal.value = false
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Gestión de Usuarios</h1>


        <div class="bg-white p-4 rounded shadow">
            <UserTable :data="users" @edit="onEdit" @delete="onDelete" @create="onCreate" />
        </div>

        <!-- Form modal (create / edit) -->
        <UModal v-model:open="showFormModal" :dismissible="false">
            <template #title>{{ formMode === 'create' ? 'Crear usuario' : 'Editar usuario' }}</template>
            <template #body>
                <UserForm :model-value="selectedUser" :mode="formMode" :loading="_loading" @submit="onSubmit"
                    @cancel="onCancel" />
            </template>
        </UModal>

        <!-- Delete confirm modal -->
        <UModal v-model:open="showDeleteModal" :dismissible="false" :ui="{
            footer: 'flex justify-end gap-2',
        }">
            <template #title>Confirmar eliminación</template>
            <template #body>
                <p>¿Estás seguro de que deseas eliminar al usuario <strong>{{ deleteCandidate?.email }}</strong>?</p>
            </template>
            <template #footer>
                <div>
                    <UButton variant="ghost" @click="showDeleteModal = false">Cancelar</UButton>
                    <UButton color="error" @click="confirmDelete">Eliminar</UButton>
                </div>
            </template>
        </UModal>
    </div>
</template>
