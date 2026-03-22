import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, Rocket, Award } from 'lucide-react';

const Story = () => {
  const milestones = [
    {
      year: 'Early 2026',
      title: 'The Genesis',
      desc: 'The idea for Viplora Foundation was born alongside Viplora Tech Solutions—driven by a deep desire to leverage technology for tangible social good.',
      icon: Target
    },
    {
      year: 'Mid 2026',
      title: 'Taking Shape',
      desc: 'Official formation of the foundation and the rapid mobilization of our core volunteer networks across the digital and agricultural sectors.',
      icon: Flag
    },
    {
      year: 'Late 2026',
      title: 'First Impact Drives',
      desc: 'Successfully launched our pilot rural education initiatives and executed our maiden food sustainability drives.',
      icon: Rocket
    },
    {
      year: 'The Future',
      title: 'Expanding Horizons',
      desc: 'Committed to scaling our operations rapidly to empower thousands of lives, operating with 100% digital transparency.',
      icon: Award
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-background-dark pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 dark:text-white mb-4"
          >
            Our <span className="text-primary">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Born in 2026, we are a dynamic startup foundation on a mission to ignite rapid social change. 
            Here is the beginning of our incredible journey.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-1 h-full bg-slate-200 dark:bg-slate-800 rounded-full" />
          
          <div className="space-y-8 md:space-y-16 mt-12">
            {milestones.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex items-center w-full justify-start ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-12 md:pl-0' : 'md:text-left md:pl-12 md:pr-0'} pl-12 pr-4`}>
                  <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 relative group hover:-translate-y-2 transition-transform">
                    <span className={`text-3xl md:text-4xl font-black text-primary/20 absolute top-4 ${i % 2 === 0 ? 'right-4 md:left-4 md:right-auto' : 'right-4'}`}>{m.year}</span>
                    <div className={`w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 ${i % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} ml-0 mr-auto`}>
                      <m.icon size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 dark:text-white">{m.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">{m.desc}</p>
                  </div>
                </div>
                
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-md z-10" />
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Story;
