import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';

const BlogSingle = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-primary"><Loader2 className="animate-spin" size={48} /></div>;
  if (!blog) return <div className="h-screen flex items-center justify-center text-red-500 font-bold text-2xl">Story not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <section className="relative h-[60vh]">
        <img src={blog.image} className="w-full h-full object-cover" alt={blog.title} />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold mb-8 transition-all">
                <ArrowLeft size={20} /> Back to Stories
              </Link>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                {blog.title}
              </h1>
              <div className="flex justify-center items-center gap-6 text-white/80 font-bold uppercase tracking-widest text-xs">
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><User size={14} /> {blog.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-20 max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Social Sidebar */}
          <div className="md:w-16 flex md:flex-col gap-4 sticky top-32 h-fit">
            <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook size={20} /></button>
            <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter size={20} /></button>
            <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Linkedin size={20} /></button>
            <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Share2 size={20} /></button>
          </div>

          {/* Main Body */}
          <div className="flex-grow">
            <div 
              className="prose prose-xl prose-primary max-w-none text-gray-700 leading-relaxed font-serif"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
            
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-3">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-accent py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Inspired by this story?</h2>
          <p className="text-xl text-gray-600 mb-10">Your support helps us create more such impact stories on the ground.</p>
          <Link to="/donate" className="btn-primary px-12 py-5 text-xl inline-block shadow-2xl shadow-primary/20">Support Our Mission</Link>
        </div>
      </section>
    </div>
  );
};

export default BlogSingle;
