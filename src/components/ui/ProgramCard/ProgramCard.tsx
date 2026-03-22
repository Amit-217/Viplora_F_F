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
    type?: 'event' | 'fundraiser' | 'announcement';
    goalAmount?: number;
    raisedAmount?: number;
    date?: string;
    location?: string;
    targetDate?: string;
  };
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const progress = program.goalAmount && program.raisedAmount 
    ? Math.min(Math.round((program.raisedAmount / program.goalAmount) * 100), 100) 
    : 0;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col items-stretch border border-gray-100 dark:border-slate-700 shadow-xl shadow-gray-400/5 hover:shadow-gray-400/10 hover:border-primary/20 h-full group transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-56 md:h-60 w-full shrink-0 overflow-hidden">
        <img 
          src={resolveImageUrl(program.image)} 
          onError={handleImgError}
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
          <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 lg:px-5 lg:py-2 rounded-xl lg:rounded-2xl text-xs lg:text-xs font-black uppercase tracking-wider shadow-sm">
            {program.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-xl lg:text-xl font-extrabold text-gray-900 dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 text-sm leading-normal">
          {program.shortDescription}
        </p>

        {/* Progress Bar */}
        {(!program.type || program.type === 'fundraiser') && (
          <div className="block mb-6 space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Raised</span>
                <span className="text-primary text-2xl font-black flex items-center gap-1">
                  ₹{program.raisedAmount?.toLocaleString() || '0'}
                </span>
              </div>
              {program.goalAmount && (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Goal</span>
                  <span className="text-gray-900 font-bold text-base">₹{program.goalAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-1">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
              />
            </div>
          </div>
        )}

        {(program.type === 'event' || program.type === 'announcement') && (
          <div className="block mb-8 space-y-2">
            {program.date && (
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="text-primary font-bold">Date:</span> {new Date(program.date).toLocaleDateString('en-IN')}
              </div>
            )}
            {program.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="text-primary font-bold">Location:</span> {program.location}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex mt-auto pt-5 border-t border-gray-100 items-center justify-between gap-4">
          <Link 
            to={`/programs/${program.slug}`}
            className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-all group/link"
          >
            Explore <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to={`/donate?program=${program._id}`}
            className="bg-primary text-white p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:opacity-90 transition-all shadow-xl"
          >
            <Heart size={18} fill="currentColor" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
