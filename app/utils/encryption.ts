export interface EncryptionResult {
  ciphertext: string;
  iv: string;
  salt: string;
  iterations: number;
}

export interface QueryParams {
  [key: string]: string;
}

export function encryption(encKey: string) {
  const encryptMethod = "AES-CBC";

  async function decrypt(encryptedString: string): Promise<QueryParams> {
    try {
      const json: EncryptionResult = JSON.parse(atob(encryptedString));

      if (!encKey) {
        throw new Error('Encryption key not provided');
      }

      const salt = hexToBytes(json.salt);
      const iv = hexToBytes(json.iv);
      const encryptedData = base64ToBytes(json.ciphertext);

      const key = await deriveKeyPbkdf2(encKey, salt);
      
      const decrypted = await window.crypto.subtle.decrypt(
        { name: encryptMethod, iv },
        key,
        encryptedData
      );

      const outcome = new TextDecoder().decode(decrypted);
      
      const processed = outcome
        .replace(/%22/g, '%27')
        .replace(/\+/g, '%2B');
      
      const decoded = decodeURIComponent(processed)
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

      return parseQueryString(decoded);
    } catch (error) {
      console.error('🔐 Decryption error:', error);
      throw error;
    }
  }

  async function encrypt(string: string): Promise<string> {
    try {
      if (!encKey) {
        throw new Error('Encryption key not provided');
      }

      const iv = crypto.getRandomValues(new Uint8Array(16));
      const salt = crypto.getRandomValues(new Uint8Array(256));
      const key = await deriveKeyPbkdf2(encKey, salt);

      const data = new TextEncoder().encode(string);
      const encrypted = await crypto.subtle.encrypt(
        { name: encryptMethod, iv },
        key,
        data
      );

      const ciphertext = bytesToBase64(new Uint8Array(encrypted));
      
      const output: EncryptionResult = {
        ciphertext,
        iv: bytesToHex(iv),
        salt: bytesToHex(salt),
        iterations: 999
      };

      return btoa(JSON.stringify(output));
    } catch (error) {
      console.error('🔐 Encryption error:', error);
      throw error;
    }
  }

  // Helper functions
  async function deriveKeyPbkdf2(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const importedKey = await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveKey"]);

    return await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 999, hash: "SHA-512" },
      importedKey,
      { name: "AES-CBC", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  function hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function bytesToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      // @ts-ignore
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function parseQueryString(queryString: string): QueryParams {
    const params: QueryParams = {};
    const pairs = queryString.split('&');
    
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    }
    return params;
  }

  return { decrypt, encrypt };
}

export type EncryptionFunctions = ReturnType<typeof encryption>;