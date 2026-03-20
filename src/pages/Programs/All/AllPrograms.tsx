import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import ProgramCard from '../../../components/ui/ProgramCard/ProgramCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Sparkles } from 'lucide-react';

const categories = ['All', 'Education', 'Food', 'Farmers', 'Water', 'Environment', 'Health'];



const AllPrograms = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const query = activeCategory === 'All' ? '' : `?category=${activeCategory.toLowerCase()}`;
        const response = await api.get(`/programs${query}`);
        setPrograms(response.data || []);
      } catch (err) {
        console.error("API error loading programs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [activeCategory]);

  const displayedPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark pb-20">
      
      {/* Dynamic Hero Section */}
      <section className="pt-32 pb-16 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-primary font-bold text-sm mb-6"
          >
            <Sparkles size={16} /> Ignite Social Change
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6"
          >
            Explore <span className="text-primary">Our Programs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Choose a cause that speaks to your heart and help us create a sustainable impact in the lives of those in need.
          </motion.p>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 mt-12">
        {/* Filters & Search */}
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-800 p-4 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-[1.5rem] font-bold transition-all text-sm flex-grow sm:flex-grow-0 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search specific programs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-4 rounded-[1.5rem] bg-gray-50 dark:bg-slate-700/50 border-2 border-transparent focus:border-primary/20 outline-none w-full text-gray-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-gray-500 font-medium">Fetching impactful projects...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {displayedPrograms.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayedPrograms.map((program: any, i) => (
                  <motion.div
                    key={program._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProgramCard program={program} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-slate-800 p-20 rounded-[3rem] text-center shadow-sm border border-gray-100 dark:border-slate-700"
              >
                <div className="w-24 h-24 bg-gray-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">No programs found</h3>
                <p className="text-gray-500 text-lg">We are currently planning more impactful projects in this category.</p>
                <button onClick={() => { setActiveCategory('All'); setSearch(''); }} className="mt-8 text-primary font-bold hover:underline">View All Programs</button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

    </div>
  );
};

export default AllPrograms;
