const configuredBase =
  import.meta.env.VITE_ADMIN_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://api.medorax.in'

const normalizedBase = configuredBase.replace(/\/+$/, '')

const API_BASE_URL = normalizedBase.endsWith('/api')
  ? normalizedBase
  : `${normalizedBase}/api`

export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type') || ''

  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '')

  if (!response.ok) {
    const detail =
      data &&
      typeof data === 'object' &&
      (data.detail || data.message)

    const message =
      detail ||
      (typeof data === 'string' && data) ||
      `API request failed with status ${response.status}`

    if (response.status === 401) {
      window.dispatchEvent(new Event('medorax:session-expired'))
    }

    throw new Error(String(message))
  }

  return data
}
