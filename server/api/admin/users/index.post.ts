import { z } from 'zod'
import { userService } from '~~/server/services'

export default defineEventHandler(async (event) => {
    try {
         const token = getHeader(event, 'authorization');
        // const { token } = await requireAuth(event)
        // if (user.role.toLowerCase() !== 'admin') {
        //     throw createError({ statusCode: 401, message: 'Unauthorized' })
        // }

        const body = await readBody(event)

        const CreateUserSchema = z.object({
            email: z.email(),
            name: z.string().min(1),
            role: z.enum(['customer', 'vineyard', 'admin']).optional(),
            password: z.string().min(6).optional()
        })

        const parsed = CreateUserSchema.parse(body)

        const created = await userService.createUser({
            email: parsed.email,
            name: parsed.name,
            role: parsed.role ?? 'customer',
            password: parsed.password
        }, token)

        // map internal User -> ApiUser shape (omit password)
        const apiUser = {
            id: created.id,
            email: created.email,
            name: created.name,
            is_email_verified: true,
            email_verification_token: null,
            password_reset_token: null,
            password_reset_expires: null,
            avatar: null,
            created_at: created.createdAt,
            updated_at: created.createdAt,
            deleted_at: null
        }

        return apiUser
    } catch (error: unknown) {
        console.error('[Nitro] POST /api/admin/users error:', error)
        let message = 'Error creating user'
        let statusCode = 500

        type ErrorLike = { message?: unknown; statusCode?: unknown }
        const isErrorLike = (v: unknown): v is ErrorLike => typeof v === 'object' && v !== null

        if (isErrorLike(error)) {
            if (typeof error.message === 'string') message = error.message
            if (typeof error.statusCode === 'number') statusCode = error.statusCode
        }

        throw createError({ statusCode, message })
    }
})
