import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function NewBuild(){
  const [title, setTitle] = useState('')
  const [role, setRole] = useState('DPS')
  const [weapon, setWeapon] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const handleSave = async ()=>{ const user = (await supabase.auth.getUser()).data.user; if (!user) return alert('Please login'); const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,60) + '-' + Math.random().toString(36).slice(2,6); const payload = { owner: user.id, title, role, weapon, description, slug, visibility: 'pending' }; const { data, error } = await supabase.from('builds').insert([payload]).select(); if (error) alert(error.message); else router.push('/dashboard') }
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Create New Build</h1>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 mb-2 rounded" />
      <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 mb-2 rounded"><option>DPS</option><option>Support</option><option>Tank</option></select>
      <input placeholder="Weapon" value={weapon} onChange={e=>setWeapon(e.target.value)} className="w-full p-2 mb-2 rounded" />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 mb-2 rounded h-32" />
      <div className="flex gap-2"><button onClick={handleSave} className="px-4 py-2 bg-[#3AE7F9] rounded">Save (Pending)</button></div>
    </div>
  )
}
