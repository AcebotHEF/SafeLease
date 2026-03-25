import { Link } from '@tanstack/react-router'
import { ShieldCheck, Star, Bed, Bath, Wifi } from 'lucide-react'

export function MobileListings() {
  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80",
      title: "The Ivy Residences",
      distance: "0.4 miles from University Center",
      rating: "4.9",
      price: "$1,250",
      specs: "2 BED • 1 BATH • WIFI INCLUDED"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
      title: "Oaks West Townhomes",
      distance: "1.2 miles from Campus West",
      rating: "4.7",
      price: "$980",
      specs: "4 BED • 2 BATH • PKG FREE"
    }
  ]

  return (
    <section className="md:hidden px-4 pb-24 w-full pt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">Available Now</p>
          <h2 className="text-2xl font-bold text-slate-900">Nearby Listings</h2>
        </div>
        <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {listings.map(l => (
          <div key={l.id} className="active:scale-[0.98] transition-transform">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-100">
              <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md text-slate-900 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={12} className="text-teal-600" />
                SafeLease Plus
              </div>
              <div className="absolute bottom-3 right-3 z-10 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                {l.price}/mo
              </div>
              <img 
                src={l.image} 
                alt={l.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="font-bold text-slate-900 text-base">{l.title}</h3>
                <div className="flex items-center gap-1 text-slate-700 text-xs font-bold">
                  <Star size={12} className="fill-slate-700" />
                  {l.rating}
                </div>
              </div>
              <p className="text-slate-500 text-xs mb-2">{l.distance}</p>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Bed size={12} /> {l.specs.split('•')[0]}</span>
                <span className="flex items-center gap-1.5"><Bath size={12} /> {l.specs.split('•')[1]}</span>
                <span className="flex items-center gap-1.5"><Wifi size={12} /> {l.specs.split('•')[2]}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile CTA Card */}
        <div className="mt-4 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-3">Ready to view your next home?</h3>
          <p className="text-sm text-slate-200 mb-6 leading-relaxed opacity-90">
            Join 10,000+ students who use SafeLease to secure property viewing fees and prevent rental scams.
          </p>
          <button className="w-full bg-white text-slate-800 font-bold py-3.5 rounded-xl text-sm uppercase tracking-wide hover:bg-slate-50 active:scale-[0.98] transition-all shadow-md">
            Secure a Viewing
          </button>
        </div>
      </div>
    </section>
  )
}
