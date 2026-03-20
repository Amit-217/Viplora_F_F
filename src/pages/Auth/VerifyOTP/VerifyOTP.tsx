import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const email = localStorage.getItem('tempEmail');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      navigate('/auth/register');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      const { token, user } = response.data;
      login(token, user);
      localStorage.removeItem('tempEmail');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/resend-otp', { email });
      toast.success(response.data.message || 'OTP resent successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center"
      >
        <div className="w-20 h-20 bg-orange-100 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={40} />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h2>
        <p className="text-gray-600 mb-8">
          We've sent a 6-digit code to <span className="font-bold text-gray-900">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 justify-center">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-4xl tracking-[1rem] font-bold py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition-all"
            placeholder="000000"
            required
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading || otp.length !== 6 ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'}`}
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <p className="mt-8 text-gray-500 text-sm">
          Didn't receive code? 
          <button 
            type="button" 
            onClick={handleResend}
            disabled={loading}
            className="text-primary font-bold hover:underline ml-1 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Resend Code'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
