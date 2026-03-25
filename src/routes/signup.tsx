import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { z } from 'zod'
import { User, Home, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'

const signupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const Route = createFileRoute('/signup')({
    component: SignupPage,
})

type Role = 'student' | 'agent'

function SignupPage() {
    const [role, setRole] = useState<Role>('student')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setErrors({})

        const validation = signupSchema.safeParse({
            firstName,
            lastName,
            email,
            password,
        })

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
            await authClient.signUp.email({
                email,
                password,
                name: `${firstName} ${lastName}`,
                role,
                callbackURL: '/',
            });
        } catch (err: any) {
            setError(err.message || 'Failed to create account')
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
                    <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Secure your transition.</h1>
                    <p className="text-slate-500">Choose your journey and start your verified escrow agreement.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12 mb-10">
                    <form onSubmit={handleSignUp} className="space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                                SELECT ROLE
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${role === 'student'
                                            ? 'border-slate-800 bg-white'
                                            : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                                        }`}
                                >
                                    <User
                                        className={`w-8 h-8 mb-3 ${role === 'student' ? 'text-slate-800' : 'text-slate-400'}`} />
                                    <span
                                        className={`font-bold ${role === 'student' ? 'text-slate-800' : 'text-slate-600'}`}>Student</span>
                                    <span className="text-xs text-slate-400 mt-1">Looking for safe housing</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('agent')}
                                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${role === 'agent'
                                            ? 'border-slate-800 bg-white'
                                            : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                                        }`}
                                >
                                    <Home
                                        className={`w-8 h-8 mb-3 ${role === 'agent' ? 'text-slate-800' : 'text-slate-400'}`} />
                                    <span
                                        className={`font-bold ${role === 'agent' ? 'text-slate-800' : 'text-slate-600'}`}>Agent</span>
                                    <span className="text-xs text-slate-400 mt-1">Managing secure listings</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    FIRST NAME
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={`block w-full px-4 py-4 bg-white border ${errors.firstName ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                    placeholder="First name"
                                />
                                {errors.firstName &&
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label
                                    className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    LAST NAME
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={`block w-full px-4 py-4 bg-white border ${errors.lastName ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                    placeholder="Last name"
                                />
                                {errors.lastName &&
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-full px-4 py-4 bg-white border ${errors.email ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                placeholder="name@university.edu"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                CREATE PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full px-4 py-4 bg-white border ${errors.password ? 'border-red-300 ring-red-100 ring-2' : 'border-slate-200'} rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                                    placeholder="Min. 8 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-slate-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-slate-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password &&
                                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-5 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-[#535c75] hover:bg-[#434b5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Get Started'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </form>
                </div>

                <div className="text-center mb-16">
                    <p className="text-sm text-slate-500">
                        Already have an account? <Link to="/login" className="font-bold text-slate-800 hover:underline">Log
                            in here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

