import Link from 'next/link'
import Logo from './Logo'
export default function Header({ theme, setTheme }){
  return (
    <header className="sticky top-0 bg-white/5 dark:bg-black/20 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/"><a className="flex items-center gap-3"><Logo/></a></Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/">Home</Link>
            <Link href="/builds">Builds</Link>
            <Link href="/calculator">Calculator</Link>
            <Link href="/moderation">Moderation</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <input className="px-3 py-2 rounded-md bg-white/5 placeholder-gray-400 text-sm" placeholder="Search builds, items..." />
          <button onClick={()=>setTheme(theme==='dark'? 'light':'dark')} className="p-2 rounded-md">{theme==='dark'?'🌚':'🌞'}</button>
          <Link href="/auth/login"><a className="px-3 py-1 rounded bg-[#FF7849] text-black text-sm">Login</a></Link>
        </div>
      </div>
    </header>
  )
}
