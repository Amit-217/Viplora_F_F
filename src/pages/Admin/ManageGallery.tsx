import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/gallery');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      await api.post('/gallery', data);
      setIsModalOpen(false);
      reset();
      fetchGallery();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this image?')) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchGallery();
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
            <h1 className="text-3xl font-bold text-gray-900">Gallery Manager</h1>
            <p className="text-gray-500">Curate the visual impact of your foundation.</p>
          </div>
          <button onClick={() => { reset(); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2">
            <Plus size={20} /> Add Image
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item: any) => (
              <motion.div 
                key={item._id}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm aspect-square border border-gray-100"
              >
                <img src={item.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={() => handleDelete(item._id)} className="p-4 bg-red-500 text-white rounded-2xl shadow-xl hover:scale-110 transition-all">
                    <Trash2 size={24} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 space-y-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add to Gallery</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Image Title</label>
                <input {...register('title', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Event name..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                <select {...register('category', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  {['events', 'programs', 'impact', 'volunteers'].map(cat => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Image URL</label>
                <input {...register('image', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://..." />
              </div>
              <button type="submit" disabled={formLoading} className="w-full btn-primary py-5 text-lg">
                {formLoading ? 'Uploading...' : 'Upload to Gallery'}
              </button>
            </motion.form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageGallery;
