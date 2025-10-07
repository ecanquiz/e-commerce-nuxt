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

        await userService.deleteUser(userId)

        return { success: true }
    } catch (error: unknown) {
        console.error('[Nitro] DELETE /api/admin/users/:id error:', error)
        let message = 'Error deleting user'
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
