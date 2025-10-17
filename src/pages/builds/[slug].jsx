import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import MiniCalculator from '../../components/MiniCalculator'

export default function BuildDetail(){
  const router = useRouter()
  const { slug } = router.query
  const [build, setBuild] = useState(null)
  useEffect(()=>{ if (!slug) return; const fetch = async ()=>{ const { data, error } = await supabase.from('builds').select('*').or(`slug.eq.${slug}, id.eq.${slug}`).eq('visibility','public').maybeSingle(); if (error) console.error(error); else setBuild(data) }; fetch() },[slug])
  if (!build) return <div>Loading or not found</div>
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 p-4 rounded bg-white/3">
        <h1 className="text-2xl font-bold">{build.title}</h1>
        <div className="text-sm text-gray-400">{build.role} • {build.weapon}</div>
        <div className="mt-4">{build.description}</div>
      </section>
      <aside className="p-4 rounded bg-white/3">
        <h3 className="font-semibold mb-2">Mini Calculator</h3>
        <MiniCalculator prefill={build.stats} />
        <div className="mt-4"><button className="w-full px-3 py-2 rounded bg-[#FF7849] text-black">Copy Share Link</button></div>
      </aside>
    </div>
  )
}
