import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, BookOpen, Loader2, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { resolveImageUrl, handleImgError } from '../../../utils/imageUrl';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const ManageVolunteerBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [formLoading, setFormLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/blog');
      // Filter by authorId or author name for instant fallback match
      const myBlogs = data.filter((blog: any) => 
        blog.authorId === user?.id || 
        blog.author === user?.name
      );
      setBlogs(myBlogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!files && !editingBlog) {
      alert("Please select at least one image file to upload");
      return;
    }
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('excerpt', data.excerpt);
      formData.append('content', data.content);
      if (files) {
        Array.from(files).forEach(f => {
          formData.append('images', f);
         });
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editingBlog) {
        await api.put(`/blog/${editingBlog._id}`, formData, config);
      } else {
        await api.post('/blog', formData, config);
      }
      setIsModalOpen(false);
      reset();
      setFiles(null);
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
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <Link to="/volunteer/dashboard" className="inline-flex items-center gap-2 text-sm text-primary font-bold mb-2 hover:underline">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black text-gray-900">My Blog Posts</h1>
            <p className="text-gray-500 text-sm">Create and manage your stories with the foundation.</p>
          </div>
          <button onClick={() => { reset(); setEditingBlog(null); setIsModalOpen(true); }} className="bg-primary text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
            <Plus size={20} /> New Post
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {blogs.length > 0 ? (
                <table className="w-full text-left border-collapse">
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
                      <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <img 
                              src={resolveImageUrl(blog.image)} 
                              onError={handleImgError}
                              className="w-12 h-12 rounded-xl object-cover shrink-0" 
                              alt="" 
                            />
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
              ) : (
                <div className="p-20 text-center text-gray-400 font-bold">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-30 text-primary" />
                  <p className="text-xl">You haven't written any blogs yet.</p>
                  <p className="text-sm font-normal mt-1">Share your experience by clicking 'New Post'</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-primary text-white">
                <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Story' : 'Write New Story'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                      <input {...register('title', { required: true })} className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                        <input {...register('category', { required: true })} className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Upload Images</label>
                        <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none outline-none text-xs" required={!editingBlog} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Excerpt</label>
                      <textarea {...register('excerpt', { required: true })} rows={3} className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Short summary for the list page..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Main Content (Markdown/HTML Support)</label>
                    <textarea {...register('content', { required: true })} rows={12} className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="The heart of your story..." />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm">Cancel</button>
                  <button type="submit" disabled={formLoading} className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-opacity-90 transition-all text-sm">
                    {formLoading ? 'Saving...' : 'Publish Story'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageVolunteerBlog;
