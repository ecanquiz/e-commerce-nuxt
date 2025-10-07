import type { ApiUser, UserListResponse } from '~~/shared/types';
import generateId from '../utils/generateId';

// Tipo de usuario tal como se devuelve por la API (snake_case + campos opcionales)
export interface UserService {
    getUser(userId: string): Promise<User | null>
    getAllUsers(page?: number, limit?: number, authorization?: string): Promise<UserListResponse>
    createUser(userData: Partial<User>, token: string): Promise<User>
    updateUser(userId: string, userData: Partial<User>, token: string): Promise<User>
    deleteUser(userId: string, token: string): Promise<void>
}


export class MockUserService implements UserService {
    private users: User[] = [
        {
            id: '1', name: 'Alice', email: 's8Nf0@example.com', role: 'admin',
            password: "Alice123!",
            createdAt: "2024-01-01T00:00:00Z"
        },
        {
            id: '2', name: 'Bob', email: '8YB0a@example.com', role: 'customer',
            password: "Bob123!",
            createdAt: "2024-01-02T00:00:00Z"
        },
    ];

    async getUser(userId: string): Promise<User | null> {
        return this.users.find(user => user.id === userId) || null;
    }

    async getAllUsers(page: number = 1, limit: number = 10): Promise<UserListResponse> {
        const total = this.users.length;
        const safeLimit = Math.max(1, Math.floor(limit) || 10);
        const safePage = Math.max(1, Math.floor(page) || 1);
        const totalPages = Math.max(1, Math.ceil(total / safeLimit));

        const start = (safePage - 1) * safeLimit;
        const end = start + safeLimit;

        const pageUsers: ApiUser[] = this.users.slice(start, end).map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            is_email_verified: u.role === 'admin' ? true : false,
            email_verification_token: null,
            password_reset_token: null,
            password_reset_expires: null,
            avatar: null,
            created_at: u.createdAt || new Date().toISOString(),
            updated_at: u.createdAt || new Date().toISOString(),
            deleted_at: null
        }));

        return {
            users: pageUsers,
            total,
            page: safePage,
            limit: safeLimit,
            totalPages
        } as UserListResponse;
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser: User = {
            id: generateId(),
            name: userData.name || '',
            password: userData.password || '',
            email: userData.email || '',
            role: userData.role || 'customer',
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User> {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, userData);
        return user;
    }

    async deleteUser(userId: string): Promise<void> {
        this.users = this.users.filter(u => u.id !== userId);
    }
}


export class NestUserService implements UserService {
    private baseUrl: string

    constructor() {
        this.baseUrl = import.meta.env.NEST_API_URL ?? 'http://localhost:3001'
    }

    async getUser(_userId: string): Promise<User | null> {
        try {
            const response = await $fetch(`${this.baseUrl}/users/${_userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Agrega aquí cualquier encabezado necesario, como autorización
                }
            });
            return response as User;
        } catch (error) {
            if (error && typeof error === 'object' && 'statusCode' in error && (error as { statusCode: unknown }).statusCode === 404) {
                return null; // Usuario no encontrado
            }
            throw error; // Re-lanzar otros errores
        }
    }

    async getAllUsers(_page?: number, _limit?: number, authorization?: string): Promise<UserListResponse> {
        console.log('HHeaders ', authorization)
        try {
            const params: Record<string, number> = {};
            if (_page) params.page = _page;
            if (_limit) params.limit = _limit;

            const response = await $fetch<UserListResponse>(`${this.baseUrl}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization || ''
                },
                params
            });
            // return response as UserListResponse;
            return {
                users: response?.users || [],
                total: response?.total || 0,
                page: _page ?? 1,
                limit: _limit ?? 10,
                totalPages: response?.totalPages || 0
            } as UserListResponse;
        } catch (error) {
            console.error('Error fetching users from Nest API:', error);
            throw (error) /* LANZAR ERROR PARA QUE TYPESCRIPT NO GRITE POR EL TIPO DE RETORNO DE LA FUNCIÓN */
        }
    }

    async createUser(_userData: Partial<User>, _token: string): Promise<User> {
        // Implementación real
        console.log('Token in createUser:', _token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': _token
        };
        console.log('Headers in createUser:', headers);
        try {
            const response = await $fetch<User>(`${this.baseUrl}/users`, {
                method: 'POST',
                headers,
                body: _userData
            });
            return response;
        } catch (error) {
            console.error('Error creating user in Nest API:', error);
            throw error;
        }
    }
    async updateUser(_userId: string, _userData: Partial<User>, _token: string): Promise<User> {
        // Implementación real
        throw new Error('Not implemented');
    }

    async deleteUser(_userId: string, _token: string): Promise<void> {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': _token
            };
            await $fetch(`${this.baseUrl}/users/${_userId}`, {
                method: 'DELETE',
                headers
            });
        } catch (error) {
            console.error('Error deleting user in Nest API:', error);
            throw error;
        }
    }
}