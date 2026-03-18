import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Loader2 } from 'lucide-react';

const categories = ['All', 'Events', 'Programs', 'Impact', 'Volunteers'];

const GalleryGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const query = activeTab === 'All' ? '' : `?category=${activeTab.toLowerCase()}`;
        const response = await api.get(`/gallery${query}`);
        setItems(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [activeTab]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-gray-900 mb-6"
          >
            Our Impact <span className="text-primary">In Pictures</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A visual journey through our missions, events, and the lives we've touched together.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                activeTab === cat 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            <AnimatePresence>
              {items.map((item: any) => (
                <motion.div
                  layout
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="break-inside-avoid"
                >
                  <div className="group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                      <p className="text-white font-bold text-xl mb-1">{item.title}</p>
                      <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="text-primary" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">We are adding more visual stories soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
