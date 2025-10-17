// src/pages/auth/callback.jsx
import { useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AuthCallback(){
  const router = useRouter()
  useEffect(()=>{
    // Let supabase process the OAuth redirect. Then go to dashboard
    (async ()=>{
      await supabase.auth.getSession() // ensures session is loaded client-side
      router.replace('/dashboard')
    })()
  },[])
  return <div className="min-h-[60vh] flex items-center justify-center">Processing login…</div>
}
