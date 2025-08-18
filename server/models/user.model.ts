import type { User } from '~/types'

// Mock data with explicit type
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@viñedosya.com',
    password: 'pass123', // In production we would use bcrypt
    name: 'Admin',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'viñedo@ejemplo.com',
    password: 'pass123',
    name: 'Bodega López',
    role: 'vineyard',
    vineyardId: '101',
    createdAt: new Date().toISOString()
  }
]

// Helper to search for users by ID
export const findUserById = (id: string): User | undefined => {
  return mockUsers.find((user: User) => user.id === id)
}

// Helper to search for users by email
export const findUserByEmail = (email: string) => 
  mockUsers.find(user => user.email === email)

export const validatePassword = (user: User, password: string) => 
  user.password === password // It actually uses bcrypt.compare!

