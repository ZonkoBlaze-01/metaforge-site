import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark')
  useEffect(()=>{ const saved = localStorage.getItem('metaforge_theme'); if (saved) setTheme(saved)},[])
  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('metaforge_theme', theme)},[theme])
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
