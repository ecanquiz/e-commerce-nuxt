# Encryption Implementation Guide

## Overview
This document outlines the encryption architecture and implementation standards for the Nuxt 3 + NestJS e-commerce application. The system provides end-to-end encryption between frontend and backend while maintaining development flexibility.

## Environment Configuration

### Required Environment Variables
```env
# .env
ENC_KEY=your_secret_key_your_secret_key_
ENCRYPTION_ENABLED=true
```

### Rules:
- `ENC_KEY` must be identical in both Nuxt and NestJS.
- `ENCRYPTION_ENABLED`=`true` in production (always encrypted).
- `ENCRYPTION_ENABLED`=`false`/`true` in development (configurable).

## Architecture

### Data Flow
```text
Nuxt (Client) ↔ Nitro (Proxy) ↔ NestJS (Backend)
      ↓                ↓              ↓
  Encryption  →  Transparent  →   Decryption
      ↓                ↓              ↓
  Decryption  ←  Transparent  ←   Encryption
```

## Responsibility Separation

### Nuxt (Frontend)
- Client-side encryption/decryption
- UI state management
- Form validation

### Nitro (Server Proxy)
- Basic technical validations
- Transparent request forwarding
- Consistent error handling
- Logging and monitoring

### NestJS (Backend)
- Business logic
- Complex validations
- Database operations
- Email services
- JWT token management

## API Consumption Standards

### Rule: Never use native fetch methods directly

❌ Forbidden
```ts
// DON'T use these directly
$fetch('/api/endpoint')
useFetch('/api/endpoint') 
useAsyncData(() => $fetch('/api/endpoint'))
```
✅ Required Methods

### 1. `useEncryptedFetch` (Primary - 90% of cases)

**Use for**: All requests to Nitro endpoints
```ts
const { data, pending, error, execute, refresh } = useEncryptedFetch<T>(
  '/api/endpoint',
  {
    method: 'POST', // GET, POST, PUT, DELETE
    body: payload,
    key: 'unique-cache-key',
    lazy: true,
    server: true,
    immediate: false,
    onRequest: () => console.log('🔐 Request started...'),
    onResponse: () => console.log('✅ Response received'),
    onResponseError: ({ error }) => console.error('❌ Request failed:', error)
  }
)

// Manual execution
await execute()
```

**Advantages:**
- ✅ Better Vue/Nuxt reactivity integration
- ✅ Automatic state management (loading, error, data)
- ✅ Built-in caching with keys
- ✅ Enhanced TypeScript support
- ✅ Integrated hooks
- ✅ No type casting needed

### 2. `$encryptedFetch` (Secondary - Exceptional cases)

**Use for**: Direct calls to NestJS (client-side only, SSR disabled)
```ts
const { $encryptedFetch } = useNuxtApp()
const response = await $encryptedFetch('http://localhost:3001/direct-endpoint', {
  method: 'POST',
  body: payload
})
```

**Use Cases**:
- Email verification pages (`ssr: false`)
- Special client-only operations
- Direct backend communication when necessary

### 3. Native `$fetch` (Nitro to NestJS only)

**Use for**: All server-side communications from Nitro to NestJS

```ts
// server/api/endpoint.post.ts
const response = await $fetch(`${baseUrl}/endpoint`, {
  method: 'POST',
  body: payload,
  headers: { 'Content-Type': 'application/json' }
})
```

## Best Practices

### Data Transformation

Instead of using built-in `transform` and `pick` options, handle transformations reactively:

```ts
// ✅ Recommended approach
const { data } = useEncryptedFetch<Product[]>('/api/products')
const products = computed(() => 
  data.value?.map(p => ({ 
    ...p, 
    price: p.price * 1.21, // Add VAT
    inStock: p.quantity > 0
  })) || []
)


// ✅ Field selection
const { data } = useEncryptedFetch<User>('/api/user')
const userName = computed(() => data.value?.name || '')
const userEmail = computed(() => data.value?.email || '')
```

### Reactive Data Updates

```ts
const categoryId = ref(1)
const { data, refresh } = useEncryptedFetch(`/api/products?category=${categoryId.value}`)

// Auto-refresh when category changes
watch(categoryId, () => refresh())
```

### Error Handling

```ts
const { data, error, execute } = useEncryptedFetch<AuthResponse>('/api/auth/login', {
  immediate: false,
  onResponseError: ({ error }) => {
    console.error('🔐 Authentication failed:', error)
    // Additional error handling logic
  }
})

try {
  await execute()
  if (error.value) {
    throw new Error(error.value.message)
  }
  // Handle success
} catch (err) {
  // Handle execution errors
}
```

## File Structure

```text
app/
├── composables/
│   └── useEncryptedFetch.ts     // Main encryption composable
├── plugins/
│   └── 01-encryption.client.ts  // Encryption plugin
├── utils/
│   └── encryption.ts            // Encryption utilities
└── types/
    └── encryption.ts            // Type definitions
```

## Development Guidelines

### Adding New API Endpoints

- Create Nitro endpoint in `server/api/`
- Update corresponding service in `server/services/`
- Use `useEncryptedFetch` in `app/store/composables`
- Test with both encryption enabled/disabled

### Testing Encryption

```ts
// Test component for encryption verification
const testEncryptionFlow = async () => {
  try {
    const { data, execute } = useEncryptedFetch('/api/test', {
      method: 'POST',
      body: { test: 'data' },
      immediate: false
    })
    
    await execute()
    console.log('🔐 Encryption test passed:', data.value)
  } catch (error) {
    console.error('🔐 Encryption test failed:', error)
  }
}
```

### Debugging

- Check browser Network tab for `encData` payloads
- Verify Nitro logs for `request`/`response` flow
- Confirm NestJS receives proper decrypted data
- Test with `ENCRYPTION_ENABLED=false` to isolate issues

### Security Notes

- Never log raw encryption keys
- Ensure `ENC_KEY` is 32 characters for AES-256
- Rotate keys periodically in production
- Monitor for unusual encryption/decryption failures
- Validate encrypted payload structure in development

### Troubleshooting

**Common Issues**

- **401 Unauthorized**: Check Authorization header preservation
- **Encryption failures**: Verify `ENC_KEY` matches between services
- **Type errors**: Ensure proper generic typing with `useEncryptedFetch<T>`
- **Proxy issues**: Confirm Nitro endpoints properly forward to NestJS

**Performance Considerations**

- Encryption adds ~100-200ms overhead per request
- Use appropriate caching strategies
- Consider lazy loading for non-critical data
- Monitor bundle size for encryption utilities
