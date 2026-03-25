import { Link } from '@tanstack/react-router'
import { Home, Shield, Search, User } from 'lucide-react'

export function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-xl font-black tracking-tight text-slate-900 uppercase z-10">
          SafeLease
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-slate-900 border-b-2 border-slate-900 pb-1">Home</Link>
          <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors pb-1 border-b-2 border-transparent">Listings</Link>
        </div>
        <div className="flex items-center gap-4 z-10">
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            <User size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 z-50 flex items-center justify-around px-2 pb-safe">
        <Link to="/" className="flex flex-col items-center gap-1 text-teal-500">
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Shield size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Escrow</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Search size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Listings</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <User size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </Link>
      </nav>
    </>
  )
}
