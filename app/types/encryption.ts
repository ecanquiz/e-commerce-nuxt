export interface EncryptedResponse {
  encData: string;
  status?: boolean;
}

export interface DecryptedResult {
  data: string;
  [key: string]: any;
}

export function isEncryptedResponse(obj: any): obj is EncryptedResponse {
  return obj && 
         typeof obj === 'object' && 
         'encData' in obj && 
         typeof obj.encData === 'string';
}

// Tipo para el plugin
export interface EncryptionPlugin {
  encryptedFetch: (url: string, options?: any) => Promise<any>;
  encryption: {
    encrypt: (data: string) => Promise<string>;
    decrypt: (encryptedString: string) => Promise<any>;
  } | null;
}