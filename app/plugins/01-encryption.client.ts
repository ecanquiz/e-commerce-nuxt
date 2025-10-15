import { encryption } from '~/utils/encryption';
import { isEncryptedResponse } from '~/types/encryption';


export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();  
  const encKey = runtimeConfig.public.encKey as string;
  const shouldEncrypt = runtimeConfig.public.encryptionEnabled as boolean;

  // 🟢 Single function that handles both cases
  const encryptedFetch = async (url: string, options: any = {}): Promise<any> => {
    // Case 1: Encryption disabled - skip directly
    if (!encKey || !shouldEncrypt) {
      return await $fetch(url, options);
    }

    // Case 2: Encryption enabled
    const { encrypt, decrypt } = encryption(encKey);
    
    // Determine whether this call should be encrypted
    const isExternalCall = url.startsWith('/api/') || 
                          url.startsWith('/auth/') ||
                          url.startsWith('http://localhost:3001') ||
                          (runtimeConfig.public.nestApiUrl && 
                          url.startsWith(runtimeConfig.public.nestApiUrl as string));
    
    if (!isExternalCall || url.includes('/_nuxt/')) {
      return await $fetch(url, options);
    }
    
    // 🟢 ENCRYPT REQUEST
    let finalOptions = { ...options };
    if (finalOptions.body && typeof finalOptions.body === 'object') {
      try {
        const encryptedBody = await encrypt('data=' + JSON.stringify(finalOptions.body));
        finalOptions.body = { encData: encryptedBody };
        finalOptions.headers = {
          ...finalOptions.headers,
          'Content-Type': 'application/json'
        };
      } catch (error) {
        console.error('🔐 Encryption error:', error);
        delete finalOptions.body.encData;
      }
    }
    
    try {
      // 🟢 Make the call
      const response = await $fetch(url, finalOptions);
    
      // 🟢 DECRYPT RESPONSE
      if (isEncryptedResponse(response)) {
        try {
          const decrypted = await decrypt(response.encData);

          if (typeof decrypted === 'object' && 'data' in decrypted) {
            return JSON.parse(decrypted.data)
          } else if (typeof decrypted === 'string' && (decrypted as any).startsWith('data=')) {
            return JSON.parse((decrypted as any).substring(5))
          } else {
            return decrypted
          }

        } catch (error) {
          console.error('🔐 Decryption error:', error);
          return response;
        }
      }
    
      return response;
    } catch (error: any) {
      console.error('🔐 Fetch error:', error)
      throw error;
    }
  };

  // 🟢 Always provide the same types
  nuxtApp.provide('encryptedFetch', encryptedFetch);
  nuxtApp.provide('encryption', encKey && shouldEncrypt ? encryption(encKey) : null);
});