import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'https://api.medorax.in'
).replace(/\/+$/, '')

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new Event('medorax:session-expired'))
    }

    throw new Error(
      data?.detail ||
        data?.message ||
        `Request failed with status ${response.status}`,
    )
  }

  return data
}

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 13px',
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  marginTop: 7,
  fontSize: 15,
  outline: 'none',
}

const buttonStyle = {
  border: 0,
  borderRadius: 10,
  padding: '12px 16px',
  cursor: 'pointer',
  background: '#004287',
  color: 'white',
  fontWeight: 700,
  width: '100%',
}

function Login({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()

    setBusy(true)
    setError('')

    try {
      const data = await api('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const admin = data?.admin || data

      if (!admin) {
        throw new Error('Login succeeded but administrator data was not returned')
      }

      sessionStorage.setItem(
        'medorax-admin',
        JSON.stringify(admin),
      )

      onLoggedIn(admin)
    } catch (err) {
      setError(err?.message || 'Unable to sign in')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f5f7fb',
        padding: 20,
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          padding: 32,
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 50px rgba(15,23,42,.08)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontWeight: 800,
            color: '#235eac',
          }}
        >
          Medorax
        </div>

        <div
          style={{
            marginTop: 4,
            color: '#64748b',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}
        >
          Enterprise Admin
        </div>

        <h1
          style={{
            margin: '28px 0 6px',
            fontSize: 25,
            color: '#0f172a',
          }}
        >
          Admin sign in
        </h1>

        <p
          style={{
            margin: '0 0 24px',
            color: '#64748b',
            fontSize: 14,
          }}
        >
          Sign in with your existing Medorax administrator credentials.
        </p>

        <label
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 650,
            color: '#334155',
            marginBottom: 18,
          }}
        >
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="username"
            required
            style={inputStyle}
          />
        </label>

        <label
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 650,
            color: '#334155',
            marginBottom: 18,
          }}
        >
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
            style={inputStyle}
          />
        </label>

        {error && (
          <div
            style={{
              background: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              padding: 11,
              borderRadius: 10,
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            ...buttonStyle,
            opacity: busy ? 0.65 : 1,
            cursor: busy ? 'not-allowed' : 'pointer',
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function App() {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let active = true

    api('/api/admin/auth/me')
      .then((data) => {
        if (!active) return

        const currentAdmin = data?.admin || data

        if (currentAdmin) {
          sessionStorage.setItem(
            'medorax-admin',
            JSON.stringify(currentAdmin),
          )
          setAdmin(currentAdmin)
        }
      })
      .catch(() => {
        if (!active) return

        sessionStorage.removeItem('medorax-admin')
        setAdmin(null)
      })
      .finally(() => {
        if (active) {
          setChecking(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const expire = () => {
      sessionStorage.removeItem('medorax-admin')
      setAdmin(null)
    }

    window.addEventListener(
      'medorax:session-expired',
      expire,
    )

    window.addEventListener(
      'medorax:logout',
      expire,
    )

    return () => {
      window.removeEventListener(
        'medorax:session-expired',
        expire,
      )

      window.removeEventListener(
        'medorax:logout',
        expire,
      )
    }
  }, [])

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#f5f7fb',
          color: '#64748b',
          fontSize: 14,
        }}
      >
        Checking admin session…
      </div>
    )
  }

  if (!admin) {
    return <Login onLoggedIn={setAdmin} />
  }

  return <RouterProvider router={router} />
}

export default App
