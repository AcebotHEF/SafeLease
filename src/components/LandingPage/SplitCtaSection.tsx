export function SplitCtaSection() {
  return (
    <section className="hidden md:block py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-slate-100/70 p-12 rounded-[2rem] border border-slate-200/50 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">For Students</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">View Your Next Home<br/>With Confidence.</h2>
          <p className="text-slate-600 mb-8 max-w-sm">Stop worrying about ghost listings and fake viewings. Only pay when you've seen the keys.</p>
          <button className="bg-[#4b5563] hover:bg-[#374151] text-white px-6 py-3.5 rounded-xl font-bold tracking-wide text-xs transition-colors uppercase shadow-sm">
            Find a Property
          </button>
        </div>

        <div className="bg-slate-200/50 p-12 rounded-[2rem] border border-slate-200 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">For Agents</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">Eliminate No-Shows<br/>and Build Trust.</h2>
          <p className="text-slate-600 mb-8 max-w-sm">Ensure serious leads by having viewing fees held in escrow. Professionalize your tenant interaction.</p>
          <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold tracking-wide text-xs transition-colors uppercase shadow-sm">
            Register as Agent
          </button>
        </div>
      </div>
    </section>
  )
}
