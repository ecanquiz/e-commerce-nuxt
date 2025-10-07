<script setup lang="ts">
import { reactive, watch } from 'vue'
import { z } from 'zod'

const props = defineProps({
    modelValue: { type: Object as () => Record<string, unknown> | null, default: null },
    mode: { type: String as () => 'create' | 'edit', default: 'create' },
    loading: { type: Boolean, default: false }
})

const emit = defineEmits(['submit', 'cancel'])

type FormState = {
    email: string | undefined
    password?: string | undefined
    name: string | undefined
    role: 'customer' | 'vineyard' | 'admin'
}

const state = reactive<FormState>({
    email: undefined,
    password: undefined,
    name: undefined,
    role: 'customer'
})

const errors = reactive<Record<string, string | undefined>>({ email: undefined, password: undefined, name: undefined, role: undefined })

// provide a minimal state object for UForm typing
const formState = reactive<Record<string, unknown>>({})

watch(
    () => props.modelValue,
    (v) => {
        if (v) {
            state.email = (v as Record<string, unknown>).email as string | undefined
            state.name = (v as Record<string, unknown>).name as string | undefined
            const r = (v as Record<string, unknown>).role
            if (r === 'customer' || r === 'vineyard' || r === 'admin') {
                state.role = r
            } else {
                state.role = 'customer'
            }
            state.password = undefined
        } else {
            state.email = undefined
            state.name = undefined
            state.role = 'customer'
            state.password = undefined
        }
    },
    { immediate: true }
)

const CreateSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    name: z.string().min(1, { message: 'Nombre requerido' }),
    role: z.enum(['customer', 'vineyard', 'admin']).default('customer'),
    password: z.string().min(8, { message: 'Password mínimo 8 caracteres' })
})

const UpdateSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }).optional(),
    name: z.string().min(1, { message: 'Nombre requerido' }).optional(),
    role: z.enum(['customer', 'vineyard', 'admin']).optional(),
    password: z.string().min(8, { message: 'Password mínimo 8 caracteres' }).optional()
})

async function handleSubmit(e?: Event) {
    if (e) e.preventDefault()
    // reset errors
    errors.email = undefined
    errors.password = undefined
    errors.name = undefined
    errors.role = undefined

    try {
        if (props.mode === 'create') {
            const parsed = CreateSchema.parse({ email: state.email, name: state.name, role: state.role, password: state.password })
            emit('submit', parsed)
        } else {
            const parsed = UpdateSchema.parse({ email: state.email, name: state.name, role: state.role, password: state.password })
            emit('submit', parsed)
        }
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'errors' in err) {
            // zod error
            const zerr = err as { errors?: Array<{ path: Array<string | number>; message: string }> }
            if (Array.isArray(zerr.errors)) {
                for (const eItem of zerr.errors) {
                    const k = String(eItem.path?.[0] ?? '')
                    if (k) errors[k] = eItem.message
                }
            }
        } else if (err instanceof Error) {
            // generic error
            errors.email = err.message
        }
    }
}

function onCancel() {
    emit('cancel')
}
</script>


<template>
    <UForm class="space-y-4 justify-center w-full" :state="formState" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-2 md:flex">
            <UFormField label="Email" :error="errors.email">
                <UInput v-model="state.email" type="email" class="w-full" />
            </UFormField>

            <UFormField v-if="props.mode !== 'edit'" label="Password" :error="errors.password">
                <UInput v-model="state.password" type="password" class="w-full" />
            </UFormField>
        </div>



        <div class="grid grid-cols-1 gap-2 md:flex">
            <UFormField label="Nombre" :error="errors.name">
                <UInput v-model="state.name" class="w-full" />
            </UFormField>
            <UFormField label="Role" :error="errors.role">
                <USelect v-model="state.role" :items="[
                    { label: 'Cliente', value: 'customer' },
                    { label: 'Viñedo', value: 'vineyard' },
                    { label: 'Admin', value: 'admin' }
                ]" class="w-full min-w-[200px]" />
            </UFormField>
        </div>

        <div class="flex items-center justify-center gap-2 mt-10">
            <UButton type="submit" :loading="props.loading" color="primary">{{ props.mode === 'create' ? 'Crear' :
                'Guardar' }}</UButton>

            <UButton type="button" variant="ghost" @click="onCancel">Cancelar</UButton>
        </div>
    </UForm>
</template>

<style scoped>
/* estilos mínimos */
</style>
