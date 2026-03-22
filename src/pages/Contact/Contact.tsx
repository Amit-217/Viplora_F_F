import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare, User, Laptop, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactInfo } from '../../config/contactInfo';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    const toastId = toast.loading('Sending your message...');
    try {
      await api.post('/contact', data);
      setSuccess(true);
      toast.success('Message sent successfully! Our team will reach out soon.', { id: toastId });
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Failed to send message';
      setError(errMsg);
      toast.error(errMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent dark:bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <p className="text-sm font-black tracking-[0.25em] uppercase text-primary mb-3">Contact</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions, want to partner with us, or simply want to learn more? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 bg-gradient-to-br from-primary to-emerald-600 dark:from-slate-800 dark:to-slate-900 p-8 sm:p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden h-full flex flex-col"
          >
            {/* abstract shape */}
            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-12 -translate-y-12">
               <MessageSquare size={200} />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-start space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-2">Contact Information</h3>
                <p className="text-white/80 text-lg">Reach out directly through our real-time channels.</p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-white/10 group-hover:bg-white/20 transition-colors rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0 border border-white/10">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="pt-1 space-y-1">
                    <p className="text-white/60 font-bold text-xs mb-1 uppercase tracking-wider">Call Us</p>
                    {[contactInfo.phone, contactInfo.phoneAlt].filter(Boolean).map((num) => (
                      <a 
                        key={num} 
                        href={`tel:${num.replace(/\s+/g, '')}`} 
                        className="text-lg font-bold hover:text-white/90 cursor-pointer block"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-white/10 group-hover:bg-white/20 transition-colors rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0 border border-white/10">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="pt-1 space-y-1">
                    <p className="text-white/60 font-bold text-xs mb-1 uppercase tracking-wider">Email Us</p>
                    {[contactInfo.email, contactInfo.emailAlt].filter(Boolean).map((mail) => (
                      <a 
                        key={mail} 
                        href={`mailto:${mail}`} 
                        className="text-lg font-bold hover:underline block"
                      >
                        {mail}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-white/10 group-hover:bg-white/20 transition-colors rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0 border border-white/10">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="pt-1">
                    <p className="text-white/60 font-bold text-xs mb-1 uppercase tracking-wider">Location</p>
                    <a href={contactInfo.contactUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold leading-tight hover:underline flex items-center gap-2">
                      {contactInfo.address} <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>


              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 relative h-full flex flex-col"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Send a Message</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">We will respond as soon as we can.</p>
              </div>

              {success && (
                <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-5 rounded-2xl flex items-start gap-3 border border-green-200 dark:border-green-800 mb-6">
                  <CheckCircle size={24} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Sent Successfully!</p>
                    <p className="text-sm opacity-90">Thank you for reaching out. We'll be in touch soon.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-5 rounded-2xl flex items-center gap-3 border border-red-200 dark:border-red-800 mb-6">
                  <AlertCircle size={24} className="shrink-0" />
                  <p className="font-bold">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      {...register('name', { required: true })} 
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white font-medium" 
                      placeholder="John Doe" 
                    />
                  </div>
                  {errors.name && <span className="text-red-500 text-xs font-medium">Name is required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="email"
                      {...register('email', { required: true })} 
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white font-medium" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  {errors.email && <span className="text-red-500 text-xs font-medium">Email is required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    {...register('subject', { required: true })} 
                    className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white font-medium" 
                    placeholder="How can we help?" 
                  />
                </div>
                {errors.subject && <span className="text-red-500 text-xs font-medium">Subject is required</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 text-slate-400" size={20} />
                  <textarea 
                    {...register('message', { required: true })} 
                    rows={5} 
                    className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white resize-none font-medium" 
                    placeholder="Tell us what's on your mind..." 
                  />
                </div>
                {errors.message && <span className="text-red-500 text-xs font-medium">Message is required</span>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2 ${
                  loading ? 'bg-slate-400' : 'bg-primary hover:bg-opacity-90 shadow-lg shadow-primary/30 hover:-translate-y-1'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'} {!loading && <Send size={20} />}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Google Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 h-[450px] relative z-10"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.432644264627!2d76.51608677465337!3d18.407956843399037!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!8f13.1!3m3!1m2!1s0x3bcf83a30a8ed109%3A0xe5a363d664164b4c!2sMogarga%2C%20Maharashtra%20413511!5e0!3m2!1sen!2sin!4v1711132800000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Core Values Section */}
        <div className="mt-24 pt-20 border-t border-slate-200 dark:border-slate-800 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
            >
              Our Core <span className="text-primary">Values</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              The driving principles behind everything we do to bring change.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Laptop size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technology & Innovation</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                Use of tech and platforms to solve real-world problems.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <Heart size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Compassion</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                Work driven purely by genuine intent to help communities.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <ShieldCheck size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Accountability</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                Every action is tracked, logged, and auditable.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
