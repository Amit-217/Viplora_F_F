import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageAdmins = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/add', formData);
      toast.success('New Admin Added Successfully');
      setFormData({ name: '', email: '', password: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <UserPlus size={36} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 text-center mb-2 tracking-tight">Add New Admin</h2>
          <p className="text-gray-500 text-center mb-10 font-bold uppercase tracking-widest text-xs">Grant Portal Access</p>

          <form onSubmit={handleAddAdmin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400" 
                  placeholder="Admin Name" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400" 
                  placeholder="admin@example.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Assign Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  required 
                  minLength={6}
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 mt-6 bg-primary hover:bg-opacity-90 text-white rounded-2xl font-black text-lg tracking-wide shadow-lg shadow-primary/20 transition-all disabled:opacity-50 hover:-translate-y-1"
            >
              {loading ? 'Creating Admin...' : 'Add New Admin'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ManageAdmins;
