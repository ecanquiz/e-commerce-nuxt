export const useImageUpload = () => {
  const { $encrypt, $decrypt } = useNuxtApp()
  const config = useRuntimeConfig()

  const uploadImage = async (
    file: File,
    productId: string,
    merchantId: string
  ) => {
    try {
      // Preparar los datos para el cifrado
      const uploadData = {
        productId,
        merchantId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        timestamp: Date.now()
      }

      // Cifrar los metadatos (opcional, según tu arquitectura)
      const encryptedMetadata = $encrypt?.(uploadData) || uploadData

      const formData = new FormData()
      formData.append('file', file)
      formData.append('metadata', JSON.stringify(encryptedMetadata))

      // Realizar la petición a través de Nitro (proxy)
      const response = await $fetch('/api/uploads', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Descifrar la respuesta si es necesario
      return $decrypt?.(response) || response

    } catch (error: any) {
      throw new Error(error.data?.message || 'Error al subir la imagen')
    }
  }

  const deleteImage = async (imageId: string) => {
    try {
      const response = await $fetch(`/api/uploads/${imageId}`, {
        method: 'DELETE'
      })

      return $decrypt?.(response) || response
    } catch (error: any) {
      throw new Error(error.data?.message || 'Error al eliminar la imagen')
    }
  }

  const getProductImages = async (productId: string, merchantId: string): Promise<ProductImage[]> => {
    try {
      const response = await $fetch(
        `/api/uploads/merchant/${merchantId}/product/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // Descifrar la respuesta si es necesario
      return $decrypt?.(response) || response
    } catch (error: any) {
      throw new Error(error.data?.message || 'Error al cargar las imágenes')
    }
  }

  return {
    uploadImage,
    deleteImage,
    getProductImages
  }
}
