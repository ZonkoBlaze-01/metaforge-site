// src/pages/auth/login.jsx
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else {
        setMessage('Logged in! Redirecting...')
        // optional: redirect to dashboard after login
        setTimeout(()=>router.push('/dashboard'), 800)
      }
    } catch (err) {
      setMessage('Login error')
      console.error(err)
    } finally { setLoading(false) }
  }

  const handleMagicLink = async () => {
    if (!email) return setMessage('Enter your email for magic link')
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Magic link sent — check your inbox')
    setLoading(false)
  }

  const handleOAuth = async (provider) => {
    setLoading(true)
    setMessage('')
    // redirectTo optional: Supabase will redirect to your project's callback by default.
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin + '/auth/callback' : undefined }
    })
    if (error) {
      setMessage(error.message)
      setLoading(false)
    } else {
      // on success the provider will redirect the browser; message not needed
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-white">Login / Signup</h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-700"
            type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input
            className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-700"
            type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-3 py-2 rounded bg-cyan-400 text-black font-semibold">
              {loading ? 'Loading...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading}
              className="flex-1 px-3 py-2 rounded bg-orange-500 text-black font-semibold">
              Magic Link
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <hr className="border-neutral-700" />
          <span className="absolute left-1/2 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 transform -translate-x-1/2">or</span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth('google')}
            disabled={loading}
            className="w-full px-3 py-2 rounded bg-white text-black font-semibold">
            Continue with Google
          </button>

          <button
            onClick={() => handleOAuth('discord')}
            disabled={loading}
            className="w-full px-3 py-2 rounded bg-indigo-600 text-white font-semibold">
            Continue with Discord
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-center text-red-400">{message}</p>}
      </div>
    </div>
  )
}
