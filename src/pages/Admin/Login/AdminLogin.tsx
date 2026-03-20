import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/admin/login', formData);
      login(response.data.token, response.data.user);
      toast.success('Admin authentication successful');
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Access Denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-background-dark flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

        <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldCheck size={36} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-2 tracking-tight">Admin Portal</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-10 font-bold uppercase tracking-widest text-xs">Secure System Access</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                placeholder="admin@example.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div className="flex justify-end -mt-2">
            <Link to="/auth/forgot-password" className="text-sm font-bold text-primary hover:text-secondary hover:underline transition-all">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 mt-6 bg-primary hover:bg-opacity-90 text-white rounded-2xl font-black text-lg tracking-wide shadow-lg shadow-primary/20 transition-all disabled:opacity-50 hover:-translate-y-1"
          >
            {loading ? 'Verifying...' : 'Log In to Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
