import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/contact', data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-primary p-12 rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
              <MessageSquare className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
              <div className="relative z-10 space-y-12">
                <h3 className="text-3xl font-bold">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                      <Phone className="text-secondary" size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-1">Call Us</p>
                      <p className="text-xl font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                      <Mail className="text-secondary" size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-1">Email Us</p>
                      <p className="text-xl font-bold">hello@viplora.org</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                      <MapPin className="text-secondary" size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-1">Visit Us</p>
                      <p className="text-xl font-bold">123 NGO Street, Hope City, IND</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-[3rem] overflow-hidden grayscale contrast-125 opacity-50 relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full font-bold text-gray-900 text-xs uppercase tracking-widest shadow-lg">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-gray-50 space-y-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-gray-400 font-medium mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>

              {success && (
                <div className="bg-green-50 text-green-600 p-6 rounded-[2rem] flex items-center gap-4">
                  <CheckCircle size={32} />
                  <div>
                    <p className="font-bold text-lg">Message Sent!</p>
                    <p className="text-sm opacity-80">Thank you for reaching out to us.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-[2rem] flex items-center gap-4">
                  <AlertCircle size={32} />
                  <p className="font-bold">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Your Name</label>
                  <input {...register('name', { required: true })} className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Your Email</label>
                  <input {...register('email', { required: true })} className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                <input {...register('subject', { required: true })} className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Message</label>
                <textarea {...register('message', { required: true })} rows={6} className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="Write your thoughts here..." />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-6 rounded-[2rem] font-black text-xl text-white transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90 shadow-primary/20'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'} <Send size={20} />
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
