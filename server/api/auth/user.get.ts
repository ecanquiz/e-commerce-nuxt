import { mockUsers } from '~~/server/models/user.model'

export default defineEventHandler((event) => {
  const token = getHeader(event, 'authorization')?.split(' ')[1]
  
  if (!token) {
    throw createError({ statusCode: 401 })
  }

  // We simulate extracting userId from the token (in reality we would decode it)
  const userId = token.split('.')[1]
  const user = mockUsers.find(u => u.id === userId)

  if (!user) {
    throw createError({ statusCode: 401 })
  }

  return { 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
})