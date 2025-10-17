import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard(){
  const [builds, setBuilds] = useState([])
  useEffect(()=>{
    const fetch = async ()=>{
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      const { data } = await supabase.from('builds').select('*').eq('owner', user.id).order('updated_at', {ascending:false})
      setBuilds(data || [])
    }
    fetch()
  },[])
  return (
    <div>
      <h1 className="text-2xl font-bold">Your Builds</h1>
      <Link href="/builds/new"><a className="px-3 py-1 bg-[#FF7849] rounded inline-block mt-3 text-black">Create New Build</a></Link>
      <ul className="mt-4 space-y-2">
        {builds.map(b=> (<li key={b.id}><Link href={`/builds/${b.slug||b.id}`}><a className="text-lg">{b.title} — {b.visibility}</a></Link></li>))}
      </ul>
    </div>
  )
}
