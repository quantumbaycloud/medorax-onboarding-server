import React, { useState } from 'react'
import { ChevronDown, LogOut, UserCircle } from 'lucide-react'
import { apiRequest } from '../../services/api'

const NavbarProfile = () => {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const admin = (() => {
    try {
      return JSON.parse(
        sessionStorage.getItem('medorax-admin') || 'null',
      )
    } catch {
      return null
    }
  })()

  async function logout() {
    if (busy) return

    setBusy(true)

    try {
      await apiRequest('/admin/auth/logout', {
        method: 'POST',
      })
    } catch {
      // Session may already be expired.
    } finally {
      sessionStorage.removeItem('medorax-admin')
      window.dispatchEvent(new Event('medorax:logout'))
      setBusy(false)
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e3efff] text-[#235eac]">
          <UserCircle size={22} />
        </span>

        <span className="hidden text-left sm:block">
          <span className="block max-w-32 truncate text-xs font-bold text-slate-800">
            {admin?.fullName || 'Admin'}
          </span>

          <span className="block text-[11px] text-slate-500">
            {admin?.role || 'Control'}
          </span>
        </span>

        <ChevronDown size={15} className="text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="px-3 py-2 text-xs text-slate-500">
            Signed in as
          </div>

          <div className="break-all px-3 pb-3 text-sm font-semibold">
            {admin?.email || 'Admin account'}
          </div>

          <button
            type="button"
            onClick={logout}
            disabled={busy}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <LogOut size={16} />

            {busy ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  )
}

export default NavbarProfile
