import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Heart, Shield, Globe } from 'lucide-react';

const Vision = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-8"
          >
            Vision & <span className="text-primary">Mission</span>
          </motion.h1>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Defining our path towards a sustainable and equitable future for all.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-accent p-16 rounded-[4rem] relative overflow-hidden group"
          >
            <Eye className="text-primary/10 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                <Eye size={40} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Vision</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                To create a world where every individual has access to life's basic necessities, where communities are self-reliant, and where the planet thrives in harmony with human progress.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-primary p-16 rounded-[4rem] relative overflow-hidden group text-white"
          >
            <Target className="text-white/5 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-secondary text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-secondary/20">
                <Target size={40} />
              </div>
              <h2 className="text-4xl font-black mb-6">Our Mission</h2>
              <p className="text-xl opacity-90 leading-relaxed font-medium">
                To empower marginalized communities through innovative programs in education, healthcare, and sustainable livelihood, while fostering environmental stewardship and transparent governance.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900">Our Core Values</h2>
            <div className="w-24 h-2 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Compassion', desc: 'Empathy at the core of every decision we make.' },
              { icon: Shield, title: 'Integrity', desc: 'Absolute transparency in our actions and finances.' },
              { icon: Globe, title: 'Sustainability', desc: 'Solutions that last generations, not just days.' },
              { icon: Sparkles, title: 'Innovation', desc: 'Finding creative ways to solve age-old problems.' }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
