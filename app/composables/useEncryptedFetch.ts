interface SimpleEncryptedFetchOptions {
  key?: string
  lazy?: boolean
  server?: boolean
  immediate?: boolean
  onRequest?: (context: { request: any; options: any }) => void
  onResponse?: (context: { response: any }) => void
  onRequestError?: (context: { error: any }) => void
  onResponseError?: (context: { error: any }) => void
}

export function useEncryptedFetch<T = any>(
  request: string,
  opts?: SimpleEncryptedFetchOptions & Record<string, any>
) {
  const { $encryptedFetch } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig()
  
  const shouldEncrypt = runtimeConfig.public.encryptionEnabled as boolean
  const encKey = runtimeConfig.public.encKey as string

  const {
    key,
    lazy = false,
    server = true,
    immediate = true,
    onRequest,
    onResponse,
    onRequestError,
    onResponseError,
    ...fetchOptions
  } = opts || {}

  const finalKey = key || request

  const asyncDataFn = async (): Promise<T> => {
    try {
      onRequest?.({ request, options: fetchOptions })

      let result: T

      if (!shouldEncrypt || !encKey) {
        result = await $fetch<T>(request, fetchOptions)
      } else {
        const encryptedFetch = $encryptedFetch as (url: string, options?: any) => Promise<T>
        result = await encryptedFetch(request, fetchOptions)
      }

      onResponse?.({ response: result })
      return result
    } catch (error: any) {
      if (error.response) {
        onResponseError?.({ error })
      } else {
        onRequestError?.({ error })
      }
      throw error
    }
  }

  const asyncDataResult = useAsyncData<T>(finalKey, asyncDataFn, {
    lazy,
    server,
    immediate
  })

  const status = computed(() => {
    if (asyncDataResult.pending.value) return 'pending'
    if (asyncDataResult.error.value) return 'error'
    if (asyncDataResult.data.value) return 'success'
    return 'idle'
  })

  const execute = async (): Promise<T | null> => {
    await asyncDataResult.refresh()
    return asyncDataResult.data.value as T | null
  }

  const refresh = async (opts?: { dedupe?: boolean }): Promise<void> => {
    await asyncDataResult.refresh(opts as any)
  }

  return {
    data: asyncDataResult.data as Ref<T | null>,
    pending: asyncDataResult.pending,
    refresh,
    execute,
    error: asyncDataResult.error as Ref<Error | null>,
    status
  }
}

export const useEncryptedGet = <T = any>(
  url: string, 
  options?: SimpleEncryptedFetchOptions
) => useEncryptedFetch<T>(url, { method: 'GET', ...options })

export const useEncryptedPost = <T = any>(
  url: string, 
  options?: SimpleEncryptedFetchOptions & { body?: any }
) => useEncryptedFetch<T>(url, { method: 'POST', ...options })

export const useEncryptedPut = <T = any>(
  url: string, 
  options?: SimpleEncryptedFetchOptions & { body?: any }
) => useEncryptedFetch<T>(url, { method: 'PUT', ...options })

export const useEncryptedDelete = <T = any>(
  url: string, 
  options?: SimpleEncryptedFetchOptions
) => useEncryptedFetch<T>(url, { method: 'DELETE', ...options })