import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { resolveImageUrl, handleImgError } from '../../utils/imageUrl';

const categories = ['All', 'Events', 'Programs', 'Impact', 'Volunteers'];

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [formLoading, setFormLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [activeTab]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const query = activeTab === 'All' ? '' : `?category=${activeTab.toLowerCase()}`;
      const { data } = await api.get(`/gallery${query}`);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!files || files.length === 0) {
      alert("Please select at least one image file to upload");
      return;
    }
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      if (files) {
        Array.from(files).forEach(f => {
          formData.append('images', f); // Backend expects 'images' array
        });
      }

      await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setIsModalOpen(false);
      reset();
      setFiles(null);
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

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/10 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100/10 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

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
                <img 
                  src={resolveImageUrl(item.image)} 
                  onError={handleImgError}
                  className="w-full h-full object-cover" 
                  alt="" 
                />
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
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upload Images</label>
                <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" required />
                {files && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.from(files).map((f, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{f.name}</span>
                    ))}
                  </div>
                )}
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
