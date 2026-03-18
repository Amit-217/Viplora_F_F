import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, BookOpen, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/blog');
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      if (editingBlog) {
        await api.put(`/blog/${editingBlog._id}`, data);
      } else {
        await api.post('/blog', data);
      }
      setIsModalOpen(false);
      reset();
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    Object.keys(blog).forEach((key) => {
      setValue(key as any, blog[key]);
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this blog post?')) {
      try {
        await api.delete(`/blog/${id}`);
        fetchBlogs();
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
            <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
            <p className="text-gray-500">Share your stories and updates with the world.</p>
          </div>
          <button onClick={() => { reset(); setEditingBlog(null); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2">
            <Plus size={20} /> New Post
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-8 py-6">Article</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.map((blog: any) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={blog.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <span className="font-bold text-gray-900 line-clamp-1">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 capitalize font-medium text-gray-600">{blog.category}</td>
                    <td className="px-8 py-6 text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => handleEdit(blog)} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(blog._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-primary text-white">
                  <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Story' : 'Write New Story'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Title</label>
                        <input {...register('title', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                          <input {...register('category', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Image URL</label>
                          <input {...register('image', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Excerpt</label>
                        <textarea {...register('excerpt', { required: true })} rows={3} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Short summary for the list page..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Main Content (Markdown/HTML Support)</label>
                      <textarea {...register('content', { required: true })} rows={12} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="The heart of your story..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-gray-500">Cancel</button>
                    <button type="submit" disabled={formLoading} className="btn-primary px-12">{formLoading ? 'Saving...' : 'Publish Story'}</button>
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

export default ManageBlog;
