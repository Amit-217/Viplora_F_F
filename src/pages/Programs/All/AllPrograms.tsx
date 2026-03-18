import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import ProgramCard from '../../../components/ui/ProgramCard/ProgramCard';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';

const categories = ['All', 'Education', 'Food', 'Farmers', 'Water', 'Environment', 'Health'];

const AllPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const query = activeCategory === 'All' ? '' : `?category=${activeCategory.toLowerCase()}`;
        const response = await api.get(`/programs${query}`);
        setPrograms(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-gray-900 mb-6"
          >
            Explore <span className="text-primary">Our Programs</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a cause that speaks to your heart and help us create a sustainable impact in the lives of those in need.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search programs..." 
              className="pl-12 pr-6 py-3 rounded-full bg-white border-none shadow-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-80"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-gray-500 font-medium">Loading meaningful causes...</p>
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((program: any) => (
              <ProgramCard key={program._id} program={program} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-500">We are currently planning more impactful projects in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPrograms;
