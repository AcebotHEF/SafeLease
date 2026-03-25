import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">SafeLease</h1>
      <div className="flex gap-4">
        <Link to="/login" className="px-4 py-2 bg-slate-800 text-white rounded-lg">Login</Link>
        <Link to="/signup" className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg border border-slate-200">Sign Up</Link>
      </div>
    </main>
  )
}
