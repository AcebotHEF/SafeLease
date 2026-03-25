import { Link } from '@tanstack/react-router'
import { Home, Shield, Search, User, LogOut, LayoutDashboard } from 'lucide-react'
import { authClient } from '../../lib/auth-client'
import { useState, useRef, useEffect } from 'react'

export function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
           window.location.href = '/'
        }
      }
    })
  }

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
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <User size={20} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 py-2 overflow-hidden flex flex-col z-50">
                  <a 
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                  >
                    <LayoutDashboard size={18} className="text-slate-400" />
                    Dashboard
                  </a>
                  <button 
                    type="button"
                    onClick={handleSignOut} 
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <LogOut size={18} className="text-red-400" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">Log in</Link>
              <Link to="/signup" className="text-sm font-bold bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors shadow-sm whitespace-nowrap">Sign up</Link>
            </>
          )}
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
