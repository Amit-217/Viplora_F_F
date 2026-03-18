import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data } = await api.get('/programs');
      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      if (editingProgram) {
        await api.put(`/programs/${editingProgram._id}`, data);
      } else {
        await api.post('/programs', data);
      }
      setIsModalOpen(false);
      reset();
      setEditingProgram(null);
      fetchPrograms();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (program: any) => {
    setEditingProgram(program);
    Object.keys(program).forEach((key) => {
      setValue(key as any, program[key]);
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await api.delete(`/programs/${id}`);
        fetchPrograms();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Programs</h1>
            <p className="text-gray-500">Create and monitor your impact campaigns.</p>
          </div>
          <button 
            onClick={() => { reset(); setEditingProgram(null); setIsModalOpen(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Create Program
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-8 py-6">Program</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6">Raised / Goal</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {programs.map((program: any) => (
                  <tr key={program._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={program.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <span className="font-bold text-gray-900">{program.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 capitalize font-medium text-gray-600">{program.category}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-primary">₹{program.raisedAmount.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 italic">Target: ₹{program.goalAmount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${program.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {program.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => handleEdit(program)} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(program._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-primary text-white">
                  <h2 className="text-2xl font-bold">{editingProgram ? 'Edit Program' : 'Create New Program'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Program Title</label>
                        <input {...register('title', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Clean Water Initiative" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                        <select {...register('category', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                          {['education', 'food', 'farmers', 'water', 'environment', 'health'].map(cat => (
                            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Goal Amount (₹)</label>
                          <input type="number" {...register('goalAmount', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Cover Image URL</label>
                          <input {...register('image', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://..." />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Short Description</label>
                        <textarea {...register('shortDescription', { required: true })} rows={2} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Full Description</label>
                        <textarea {...register('description', { required: true })} rows={6} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                    <button type="submit" disabled={formLoading} className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-opacity-90 transition-all">
                      {formLoading ? 'Saving...' : 'Save Program'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ManagePrograms;
