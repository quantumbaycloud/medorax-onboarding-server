import { useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../../services/api'

const OPTION_TYPES = [
  ['supplier_category', 'Supplier Categories'],
  ['medicine_category', 'Medicine Categories'],
  ['payment_term', 'Payment Terms'],
  ['customer_type', 'Customer Types'],
  ['dosage_form', 'Dosage Forms'],
  ['unit', 'Units'],
]

export default function ERPConfiguration() {
  const [pharmacies, setPharmacies] = useState([])
  const [pharmacyId, setPharmacyId] = useState('')
  const [optionType, setOptionType] = useState('supplier_category')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    code: '',
    name: '',
    sort_order: 0,
  })

  const optionLabel = useMemo(
    () =>
      OPTION_TYPES.find(([value]) => value === optionType)?.[1] ||
      optionType,
    [optionType]
  )

  async function loadPharmacies() {
    const data = await apiRequest('/admin/erp-configuration/pharmacies')
    setPharmacies(data || [])

    if (!pharmacyId && data?.length) {
      setPharmacyId(data[0].id)
    }
  }

  async function loadOptions() {
    if (!pharmacyId) return

    setLoading(true)
    setError('')

    try {
      const data = await apiRequest(
        `/admin/erp-configuration/options?pharmacy_id=${encodeURIComponent(
          pharmacyId
        )}&option_type=${encodeURIComponent(optionType)}`
      )

      setOptions(data || [])
    } catch (err) {
      setError(err.message || 'Unable to load configuration')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPharmacies().catch((err) =>
      setError(err.message || 'Unable to load pharmacies')
    )
  }, [])

  useEffect(() => {
    loadOptions()
  }, [pharmacyId, optionType])

  async function createOption(e) {
    e.preventDefault()

    if (!pharmacyId || !form.code.trim() || !form.name.trim()) {
      setError('Pharmacy, code and name are required')
      return
    }

    setSaving(true)
    setError('')

    try {
      await apiRequest(
        `/admin/erp-configuration/options?pharmacy_id=${encodeURIComponent(
          pharmacyId
        )}`,
        {
          method: 'POST',
          body: JSON.stringify({
            option_type: optionType,
            code: form.code.trim(),
            name: form.name.trim(),
            is_active: true,
            sort_order: Number(form.sort_order) || 0,
          }),
        }
      )

      setForm({
        code: '',
        name: '',
        sort_order: 0,
      })

      await loadOptions()
    } catch (err) {
      setError(err.message || 'Unable to create option')
    } finally {
      setSaving(false)
    }
  }

  async function toggleOption(row) {
    setError('')

    try {
      await apiRequest(
        `/admin/erp-configuration/options/${row.id}?pharmacy_id=${encodeURIComponent(
          pharmacyId
        )}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            is_active: !row.isActive,
          }),
        }
      )

      await loadOptions()
    } catch (err) {
      setError(err.message || 'Unable to update option')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">ERP Configuration</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage pharmacy-specific master data synchronized with Medorax ERP.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border bg-white p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Pharmacy
          </label>

          <select
            className="w-full rounded-lg border px-3 py-2"
            value={pharmacyId}
            onChange={(e) => setPharmacyId(e.target.value)}
          >
            <option value="">Select pharmacy</option>
            {pharmacies.map((pharmacy) => (
              <option key={pharmacy.id} value={pharmacy.id}>
                {pharmacy.name}
                {pharmacy.gstNumber ? ` — ${pharmacy.gstNumber}` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Master Data
          </label>

          <select
            className="w-full rounded-lg border px-3 py-2"
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
          >
            {OPTION_TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {pharmacyId && (
        <form
          onSubmit={createOption}
          className="rounded-xl border bg-white p-5"
        >
          <h2 className="font-semibold mb-4">
            Add {optionLabel}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="rounded-lg border px-3 py-2"
              placeholder="Code"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value })
              }
            />

            <input
              className="rounded-lg border px-3 py-2 md:col-span-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="rounded-lg border px-3 py-2"
              type="number"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(e) =>
                setForm({
                  ...form,
                  sort_order: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-lg px-4 py-2 bg-black text-white disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Add Option'}
          </button>
        </form>
      )}

      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{optionLabel}</h2>
            <p className="text-sm text-gray-500">
              {options.length} option{options.length === 1 ? '' : 's'}
            </p>
          </div>

          <button
            type="button"
            onClick={loadOptions}
            disabled={loading}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <div className="divide-y">
          {options.length === 0 && !loading && (
            <div className="px-5 py-8 text-center text-sm text-gray-500">
              No options configured for this pharmacy.
            </div>
          )}

          {options.map((row) => (
            <div
              key={row.id}
              className="px-5 py-4 flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-medium">{row.name}</div>
                <div className="text-xs text-gray-500">
                  {row.code}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleOption(row)}
                className="rounded-lg border px-3 py-1.5 text-sm"
              >
                {row.isActive ? 'Disable' : 'Enable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
