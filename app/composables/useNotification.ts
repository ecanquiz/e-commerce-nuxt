export function useNotification() {
    const toast = useToast()

    function success(message: string, opts: Record<string, unknown> = {}) {
        toast.add({ color: 'success', title: 'Éxito', description: message, ...opts })
    }

    function error(message: string, opts: Record<string, unknown> = {}) {
        toast.add({ color: 'error', title: 'Error', description: message, ...opts })
    }

    function info(message: string, opts: Record<string, unknown> = {}) {
        toast.add({ color: 'info', title: 'Info', description: message, ...opts })
    }

    return { success, error, info }
}
