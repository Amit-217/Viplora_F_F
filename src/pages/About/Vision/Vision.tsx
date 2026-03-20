import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Heart, Shield, Globe, BookOpen, Briefcase, Leaf, Scale, CheckCircle2, Map, Users, BarChart3, Rocket } from 'lucide-react';

const objectivesData = [
  {
    category: "Education",
    icon: BookOpen,
    bg: "bg-blue-50 dark:bg-blue-900/10",
    textClass: "text-blue-600 dark:text-blue-400",
    points: [
      "To provide education in computer literacy, digital skills, programming, and emerging technologies including Artificial Intelligence, especially for students in rural and underserved areas.",
      "To promote education through workshops, training programs, digital learning platforms, and awareness sessions for school students, college students, and youth.",
      "To support students by providing educational materials such as books, uniforms, scholarships, and other necessary resources."
    ]
  },
  {
    category: "Livelihood & Skill Development",
    icon: Briefcase,
    bg: "bg-amber-50 dark:bg-amber-900/10",
    textClass: "text-amber-600 dark:text-amber-400",
    points: [
      "To provide skill development, vocational training, and job-oriented programs to unemployed youth, graduates, and job seekers to enhance employability and livelihood opportunities.",
      "To promote career guidance, entrepreneurship, and industry-relevant skills through collaborations with institutions, organizations, and companies."
    ]
  },
  {
    category: "Welfare & Social Support",
    icon: Heart,
    bg: "bg-rose-50 dark:bg-rose-900/10",
    textClass: "text-rose-600 dark:text-rose-400",
    points: [
      "To organize food distribution programs, nutrition support initiatives, and provide assistance to underprivileged individuals and communities to ensure basic necessities."
    ]
  },
  {
    category: "Environment & Sustainability",
    icon: Leaf,
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    textClass: "text-emerald-600 dark:text-emerald-400",
    points: [
      "To promote environmental protection through tree plantation drives, awareness programs, cleanliness campaigns, and sustainable practices.",
      "To undertake initiatives related to water conservation, resource management, and ecological balance."
    ]
  },
  {
    category: "General Collaboration",
    icon: Globe,
    bg: "bg-indigo-50 dark:bg-indigo-900/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
    points: [
      "To collaborate with government bodies, CSR initiatives, NGOs, educational institutions, and other organizations to achieve the objectives of the Trust.",
      "To undertake any lawful activities that support the above objectives and contribute towards social welfare and development."
    ]
  },
  {
    category: "Nature of Trust",
    icon: Scale,
    bg: "bg-slate-100 dark:bg-slate-800/50",
    textClass: "text-slate-700 dark:text-slate-300",
    points: [
      "The Trust shall work entirely on a not-for-profit basis, and no portion of its income or property shall ever be distributed among its trustees."
    ]
  }
];

const Vision = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8"
          >
            Vision & <span className="text-primary">Mission</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Defining our path towards a sustainable and equitable future for all.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-12 lg:p-16 rounded-[3rem] relative overflow-hidden group shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
          >
            <Eye className="text-primary/5 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                <Eye size={40} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Our Vision (The Final Goal)</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                To build a sustainable and empowered society where every individual has access to education, essential resources, and opportunities to live with dignity while preserving nature and supporting future generations.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {['Education', 'Basic Needs', 'Environment', 'Long-term Impact'].map((tag, i) => (
                  <span key={i} className="bg-primary/5 text-primary text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                    <CheckCircle2 size={16} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-12 lg:p-16 rounded-[3rem] relative overflow-hidden group text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500"
          >
            <Target className="text-white/5 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md text-white rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                <Target size={40} />
              </div>
              <h2 className="text-4xl font-black mb-6">Our Mission (Current & Future)</h2>
              <p className="text-lg opacity-95 leading-relaxed font-medium">
                To initiate change through education and skill development, and gradually expand into areas of environmental sustainability, resource accessibility, and community upliftment through technology, innovation, and collective efforts.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Phase-wise Clarity (Roadmap) */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black tracking-[0.2em] text-primary uppercase mb-3">Our Roadmap</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">Phase-wise Clarity</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We believe in structured, scalable growth. Here is our step-by-step approach to creating widespread social impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] border-2 border-primary/20 shadow-lg shadow-primary/5 hover:-translate-y-2 transition-transform"
            >
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <BookOpen size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Phase 1</h4>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Current Focus</p>
              <ul className="space-y-4">
                {[
                  'Education programs',
                  'Skill development',
                  'Training & certificates',
                  'Teaching ecosystem',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-transform"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Phase 2</h4>
              <p className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-6">Expansion</p>
              <ul className="space-y-4">
                {[
                  'Tree plantation drives',
                  'Water conservation',
                  'Clean environment',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-transform"
            >
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Rocket size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Phase 3</h4>
              <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6">Impact Scale</p>
              <ul className="space-y-4">
                {[
                  'Farmer support programs',
                  'Food sustainability',
                  'Rural development',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                    <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Foundation Objectives List */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black tracking-[0.2em] text-primary uppercase mb-3">Official Charter</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">Trust Objectives</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The foundational pillars and legal framework guiding our day-to-day community impact and operational roadmap.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectivesData.map((obj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-16 h-16 ${obj.bg} ${obj.textClass} rounded-2xl flex items-center justify-center shrink-0`}>
                    <obj.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {obj.category}
                  </h4>
                </div>
                
                <ul className="space-y-5">
                  {obj.points.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-4">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Updated Core Values */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Core Values</h2>
            <div className="w-24 h-2 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {[
                { icon: Shield, title: 'Integrity', desc: 'Transparent system, proper fund tracking and operations.' },
                { icon: BookOpen, title: 'Education First', desc: 'Education is the foundation of every long-term change.' },
                { icon: Leaf, title: 'Sustainability', desc: 'Every initiative must support long-term environmental balance.' },
                { icon: Users, title: 'Inclusivity', desc: 'Opportunities for everyone — absolutely no bias.' },
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full max-w-xs p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/20 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto">
              {[
                { icon: Sparkles, title: 'Innovation', desc: 'Use of tech and platforms to solve real-world problems.' },
                { icon: Heart, title: 'Compassion', desc: 'Work driven purely by genuine intent to help communities.' },
                { icon: BarChart3, title: 'Accountability', desc: 'Every action is tracked, logged, and auditable.' }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full max-w-xs p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/20 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Vision;

