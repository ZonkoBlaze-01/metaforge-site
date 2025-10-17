import { useState } from 'react'
export default function MiniCalculator({ prefill }){
  const [atk, setAtk] = useState(prefill?.atk||400)
  const [critRate, setCritRate] = useState(prefill?.critRate||35)
  const [critDamage, setCritDamage] = useState(prefill?.critDamage||200)
  const [skill, setSkill] = useState(prefill?.skill||1.2)
  const [enemyDef, setEnemyDef] = useState(0.15)
  const [result, setResult] = useState(null)
  const calc = ()=>{ const crit = Math.min(Math.max(critRate/100,0),1); const cd = critDamage/100; const dmg = Math.round(atk * skill * (1 + crit*cd) * (1 - enemyDef)); setResult(dmg) }
  return (
    <div>
      <label className="block text-sm">ATK</label>
      <input type="number" value={atk} onChange={e=>setAtk(Number(e.target.value))} className="w-full rounded px-2 py-1 bg-black/10 mt-1" />
      <label className="block text-sm mt-2">Crit Rate %</label>
      <input type="number" value={critRate} onChange={e=>setCritRate(Number(e.target.value))} className="w-full rounded px-2 py-1 bg-black/10 mt-1" />
      <label className="block text-sm mt-2">Crit Damage %</label>
      <input type="number" value={critDamage} onChange={e=>setCritDamage(Number(e.target.value))} className="w-full rounded px-2 py-1 bg-black/10 mt-1" />
      <label className="block text-sm mt-2">Skill Multiplier</label>
      <input type="number" value={skill} step="0.01" onChange={e=>setSkill(Number(e.target.value))} className="w-full rounded px-2 py-1 bg-black/10 mt-1" />
      <button onClick={calc} className="mt-3 w-full rounded py-2 bg-[#3AE7F9] text-black font-semibold">Calculate</button>
      {result!==null && <div className="mt-3 p-3 rounded bg-black/10">Estimated Damage: <strong>{result}</strong></div>}
    </div>
  )
}
