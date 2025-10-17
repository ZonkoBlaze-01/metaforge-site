import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Moderation(){
  const [pending, setPending] = useState([])
  useEffect(()=>{ const fetch = async ()=>{ const { data } = await supabase.from('builds').select('*').eq('visibility','pending').order('created_at',{ascending:false}); setPending(data || []) }; fetch() },[])
  const approve = async (id)=>{ await supabase.from('builds').update({ visibility: 'public', updated_at: new Date() }).eq('id', id); setPending(pending.filter(p=>p.id !== id)) }
  const reject = async (id)=>{ await supabase.from('builds').delete().eq('id', id); setPending(pending.filter(p=>p.id !== id)) }
  return (
    <div>
      <h1 className="text-2xl font-bold">Moderation</h1>
      <div className="mt-4 space-y-3">
        {pending.map(p=> (<div key={p.id} className="p-3 rounded bg-white/3"><div className="flex justify-between"><div><div className="font-semibold">{p.title}</div><div className="text-sm text-gray-400">{p.owner}</div></div><div className="flex gap-2"><button className="px-2 py-1 bg-green-400 text-black rounded" onClick={()=>approve(p.id)}>Approve</button><button className="px-2 py-1 bg-red-400 text-black rounded" onClick={()=>reject(p.id)}>Reject</button></div></div></div>))}
      </div>
    </div>
  )
}
