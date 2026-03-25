import { Search, Calendar, Users, ShieldCheck, Lock } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-8 overflow-hidden flex flex-col items-center text-center">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05] md:opacity-10 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-[#f8fafc] md:bg-white/60 pointer-events-none backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center md:items-center items-start md:text-center text-left">
        {/* Mobile Header Badges */}
        <div className="hidden md:flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-teal-100 shadow-sm">
          <ShieldCheck size={14} />
          Verified & Secure Viewings
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4 md:mb-6">
          <span className="md:hidden">Book Verified<br/>Property Viewings.</span>
          <span className="hidden md:inline">Secure Your<br/>Property Viewing</span>
        </h1>

        <p className="text-slate-600 md:text-xl max-w-2xl mb-8 md:mb-10 text-base leading-relaxed">
          <span className="md:hidden">Stop rental scams. Secure your inspection with protected viewing fee escrow for total peace of mind.</span>
          <span className="hidden md:inline">Protect yourself from rental scams. We hold your viewing fees in a secure escrow until you've actually stepped inside the property.</span>
        </p>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center w-full max-w-2xl bg-white p-2 rounded-xl shadow-lg border border-slate-100 focus-within:ring-2 focus-within:ring-slate-300 transition-all">
          <Search className="text-slate-400 ml-3 shrink-0" size={20} />
          <input 
            type="text" 
            placeholder="Search by university, city, or property name..." 
            className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400"
          />
          <button className="bg-[#4b5563] hover:bg-[#374151] text-white px-6 py-3 rounded-lg font-semibold tracking-wide text-sm transition-colors uppercase">
            Search Properties
          </button>
        </div>

        {/* Search Block - Mobile */}
        <div className="md:hidden w-full bg-none">
          <div className="bg-slate-50/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3">
            <div className="flex items-center bg-white px-4 py-3 rounded-xl border border-slate-100 flex-1">
              <Search className="text-slate-400 mr-3" size={18} />
              <input 
                type="text" 
                placeholder="Search by University or City" 
                className="bg-transparent outline-none flex-1 text-sm font-medium placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-100 text-sm font-semibold text-slate-700">
                <Calendar size={16} className="text-slate-400" />
                FALL 2024
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-100 text-sm font-semibold text-slate-700">
                <Users size={16} className="text-slate-400" />
                2 BEDS
              </button>
            </div>
          </div>

          {/* Trust Badges - Mobile */}
          <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-1.5 shrink-0 bg-teal-100/50 text-teal-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-200/50">
              <ShieldCheck size={14} className="text-teal-600" />
              Landlord Verified
            </div>
            <div className="flex items-center gap-1.5 shrink-0 bg-blue-100/50 text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-blue-200/50">
              <Lock size={14} className="text-indigo-600" />
              Fee Escrow Protected
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
