import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../../../types';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserCheck, AlertCircle } from 'lucide-react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('tempEmail', data.email);
      navigate('/auth/verify-otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-primary p-8 text-white text-center">
          <h2 className="text-3xl font-bold">Join VIPLORA</h2>
          <p className="opacity-80 mt-2">Create your Donor / Regular User Account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{(errors.name as any).message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{(errors.email as any).message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: 6 })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>}
          </div>

          <input type="hidden" value="user" {...register('role')} />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'}`}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account? <Link to="/auth/login" className="text-primary font-bold">Login here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
