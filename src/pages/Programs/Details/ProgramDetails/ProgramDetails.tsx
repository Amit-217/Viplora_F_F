import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../../services/api';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Share2, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

const ProgramDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get(`/programs/${id}`);
        setProgram(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-primary font-bold">Loading...</div>;
  if (!program) return <div className="h-screen flex items-center justify-center text-red-500 font-bold">Program not found</div>;

  const progress = Math.min(Math.round((program.raisedAmount / program.goalAmount) * 100), 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Hero Section */}
      <section className="relative h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              {program.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              {program.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80 font-medium">
              <span className="flex items-center gap-2"><MapPin size={18} className="text-secondary" /> Multiple Locations</span>
              <span className="flex items-center gap-2"><Calendar size={18} className="text-secondary" /> Active Campaign</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content & Sidebar Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About this program</h2>
              <p className="mb-6">{program.description}</p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Why this matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {['Direct community impact', 'Sustainable solutions', 'Transparent fund usage', 'Regular updates to donors'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 bg-accent p-4 rounded-2xl border border-primary/5">
                    <CheckCircle2 className="text-primary shrink-0" />
                    <span className="font-bold text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Masonry */}
            {program.gallery?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Campaign Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {program.gallery.map((img: string, i: number) => (
                    <img key={i} src={img} className="rounded-3xl h-48 w-full object-cover hover:scale-105 transition-transform" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Donation Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-primary/10 border border-gray-50">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Support this cause</h4>
                
                {/* Progress Bar */}
                <div className="mb-8 space-y-3">
                  <div className="flex justify-between font-bold">
                    <span className="text-primary text-2xl">₹{program.raisedAmount.toLocaleString()}</span>
                    <span className="text-gray-400 self-end">of ₹{program.goalAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>{progress}% Raised</span>
                    <span>Campaign Ongoing</span>
                  </div>
                </div>

                <Link 
                  to={`/donate?program=${program._id}`}
                  className="w-full btn-secondary py-5 flex items-center justify-center gap-2 text-lg shadow-xl shadow-secondary/20"
                >
                  <Heart fill="currentColor" size={20} /> Donate Now
                </Link>

                <button className="w-full mt-4 bg-gray-50 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                  <Share2 size={18} /> Share Campaign
                </button>
              </div>

              {/* Impact Card */}
              <div className="bg-accent p-8 rounded-[3rem] border border-primary/5">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-primary" size={28} />
                  <h4 className="text-xl font-bold">Our Impact Goals</h4>
                </div>
                <div className="space-y-6">
                  {program.impactStats?.map((stat: any, i: number) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-primary/10 last:border-0">
                      <span className="text-gray-600 font-medium">{stat.label}</span>
                      <span className="text-primary font-extrabold text-xl">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProgramDetails;
