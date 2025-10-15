export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin';
  vineyardId?: string;
  createdAt: string;
}

export interface ApiUser {
  id: string;
  email: string;
  // password is intentionally omitted from API responses for security
  name?: string;
  is_email_verified?: boolean;
  email_verification_token?: string | null;
  password_reset_token?: string | null;
  password_reset_expires?: string | null;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface UserListResponse {
  users: ApiUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
