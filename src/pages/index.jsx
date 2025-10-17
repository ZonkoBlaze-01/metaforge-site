import Link from 'next/link'
export default function Home(){
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Featured Builds</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl p-4 bg-white/3 min-h-[160px]"><div className="h-28 rounded-md bg-gradient-to-br from-[#111827] to-[#0b1220] flex items-end p-3"><div className="text-white font-semibold">Sample Build</div></div></div>
          <div className="rounded-xl p-4 bg-white/3 min-h-[160px]"><div className="h-28 rounded-md bg-gradient-to-br from-[#111827] to-[#0b1220] flex items-end p-3"><div className="text-white font-semibold">Sample Build</div></div></div>
          <div className="rounded-xl p-4 bg-white/3 min-h-[160px]"><div className="h-28 rounded-md bg-gradient-to-br from-[#111827] to-[#0b1220] flex items-end p-3"><div className="text-white font-semibold">Sample Build</div></div></div>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-3">Latest Patch Notes</h2>
        <div className="rounded-lg p-4 bg-white/3">No patch notes yet.</div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-lg p-4 bg-white/3">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-2 text-sm space-y-1"><li><Link href="/builds"><a>All Builds</a></Link></li><li><Link href="/calculator"><a>Calculator</a></Link></li></ul>
        </div>

        <div className="rounded-lg p-4 bg-white/3">
          <h3 className="font-semibold">Community</h3>
          <p className="text-sm mt-2">Join the Discord to collaborate on builds and data.</p>
          <button className="mt-3 px-3 py-1 rounded bg-[#FF7849] text-black">Join Discord</button>
        </div>
      </aside>
    </div>
  )
}
