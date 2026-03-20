import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Loader2, Tag } from 'lucide-react';
import { resolveImageUrl, handleImgError } from '../../../utils/imageUrl';

const fallbackBlogs = [
  {
    _id: 'f1',
    title: 'Empowering Next-Gen Innovators Through Digital Education',
    excerpt: 'Discover how modern digital labs and AI awareness are reshaping the educational landscape for remote communities.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
    createdAt: new Date().toISOString(),
    author: 'Aryan Patel',
    slug: 'empowering-next-gen-innovators'
  },
  {
    _id: 'f2',
    title: 'Scaling Food Distribution with SaaS Platforms',
    excerpt: 'We deployed our new logistics SaaS platform to ensure zero food waste and optimized routing during our national food seva drives.',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/6646922/pexels-photo-6646922.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    author: 'Viplora Tech',
    slug: 'scaling-food-distribution-saas'
  },
  {
    _id: 'f3',
    title: 'Sustainable Agriculture: Modern Tools for Farmers',
    excerpt: 'A deep dive into how affordable modern irrigation tools are doubling the crop yield for farmers in dry regions.',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    author: 'Sneha Reddy',
    slug: 'sustainable-agriculture-tools'
  }
];

const BlogList = () => {
  const [blogs, setBlogs] = useState<any[]>(fallbackBlogs);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blog');
        if (response.data && response.data.length > 0) {
          setBlogs(response.data);
        }
      } catch (err) {
        console.error("API error or empty database, using premium fallback data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark pb-20">
      
      {/* Dynamic Hero Section */}
      <section className="pt-32 pb-20 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-primary font-bold text-sm mb-6"
          >
            <Tag size={16} /> Latest Insights & Updates
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6"
          >
            Our Latest <span className="text-primary">Stories</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Stay updated with our newest initiatives, stories of deep social impact, and technological breakthroughs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search by topic or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-transparent dark:border-slate-700 focus:border-primary focus:ring-0 outline-none shadow-xl shadow-gray-200/50 dark:shadow-none text-gray-900 dark:text-white font-medium text-lg transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Content */}
      <section className="max-w-[1320px] mx-auto px-6 mt-16">
        {loading ? (
          <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredBlogs.map((blog: any, i) => (
                  <motion.div 
                    key={blog._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col justify-between h-full"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={resolveImageUrl(blog.image)} 
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={blog.title} 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/20">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1 text-primary"><User size={14} /> {blog.author}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="flex items-center gap-2 font-bold text-primary group/link border-t border-gray-100 dark:border-slate-700 pt-6 mt-4 inline-flex"
                      >
                        Read Full Story <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-gray-100 dark:border-slate-700"
              >
                <div className="w-24 h-24 bg-gray-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No stories found</h3>
                <p className="text-gray-500 text-lg">We couldn't find any blogs matching your search "{search}".</p>
                <button onClick={() => setSearch('')} className="mt-8 text-primary font-bold hover:underline">Clear Search</button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

    </div>
  );
};

export default BlogList;
