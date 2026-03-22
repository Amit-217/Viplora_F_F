import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Heart, 
  Sprout, 
  Trees, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  FileText
} from 'lucide-react';
import { contactInfo } from '../../config/contactInfo';
import { resolveImageUrl, handleImgError } from '../../utils/imageUrl';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [
    '/edu.jfif',
    '/edu1.jfif',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Lives Impacted', value: '10+', icon: Users },
    { label: 'Programs', value: '01+', icon: FileText },
    { label: 'Volunteers', value: '08+', icon: Heart },
    { label: 'CSR Partnerships', value: 'Open', icon: ShieldCheck },
  ];

  const initiatives = [
    { 
      title: 'Education', 
      icon: GraduationCap, 
      desc: 'Providing quality learning resources and scholarships for underprivileged children.' 
    },
    { 
      title: 'Food Seva', 
      icon: Heart, 
      desc: 'Combating hunger by distributing nutritious meals to marginalized communities.' 
    },
    { 
      title: 'Farmer Support', 
      icon: Sprout, 
      desc: 'Empowering rural farmers with modern tools, training, and fair market access.' 
    },
    { 
      title: 'Green Environment', 
      icon: Trees, 
      desc: 'Promoting sustainable practices through afforestation and waste management.' 
    },
  ];

  const [featuredPrograms, setFeaturedPrograms] = useState<any[]>([]);

  // CSR Modal states
  const [isCsrModalOpen, setIsCsrModalOpen] = useState(false);
  const [csrData, setCsrData] = useState({ name: '', company: '', email: '', message: '' });
  const [csrLoading, setCsrLoading] = useState(false);

  const handleCsrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCsrLoading(true);
    try {
      await api.post('/contact', {
        name: csrData.name,
        email: csrData.email,
        subject: `CSR Proposal Request - ${csrData.company}`,
        message: csrData.message || `Hi, we are interested in CSR partnering. Company: ${csrData.company}`
      });
      toast.success('CSR request sent successfully!');
      setIsCsrModalOpen(false);
      setCsrData({ name: '', company: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send request. Try again layouts flawlessly.');
      console.error(err);
    } finally {
      setCsrLoading(false);
    }
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/programs');
        if (data && data.length > 0) {
          setFeaturedPrograms(data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch featured programs", err);
      }
    };
    fetchFeatured();
  }, []);


  return (
    <div className="w-full bg-background-light dark:bg-background-dark overflow-hidden">
      
      {/* Section 1: Hero */}
      <section className="min-h-[720px] pt-24 bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/20 dark:via-background-dark dark:to-background-dark flex items-center">
        <div className="max-w-[1320px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white"
            >
              Empowering Communities Through <span className="text-primary">Education</span> & Social Impact
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
            >
              Dedicated to transforming lives through quality education, food security, comprehensive farmer support, and long-term environmental sustainability.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/programs" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Explore Initiatives
              </Link>
              <Link to="/volunteer/apply" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Become Volunteer
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[480px] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl group"
          >
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={currentSlide}
                src={slideImages[currentSlide]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Viplora Foundation Educational Initiatives" 
              />
            </AnimatePresence>
            
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {slideImages.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 shadow-md ${currentSlide === i ? 'w-10 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/80'}`} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newly Started Full Width Banner */}
      <section className="bg-white dark:bg-background-dark relative z-10 pt-12">
        <div className="max-w-[1320px] mx-auto px-6 pb-6 border-b border-slate-50 dark:border-slate-800/50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 shrink-0 bg-white dark:bg-slate-800 text-accent rounded-2xl flex items-center justify-center relative shadow-lg border border-slate-100 dark:border-slate-700">
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                </span>
                <Sprout size={32} />
              </div>
              <p className="font-black text-slate-900 dark:text-white text-2xl md:text-4xl tracking-tight">A Growing Movement for Sustainable Impact</p>
            </div>
            <Link to="/programs" className="btn-primary font-bold text-lg flex items-center gap-2 group whitespace-nowrap w-full md:w-auto justify-center">
              Join now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Impact / Stats */}
      <section className="pt-8 pb-20 bg-white dark:bg-background-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-background-light border border-gray-200 flex flex-col items-center shadow-sm hover:shadow-md transition-all" 
              >
                <div className="w-12 h-12 bg-accent/30 rounded-xl flex items-center justify-center text-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <p className="text-4xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Core Initiatives */}
      <section className="py-24 bg-background-light dark:bg-slate-900/50">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Initiatives</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Focusing our efforts where they matter most, building a sustainable future through dedicated community action.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-4"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                <button className="mt-4 text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Programs */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => (
              <motion.div 
                key={program._id || index}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-56 w-full relative bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <img 
                    src={resolveImageUrl(program.image)} 
                    onError={handleImgError}
                    alt={`${program.title} - Viplora Platform Initiative`} 
                    loading="lazy" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white line-clamp-1">{program.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">{program.shortDescription || program.description}</p>
                  <Link to={`/programs/${program.slug}`} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                    Learn More <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Section 6: Volunteer CTA */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="bg-primary rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white">Become a Volunteer Today</h2>
              <p className="bg-white/10 text-white/90 p-4 rounded-xl max-w-2xl text-lg leading-relaxed">
                Your time and skills can change lives. Join our global network of changemakers and help us build a better world for everyone.
              </p>
              <Link to="/volunteer/apply" className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CSR */}
      <section className="py-24 border-t border-slate-100 dark:border-slate-800 bg-gradient-to-b from-white to-primary/5 dark:from-background-dark dark:to-slate-900">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Partner With Us for CSR Initiatives</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Align your corporate social responsibility goals with our impactful on-ground projects. Let's create measurable social change together in the tech and digital inclusion sectors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsCsrModalOpen(true)} 
              className="btn-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/30"
            >
              <FileText size={20} />
              Get CSR Proposal
            </button>
            <Link to="/contact" className="btn-secondary text-primary dark:text-white dark:border-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all text-center hover:-translate-y-1">
              Contact Partnerships
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Our Journey / Gallery */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Journey in Mogarga, Latur</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-3">
              Real-world stories and volunteer moments that showcase our growing impact and community-led trust.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['/edu.jfif', '/edu1.jfif', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070'].map((src, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden group shadow-lg border border-gray-200 dark:border-slate-700">
                <img src={src} alt={`Journey ${index + 1}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-bold text-xl">Volunteer Field Visit</p>
                  <p className="text-sm mt-1">From Mogarga to neighborhood upliftment, every photo tells a story.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Request Modal Overlay absolute flawless */}
      <AnimatePresence>
        {isCsrModalOpen && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <div onClick={() => setIsCsrModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 text-left space-y-6 overflow-hidden md:max-w-md"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-teal-600" />
              
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">CSR Proposal Request</h2>
                <button onClick={() => setIsCsrModalOpen(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full"><FileText size={20} className="text-slate-400" /></button>
              </div>

              <form onSubmit={handleCsrSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    value={csrData.name} 
                    onChange={e => setCsrData({...csrData, name: e.target.value})} 
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium" 
                    placeholder="John Doe" 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
                  <input 
                    required 
                    type="text" 
                    value={csrData.company} 
                    onChange={e => setCsrData({...csrData, company: e.target.value})} 
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium" 
                    placeholder="Acme Inc." 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</label>
                  <input 
                    required 
                    type="email" 
                    value={csrData.email} 
                    onChange={e => setCsrData({...csrData, email: e.target.value})} 
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium" 
                    placeholder="john@company.com" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Short Message (Optional)</label>
                  <textarea 
                    value={csrData.message} 
                    onChange={e => setCsrData({...csrData, message: e.target.value})} 
                    rows={3} 
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium resize-none" 
                    placeholder="Write details about your queries..." 
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={csrLoading}
                    className="w-full btn-primary py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    {csrLoading ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
