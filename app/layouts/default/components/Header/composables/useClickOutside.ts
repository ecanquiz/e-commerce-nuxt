import type { Ref } from 'vue'

export const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  callback: () => void,
  options?: { ignore?: Ref<HTMLElement | null>[] }
) => {
  const handler = (event: MouseEvent | TouchEvent) => {
    const element = elementRef.value
    const target = event.target as Node
    
    if (!element || !target) return

    // Ignore additional elements (e.g. button that opens the dropdown)
    const shouldIgnore = options?.ignore?.some(ref => ref.value?.contains(target))
    if (shouldIgnore) return
    
    if (!element.contains(target)) {
      callback()
    }
  }

  // Listen to both events for better compatibility
  onMounted(() => {
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handler)
    document.removeEventListener('touchstart', handler)
  })
}