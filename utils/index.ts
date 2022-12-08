export const isLocalStorageAvailable = () => (
  Boolean(
    window.localStorage &&
    typeof window.localStorage.getItem === 'function' &&
    typeof window.localStorage.setItem === 'function'
  )
);