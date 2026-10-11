import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Mail,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, register, login } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full legal name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setError('Please provide a valid contact phone number');
      return;
    }
    if (!password || password.length < 4) {
      setError('Please set a security password of at least 4 characters');
      return;
    }

    // Move to 2-step verification simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(async () => {
      setIsSubmitting(false);
      const fullPhone = `${countryCode} ${phone.trim()}`;
      await register(name, email, fullPhone, password);
    }, 600);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your registered email or phone');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(async () => {
      setIsSubmitting(false);
      await login(email, password);
    }, 500);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto advance
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden my-8"
        >
          {/* Header Bar with luxury sky blue gradient */}
          <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 px-6 pt-7 pb-6 text-white relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="p-2.5 bg-white/95 rounded-full shadow-lg ring-4 ring-white/20 mb-3">
                <BrandLogo variant="icon-only" iconSize={52} />
              </div>
              <h2 className="font-brand text-xl sm:text-2xl font-bold tracking-wider text-white">
                CITY OPTICAL AND TIMES
              </h2>
              <div className="mt-1 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#ffd57a] to-transparent" />
              <p className="mt-1.5 text-xs text-sky-100 font-medium tracking-wide">
                Luxury Horology &amp; Bespoke Optometry Atelier
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Mode Selector Tabs */}
            <div className="flex items-center p-1 bg-sky-50/80 rounded-xl mb-6 border border-sky-100">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setStep('details');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Member Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setStep('details');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === 'signin'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In to Atelier
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {error}
              </div>
            )}

            {mode === 'signup' && step === 'details' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <p className="text-xs text-slate-500 mb-2">
                  Please enter your details to unlock bespoke optical sizing, privileged member pricing, and saved orders.
                </p>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name <span className="text-sky-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shayma Sayed"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-sky-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. shayma1505sayed@gmail.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-sky-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+1">🇺🇸 +1 (US)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+971">🇦🇪 +971 (AE)</option>
                      <option value="+65">🇸🇬 +65 (SG)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98200 44521"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Password / Security Key */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password / Security PIN <span className="text-sky-600">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure passcode"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Trust and encryption marker */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>256-bit AES encryption · Your phone and email remain private.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Securing Membership...'
                  ) : (
                    <>
                      <span>Continue &amp; Verify Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {mode === 'signup' && step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">Quick Mobile Verification</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    We sent a 4-digit security code to <strong className="text-slate-800">{countryCode} {phone}</strong>
                  </p>
                  <p className="text-[11px] text-sky-600 mt-1">
                    (Simulation hint: enter any 4 digits, e.g. 1 2 3 4)
                  </p>
                </div>

                {/* 4 Digit OTP inputs */}
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold border-2 border-slate-200 focus:border-sky-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-slate-500 hover:underline"
                  >
                    Edit details
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtp(['1', '2', '3', '4'])}
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    Auto-fill demo OTP
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Verifying...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Access Boutique</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {mode === 'signin' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address or Phone Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. shayma1505sayed@gmail.com or 9820044521"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your security passcode"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Signing In...'
                  ) : (
                    <>
                      <span>Enter Patron Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Guest preview footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Just browsing the catalog?</span>
              <button
                type="button"
                onClick={closeAuthModal}
                className="text-sky-700 hover:text-sky-900 font-semibold hover:underline"
              >
                Continue as Guest &rarr;
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
