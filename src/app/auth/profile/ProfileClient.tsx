'use client'

import { useState } from 'react'

export interface Order {
  id: string
  total: number
  createdAt: string
  updatedAt: string
  items: {
    product: {
      id: string
      name: string
      price: number
      image: string | null
    }
    quantity: number
  }[]
}

type User = {
  name: string
  email: string
  role: string
  gender?: string
  dob?: string
  createdAt?: string
}

type Props = {
  user: User
  orders: Order[]
}

export default function ProfileClient({ user, orders }: Props) {
  const [editMode, setEditMode] = useState(false)

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender || '',
    dob: user.dob || '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      alert('Passwords do not match ❌')
      return
    }

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Update failed')

      alert('Profile updated successfully ✅')
      setEditMode(false)
      setForm({ ...form, password: '', confirmPassword: '' })
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">My Profile</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        {editMode ? (
          <div className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Name"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="New Password (optional)"
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Confirm Password"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <div><strong>Gender:</strong> {user.gender || '—'}</div>
            <div>
              <strong>Date of Birth:</strong>{' '}
              {user.dob ? new Date(user.dob).toLocaleDateString() : '—'}
            </div>
            <div>
              <strong>Member Since:</strong>{' '}
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {user.role === 'customer' && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">My Orders</h2>

          <div className="space-y-4">
            {orders.length === 0 && <div className="text-gray-500">No orders yet.</div>}

            {orders.map((o) => (
              <div key={o.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <div>Order {o.id}</div>
                  <div>{new Date(o.createdAt).toLocaleString()}</div>
                </div>

                <ul className="mt-2">
                  {o.items.map((it, idx) => (
                    <li key={idx} className="text-sm">
                      {it.product.name} — {it.quantity} × ${(it.product.price / 100).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <div className="mt-2 font-semibold">
                  Total: ${(o.total / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
