import { userService } from '~~/server/services'

export default defineEventHandler(async (event) => {
    try {
        // const { user } = await requireAuth(event)
        // console.log('User getting all users', user);
        // if (user.role.toLowerCase() !== 'admin') {
        //     throw createError({ statusCode: 401, message: 'Unauthorized' })
        // }

        const authorization = getHeader(event, 'authorization')
        const query = getQuery(event) as Record<string, string | undefined>
        const page = query.page ? Number(query.page) : 1
        const limit = query.limit ? Number(query.limit) : 10

        const result = await userService.getAllUsers(page, limit, authorization)
        return result
    } catch (error: unknown) {
        console.error('[Nitro] /api/users error:', error)
        let message = 'Error fetching users'
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
