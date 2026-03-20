import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, Target } from 'lucide-react';
import { resolveImageUrl, handleImgError } from '../../../utils/imageUrl';

interface ProgramCardProps {
  program: {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    image: string;
    category: string;
    goalAmount: number;
    raisedAmount: number;
  };
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const progress = Math.min(Math.round((program.raisedAmount / program.goalAmount) * 100), 100);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-primary/10 rounded-2xl lg:rounded-[3rem] p-4 lg:p-0 flex flex-row lg:flex-col items-center lg:items-stretch gap-4 lg:gap-0 border border-slate-100 dark:border-primary/20 shadow-sm hover:shadow-md transition-all h-auto lg:h-full group"
    >
      {/* Image Section */}
      <div className="relative h-20 w-20 lg:h-72 lg:w-full shrink-0 overflow-hidden rounded-xl lg:rounded-none">
        <img 
          src={resolveImageUrl(program.image)} 
          onError={handleImgError}
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 lg:top-6 lg:left-6">
          <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 lg:px-5 lg:py-2 rounded-xl lg:rounded-2xl text-[8px] lg:text-xs font-black uppercase tracking-wider shadow-sm">
            {program.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col lg:p-8 lg:p-10 lg:flex-grow">
        <h3 className="text-base lg:text-2xl font-bold lg:font-black text-slate-900 dark:text-slate-100 mb-1 lg:mb-4 line-clamp-1 leading-tight">
          {program.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-0 lg:mb-8 line-clamp-2 text-xs lg:text-base leading-snug lg:leading-relaxed">
          {program.shortDescription}
        </p>

        {/* Progress Bar - Hidden on Mobile to match spec list */}
        <div className="hidden lg:block mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Raised</span>
              <span className="text-primary text-2xl font-black flex items-center gap-1">
                ₹{program.raisedAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Goal</span>
              <span className="text-gray-900 font-bold text-base">₹{program.goalAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-1">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
            />
          </div>
        </div>

        {/* Footer Actions / Chevron */}
        <div className="hidden lg:flex mt-auto pt-6 border-t border-gray-50 items-center justify-between gap-4">
          <Link 
            to={`/programs/${program.slug}`}
            className="text-gray-900 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-all group/link"
          >
            Explore <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to={`/donate?program=${program._id}`}
            className="bg-primary text-white p-4 rounded-2xl hover:opacity-90 transition-all shadow-xl"
          >
            <Heart size={20} fill="currentColor" />
          </Link>
        </div>

        {/* Mobile Chevron */}
        <div className="lg:hidden flex items-center text-slate-300">
          <ChevronRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
