import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, ArrowRight, Share2 } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent px-4 pt-20">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden text-center"
      >
        <div className="bg-primary p-16 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
          <div className="relative z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
            >
              <CheckCircle size={48} className="text-secondary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Thank You for <br/>Your Kindness!</h1>
            <p className="text-xl opacity-80 font-medium">Your donation has been successfully processed.</p>
          </div>
        </div>

        <div className="p-16 space-y-10">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              You are now a vital part of our mission. Every contribution brings us closer to a world of equity and sustainability. A formal receipt has been sent to your email.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary px-10 py-5 text-lg flex items-center justify-center gap-2">
              View Dashboard <ArrowRight size={20} />
            </Link>
            <button className="bg-gray-50 text-gray-600 px-10 py-5 rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
              <Share2 size={20} /> Share Impact
            </button>
          </div>

          <div className="pt-10 border-t border-gray-100">
            <Link to="/programs" className="text-primary font-black hover:underline italic">Explore more causes →</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
