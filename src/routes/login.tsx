import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { z } from 'zod'
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react'

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
            for (const err of validation.error.issues) {
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
        <div className="min-h-screen bg-[#f1f9f8] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl">
                <div className="flex justify-center items-center gap-2 mb-8">
                    <Shield className="w-8 h-8 text-slate-700 fill-slate-700/10" />
                    <span className="text-xl font-bold text-slate-800">SafeLease</span>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500">Enter your credentials to access your escrow dashboard.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12 mb-10">
                    <form onSubmit={handleSignIn} className="space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                EMAIL ADDRESS
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full pl-12 pr-4 py-4 bg-white border ${errors.email ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                    placeholder="name@university.edu"
                                />
                            </div>
                            {errors.email &&
                                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label
                                    className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    PASSWORD
                                </label>
                                <a href="#"
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full pl-12 pr-4 py-4 bg-white border ${errors.password ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password &&
                                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-5 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-[#535c75] hover:bg-[#434b5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </form>
                </div>

                <div className="text-center mb-16">
                    <p className="text-sm text-slate-500">
                        New to SafeLease? <Link to="/signup"
                            className="font-bold text-slate-800 hover:underline">Create
                            an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
