import { useEffect } from 'react'

export const useEscape = onEscape => {
  useEffect(() => {
    const KEY_DOWN = 'keydown'

    const handleEscape = event => {
      if (event.keyCode === 27) {
        onEscape()
      }
    }

    window.addEventListener(KEY_DOWN, handleEscape)

    return () => window.removeEventListener(KEY_DOWN, handleEscape)
  }, [onEscape])
}

export const useOnline = onChange => {
  useEffect(() => {
    function handleOnlineStatusChange() {
      onChange({
        status: navigator.onLine ? 'online' : 'offline',
        isOnline: navigator.onLine
      })
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)
  }, [onChange])
}
