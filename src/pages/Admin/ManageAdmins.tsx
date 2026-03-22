import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { UserPlus, Mail, Lock, User, Trash2, Key } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageAdmins = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data } = await api.get('/admin/list');
      setAdmins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/add', formData);
      toast.success('New Admin Added Successfully');
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins(); // Refresh lists
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this administrator? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/${id}`);
        toast.success('Admin removed successfully');
        fetchAdmins();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to delete admin');
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left: Add Admin Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/60 relative overflow-hidden h-fit">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
              <UserPlus size={28} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 text-center mb-1 tracking-tight">Add Admin</h2>
            <p className="text-gray-400 text-center mb-6 font-bold uppercase tracking-widest text-xs">Grant Access</p>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-11 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-gray-400" 
                    placeholder="Admin Name" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-11 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-gray-400" 
                    placeholder="admin@example.com" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Assign Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    required 
                    minLength={6}
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-11 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-gray-400" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3.5 mt-4 bg-primary hover:bg-opacity-90 text-white rounded-xl font-bold tracking-wide shadow-md shadow-primary/10 transition-all disabled:opacity-50 hover:-translate-y-0.5"
              >
                {loading ? 'Creating...' : 'Add Admin'}
              </button>
            </form>
          </div>

          {/* Right: Existing Admins List */}
          <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/60 flex flex-col h-fit">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <User size={24} className="text-gray-400" /> Existing Administrators
            </h3>

            {fetching ? (
              <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : admins.length === 0 ? (
              <p className="text-gray-400 text-center py-10 font-medium">No other admins found</p>
            ) : (
              <div className="space-y-3">
                {admins.map((admin) => {
                  const isSuperAdmin = admin.email === 'amitchandure123s@gmail.com';
                  return (
                    <div key={admin._id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 ${isSuperAdmin ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'} rounded-xl flex items-center justify-center font-bold`}>
                          {isSuperAdmin ? <Key size={20} /> : <User size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                            {admin.name} 
                            {isSuperAdmin && <span className="text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Super</span>}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">{admin.email}</p>
                        </div>
                      </div>
                      
                      {!isSuperAdmin && (
                        <button 
                          onClick={() => handleDeleteAdmin(admin._id)}
                          className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Admin"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ManageAdmins;
