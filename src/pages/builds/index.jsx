import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Builds(){
  const [builds, setBuilds] = useState([])
  useEffect(()=>{
    const fetch = async ()=>{ const { data } = await supabase.from('builds').select('*').eq('visibility','public').order('updated_at',{ascending:false}); setBuilds(data || []) }
    fetch()
  },[])
  return (
    <div>
      <h1 className="text-2xl font-bold">Builds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {builds.map(b=> (<Link key={b.id} href={`/builds/${b.slug||b.id}`}><a className="block rounded p-4 bg-white/3"> <div className="font-semibold">{b.title}</div><div className="text-sm text-gray-400">{b.role} • {b.weapon}</div></a></Link>))}
      </div>
    </div>
  )
}
