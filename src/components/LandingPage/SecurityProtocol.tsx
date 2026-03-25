export function SecurityProtocol() {
  const steps = [
    {
      num: "1",
      title: "Pay Viewing Fee",
      desc: "Submit the property viewing fee into our secure escrow vault before meeting anyone."
    },
    {
      num: "2",
      title: "Identity Verification",
      desc: "SafeLease verifies the identity of both the tenant and the agent/landlord for safety."
    },
    {
      num: "3",
      title: "Inspect Property",
      desc: "Meet the agent and physically tour the unit. Confirm the property matches the listing."
    },
    {
      num: "4",
      title: "Release or Dispute",
      desc: "Upon successful viewing, release the fee to the agent, or file a dispute if it was a scam."
    }
  ]

  return (
    <section className="hidden md:block py-24 px-4 md:px-8 bg-slate-50/50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Security Protocol</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">Our four-step escrow process ensures you never lose a viewing fee to a scam again.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 bg-teal-700 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                {step.num}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
