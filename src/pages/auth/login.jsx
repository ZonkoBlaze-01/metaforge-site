import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleLogin = async ()=>{ const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) alert(error.message); else router.push('/dashboard') }
  const handleMagic = async ()=>{ const { data, error } = await supabase.auth.signInWithOtp({ email }); if (error) alert(error.message); else alert('Magic link sent — check your email') }
  return (
    <div className="max-w-md mx-auto p-8 rounded bg-white/5">
      <h1 className="text-2xl mb-4">Login / Signup</h1>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
      <div className="flex gap-2">
        <button onClick={handleLogin} className="px-4 py-2 bg-[#3AE7F9] rounded">Login</button>
        <button onClick={handleMagic} className="px-4 py-2 bg-[#FF7849] rounded">Send Magic Link</button>
      </div>
    </div>
  )
}
