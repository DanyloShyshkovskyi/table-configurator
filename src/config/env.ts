const getEnvVar = (key: string) => {
  const value = import.meta.env[key]
  if (!value) {
    return null
  }
  return value
}

export const API_URL = getEnvVar('VITE_API_URL')
