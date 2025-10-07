import { z } from 'zod'
import { userService } from '~~/server/services'

export default defineEventHandler(async (event) => {
    try {
        // const { user } = await requireAuth(event)
        // if (user.role.toLowerCase() !== 'admin') {
        //     throw createError({ statusCode: 401, message: 'Unauthorized' })
        // }

        const params = getRouterParams(event) as Record<string, string>
        const userId = params.id
        if (!userId) throw createError({ statusCode: 400, message: 'Missing user id' })

        const body = await readBody(event)

        const UpdateUserSchema = z.object({
            email: z.email().optional(),
            name: z.string().min(1).optional(),
            role: z.enum(['customer', 'vineyard', 'admin']).optional(),
            password: z.string().min(6).optional()
        })

        const parsed = UpdateUserSchema.parse(body)

        const updated = await userService.updateUser(userId, {
            email: parsed.email,
            name: parsed.name,
            role: parsed.role ?? undefined,
            password: parsed.password
        })

        const apiUser = {
            id: updated.id,
            email: updated.email,
            name: updated.name,
            is_email_verified: true,
            email_verification_token: null,
            password_reset_token: null,
            password_reset_expires: null,
            avatar: null,
            created_at: updated.createdAt,
            updated_at: new Date().toISOString(),
            deleted_at: null
        }

        return apiUser
    } catch (error: unknown) {
        console.error('[Nitro] Patch /api/admin/users/:id error:', error)
        let message = 'Error updating user'
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
