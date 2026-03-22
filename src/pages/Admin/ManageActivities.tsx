import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Calendar, Plus, X, Loader2, Trash2, Edit, Check } from 'lucide-react';
import api from '../../services/api';

const ManageActivities = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const [form, setForm] = useState({
    title: '',
    type: 'assignment',
    date: '',
    location: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/activities');
      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingActivity) {
        await api.put(`/activities/${editingActivity._id}`, form);
        alert('Activity updated!');
      } else {
        await api.post('/activities', form);
        alert('Activity created!');
      }
      setIsModalOpen(false);
      setEditingActivity(null);
      setForm({ title: '', type: 'assignment', date: '', location: '', description: '', status: 'pending' });
      fetchActivities();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await api.delete(`/activities/${id}`);
        setActivities(activities.filter(a => a._id !== id));
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const handleToggleStatus = async (act: any) => {
    try {
      const newStatus = act.status === 'completed' ? 'pending' : 'completed';
      await api.put(`/activities/${act._id}`, { status: newStatus });
      fetchActivities();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const openEditModal = (act: any) => {
    setEditingActivity(act);
    setForm({
      title: act.title,
      type: act.type,
      date: act.date ? new Date(act.date).toISOString().split('T')[0] : '',
      location: act.location || '',
      description: act.description || '',
      status: act.status || 'pending'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Activities</h1>
            <p className="text-gray-500 text-sm">Create and organize volunteer assignments & internal events.</p>
          </div>
          <button onClick={() => { setEditingActivity(null); setForm({ title: '', type: 'assignment', date: '', location: '', description: '', status: 'pending' }); setIsModalOpen(true); }} className="bg-primary hover:bg-opacity-90 text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-primary/20 transition-all">
            <Plus size={18} /> New Activity
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 font-bold text-xs uppercase text-gray-400 tracking-wider">Type</th>
                    <th className="pb-4 font-bold text-xs uppercase text-gray-400 tracking-wider">Title</th>
                    <th className="pb-4 font-bold text-xs uppercase text-gray-400 tracking-wider">Date</th>
                    <th className="pb-4 font-bold text-xs uppercase text-gray-400 tracking-wider">Status/Loc</th>
                    <th className="pb-4 font-bold text-xs uppercase text-gray-400 tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activities.map((act) => (
                    <tr key={act._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${act.type === 'event' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                          {act.type}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-gray-900 text-sm">{act.title}</td>
                      <td className="py-4 text-xs text-gray-500">{new Date(act.date).toLocaleDateString()}</td>
                      <td className="py-4 text-xs">
                        {act.type === 'event' ? (
                          <span className="text-gray-400">📍 {act.location || 'N/A'}</span>
                        ) : (
                          <button onClick={() => handleToggleStatus(act)} className={`flex items-center gap-1 font-bold px-2 py-1 rounded-lg ${act.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {act.status === 'completed' ? <Check size={12} /> : null} {act.status === 'completed' ? 'Done' : 'Pending'}
                          </button>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEditModal(act)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-all"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(act._id)} className="p-2 hover:bg-red-50 rounded-xl text-red-500 transition-all"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-gray-900">{editingActivity ? 'Edit Activity' : 'Add Activity'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                    <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type</label>
                      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="assignment">Assignment</option>
                        <option value="event">Internal Event</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date</label>
                      <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                    </div>
                  </div>
                  {form.type === 'event' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                      <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Meeting location..." />
                    </div>
                  )}
                  {form.type === 'assignment' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                  </div>
                  <button type="submit" disabled={formLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-opacity-90 transition-all flex justify-center items-center gap-2">
                    {formLoading ? <Loader2 className="animate-spin" size={20} /> : editingActivity ? 'Save Changes' : 'Publish Activity'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ManageActivities;
