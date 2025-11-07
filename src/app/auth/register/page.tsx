'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('male')
  const [role, setRole] = useState('customer')
  const [dob, setDob] = useState('')

  const onSubmit = async (e: any) => {
    e.preventDefault()

    // simple validation
    if (!username || !email || !password || !confirmPassword || !dob) {
      alert('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username,
        email,
        password,
        gender,
        role,
        dob,
      }),
    })

    const data = await res.json()
    if (data.ok) window.location.href = '/login'
    else alert(data.error || 'Registration failed')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
        />
        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-600 text-white"
        >
          Register
        </button>
      </form>
    </div>
  )
}
