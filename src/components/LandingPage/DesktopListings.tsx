import { Link } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'

export function DesktopListings() {
  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80",
      title: "The Beacon Lofts",
      distance: "0.2 miles from University Center",
      price: "$1,250"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80",
      title: "Azure Heights",
      distance: "Downtown Academic District",
      price: "$1,800"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
      title: "North Park Residences",
      distance: "Pet-friendly • Near Transit",
      price: "$950"
    }
  ]

  return (
    <section className="hidden md:block py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Verified Listings</h2>
          <p className="text-slate-500">Hand-picked properties with guaranteed viewing fee protection.</p>
        </div>
        <Link to="/" className="text-sm font-bold text-slate-600 hover:text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-1">
          View All Properties
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {listings.map(l => (
          <div key={l.id} className="group cursor-pointer">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
              <div className="absolute top-3 left-3 z-10 bg-teal-700/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={12} />
                Escrow Active
              </div>
              <img 
                src={l.image} 
                alt={l.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{l.title}</h3>
                <p className="text-slate-500 text-sm mt-0.5">{l.distance}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-lg">{l.price}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Per Month</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
