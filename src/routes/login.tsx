import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setErrors({})

    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      }
      setErrors(fieldErrors)
      setLoading(false)
      return
    }
    
    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/',
      })
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-8 h-8 text-slate-700" />
            <span className="text-2xl font-bold text-slate-800">SafeLease</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-center mb-8">
              Enter your credentials to access your escrow dashboard.
            </p>

            <form onSubmit={handleSignIn} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-slate-50 border ${errors.email ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                    placeholder="name@university.edu"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    PASSWORD
                  </label>
                  <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-slate-50 border ${errors.password ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#535c75] hover:bg-[#434b5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In to Secure Portal'}
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-center text-sm text-slate-600">
                New to SafeLease? <Link to="/signup" className="font-semibold text-slate-900 hover:underline">Create an Account</Link>
              </p>
              
              <div className="mt-6 flex justify-center gap-4 opacity-50">
                <ShieldCheckIcon className="w-6 h-6 text-slate-400" />
                <LockShieldIcon className="w-6 h-6 text-slate-400" />
                <BadgeCheckIcon className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 SAFELEASE ESCROW SYSTEMS INC. • SECURED BY 256-BIT ENCRYPTION</p>
        </div>
      </div>
    </div>
  )
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LockShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <rect width="8" height="5" x="8" y="10" rx="1" />
    </svg>
  )
}

function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
