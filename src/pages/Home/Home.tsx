import React from 'react';
import { motion } from 'framer-motion';
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

const Home = () => {
  const stats = [
    { label: 'Lives Impacted', value: '5000+', icon: Users },
    { label: 'Programs', value: '120+', icon: FileText },
    { label: 'Volunteers', value: '300+', icon: Heart },
    { label: 'CSR Partners', value: '20+', icon: ShieldCheck },
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

  const featuredPrograms = [
    {
      title: 'Digital Education',
      desc: 'Bridging the digital divide by setting up computer labs in rural schools.',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2532'
    },
    {
      title: 'AI Awareness',
      desc: 'Educating youth about the future of technology and ethical AI usage.',
      img: 'https://images.unsplash.com/photo-1620712943767-6a683cf30f5d?q=80&w=2670'
    },
    {
      title: 'Community Food',
      desc: 'Building local food banks to ensure zero hunger in our neighborhoods.',
      img: 'https://images.unsplash.com/photo-1542838132-92c5333f49ca?q=80&w=2070'
    }
  ];

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
            className="relative h-[480px] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070" 
              className="w-full h-full object-cover" 
              alt="Diverse students learning happily together" 
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Impact / Stats */}
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
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
                key={index}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-48 w-full bg-slate-200 dark:bg-slate-800">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{program.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{program.desc}</p>
                  <a className="text-primary font-semibold text-sm hover:underline flex items-center gap-1" href="#">
                    Learn More <ChevronRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Volunteer CTA */}
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
      <section className="py-24 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Partner With Us for CSR Initiatives</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Align your corporate social responsibility goals with our impactful on-ground projects. Let's create measurable social change together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">description</span>
              Get CSR Proposal
            </button>
            <Link to="/contact" className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/5 transition-colors text-center">
              Contact Partnerships
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
