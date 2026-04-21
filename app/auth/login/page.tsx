'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        className="border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  )
}
