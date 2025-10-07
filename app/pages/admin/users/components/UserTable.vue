<script setup lang="ts">
import { ref, h } from 'vue'

const props = defineProps({
    data: { type: Array as () => Record<string, unknown>[], default: () => [] }
})

const emit = defineEmits(['edit', 'delete', 'create'])

const table = ref()

const columns = [

    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'name', header: 'Nombre' },
    {
        accessorKey: 'created_at',
        header: 'Creado',
        cell: ({ row }: { row: { original: Record<string, unknown>; getValue: (k: string) => unknown } }) => {
            const val = row.getValue('created_at')
            return String(val ? new Date(String(val)).toLocaleString() : '')
        }
    },
    {
        accessorKey: 'role', header: 'Role',
        cell: ({ row }: { row: { original: Record<string, unknown>; getValue: (k: string) => unknown } }) => {
            const val = row.getValue('role')
            let color = 'gray'
            if (val === 'admin') color = 'blue'
            else if (val === 'vineyard') color = 'blue'
            else if (val === 'customer') color = 'green'
            return h('span', { class: `px-2 py-1 rounded text-white text-uppercase bg-${color}-500` }, String(val))
        }

    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }: { row: { original: Record<string, unknown> } }) => {
            const orig = row.original as Record<string, unknown>
            return h('div', { class: 'flex gap-2' }, [
                h(
                    'button',
                    { class: 'px-2 py-1 bg-yellow-100 rounded', onClick: () => emit('edit', orig) },
                    'Editar'
                ),
                h(
                    'button',
                    { class: 'px-2 py-1 bg-red-100 rounded', onClick: () => emit('delete', orig) },
                    'Eliminar'
                )
            ])
        }
    }
]

const pagination = ref({ pageIndex: 0, pageSize: 10 })

</script>

<template>
    <div class="w-full space-y-4 pb-4">
        <div class="flex justify-end">
            <UButton color="primary" @click="$emit('create')">Crear usuario</UButton>
        </div>

        <UTable ref="table" v-model:pagination="pagination" :data="props.data" :columns="columns" class="flex-1" />

        <div class="flex justify-center border-t border-default pt-4">
            <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                :items-per-page="table?.tableApi?.getState().pagination.pageSize" :total="props.data.length"
                @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)" />
        </div>
    </div>
</template>
