import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blog');
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-gray-900 mb-6"
          >
            Our Latest <span className="text-primary">Stories</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest initiatives, impact stories, and community updates.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog: any, i) => (
              <motion.div 
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="flex items-center gap-2 font-bold text-primary group/link"
                  >
                    Read More <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
