import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle2, BookOpen, Leaf, Rocket, Flag, Award, Linkedin, Twitter, Mail, ShieldCheck, PieChart, HeartPulse, Scale, Shield, Users, BarChart3, Sparkles } from 'lucide-react';
import { resolveImageUrl, handleImgError } from '../../utils/imageUrl';

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

const members = [
  {
    name: "Amit Chandure",
    role: "Founding Member",
    img: "/amit.png",
    desc: "Dedicated to bridging the digital divide and igniting social impact across India."
  },
  {
    name: "Yashshree Patil",
    role: "Core Member",
    img: "/yashya.png",
    desc: "Architects our nationwide footprint, ensuring food seva and resources reach those in need."
  },
  {
    name: "Kanhopatra Kendre",
    role: "Core Member",
    img: "/kk.jpeg",
    desc: "Manages technical strategy and drives ground-level execution of community programs."
  },
  {
    name: "Shrikant Kabade",
    role: "Core Member",
    img: "/shrikant.png",
    desc: "Leads the educational programs, transforming students into industry-ready professionals."
  }
];

const objectivesData = [
  {
    category: "Education",
    icon: BookOpen,
    bg: "bg-blue-50 dark:bg-blue-900/10",
    textClass: "text-blue-600 dark:text-blue-400",
    points: [
      "To provide education in computer literacy, digital skills, programming, and emerging technologies especially for students in rural areas.",
      "To promote education through workshops, training programs, and awareness sessions for school and college students.",
      "To support students by providing educational materials such as books, uniforms, and resources."
    ]
  },
  {
    category: "Livelihood & Skill Development",
    icon: BookOpen, 
    bg: "bg-amber-50 dark:bg-amber-900/10",
    textClass: "text-amber-600 dark:text-amber-400",
    points: [
      "To provide skill development, vocational training, and job-oriented programs to unemployed youth.",
      "To promote career guidance and industry-relevant skills through collaborations."
    ]
  }
];

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8"
          >
            About <span className="text-primary">Viplora</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Born in 2026, we are on a mission to ignite rapid social change and build an equitable and sustainable future for all.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] relative overflow-hidden group shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500"
          >
            <Eye className="text-primary/5 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                <Eye size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                To build a sustainable and empowered society where every individual has access to education, essential resources, and opportunities to live with dignity while preserving nature.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-12 rounded-[3rem] relative overflow-hidden group text-white shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <Target className="text-white/5 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md text-white rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                <Target size={40} />
              </div>
              <h2 className="text-3xl font-black mb-6">Our Mission</h2>
              <p className="opacity-95 leading-relaxed font-medium">
                To initiate change through education and skill development, and gradually expand into areas of environmental sustainability, resource accessibility, and community upliftment through collective efforts.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Story Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black tracking-[0.2em] text-primary uppercase mb-3">The Journey</h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Story</h3>
          </div>
          <div className="relative max-w-[1000px] mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-[45%] ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 relative hover:-translate-y-1 transition-transform">
                      <span className="text-3xl font-black text-primary/20 absolute top-4 right-4">{m.year}</span>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{m.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-md z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black tracking-[0.2em] text-primary uppercase mb-3">Our Heroes</h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">Meet Our Team</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 group"
              >
                <div className="h-60 w-full relative overflow-hidden bg-slate-50 dark:bg-slate-700 flex items-center justify-center p-4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold dark:text-white mb-1">{member.name}</h3>
                  <p className="text-primary font-bold text-xs mb-3 uppercase tracking-wider">{member.role}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 100% Transparency */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h3 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-3">
                <PieChart className="text-primary" /> 100% Transparency
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Direct Programs", val: "85%", color: "bg-primary" },
                  { label: "Infra Maintenance", val: "10%", color: "bg-blue-500" },
                  { label: "Admin & Fundraising", val: "5%", color: "bg-emerald-500" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span className="font-bold dark:text-white">{item.label}</span>
                      <span className="text-primary font-black">{item.val}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><HeartPulse size={20} /></div>
                <div>
                  <h4 className="text-lg font-bold dark:text-white mb-1">Live Impact Tracking</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Donors receive direct updates on how contributions are utilized in real-time through dashboards.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><Scale size={20} /></div>
                <div>
                  <h4 className="text-lg font-bold dark:text-white mb-1">Quarterly Audits</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Independent audits are executed every quarter, with reports published publicly for scrutiny.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
