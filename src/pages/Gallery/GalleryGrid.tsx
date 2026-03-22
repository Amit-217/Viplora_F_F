import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Loader2, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageUrl, handleImgError } from '../../utils/imageUrl';

const categories = ['All', 'Events', 'Programs', 'Impact', 'Volunteers'];

const GalleryGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (selectedItem) {
      setCurrentImgIndex(0);
    }
  }, [selectedItem]);

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
                  <div 
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
                  >
                    <img 
                      src={resolveImageUrl(item.image)} 
                      onError={handleImgError}
                      alt={item.title} 
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                        <ZoomIn size={28} />
                      </div>
                    </div>
                    {/* Text Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-lg mb-0.5">{item.title}</p>
                      <p className="text-primary text-xs font-bold uppercase tracking-widest">{item.category}</p>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="relative max-w-5xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={resolveImageUrl(
                    selectedItem.images && selectedItem.images.length > 0
                      ? selectedItem.images[currentImgIndex]
                      : selectedItem.image
                  )} 
                  onError={handleImgError}
                  alt={selectedItem.title} 
                  className="max-h-[75vh] w-auto object-contain transition-all duration-300" 
                />
                
                {/* Navigation Arrows for multi images */}
                {selectedItem.images && selectedItem.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(prev => prev === 0 ? selectedItem.images.length - 1 : prev - 1); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(prev => prev === selectedItem.images.length - 1 ? 0 : prev + 1); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Index dots */}
                    <div className="absolute top-4 right-4 flex gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                      {selectedItem.images.map((_: any, idx: number) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImgIndex ? 'bg-primary' : 'bg-white/40'}`} />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white font-black text-2xl mb-1">{selectedItem.title}</h3>
                  <p className="text-primary text-sm font-black uppercase tracking-widest">{selectedItem.category}</p>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/5 transition-all hover:scale-105"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
