import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../../services/api';
import { motion } from 'framer-motion';
import { User, Phone, Briefcase, Heart, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VolunteerApply = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    const toastId = toast.loading('Submitting your application...');
    try {
      await api.post('/volunteer/apply', data);
      setSuccess(true);
      toast.success('Application submitted successfully!', { id: toastId });
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Application failed';
      setError(errMsg);
      toast.error(errMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white p-12 rounded-[3rem] text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Sent!</h2>
          <p className="text-gray-600 mb-8">Thank you for your interest. Our team will review your application and get back to you shortly.</p>
          <div className="text-sm text-primary font-bold animate-pulse">Redirecting to dashboard...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-16">
        
        {/* Left Info Column */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Be the Change <br/><span className="text-primary">You Wish to See</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our community of passionate volunteers dedicated to making a real impact on the ground.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: Heart, title: 'Meaningful Work', desc: 'Work directly with communities in need.' },
              { icon: Clock, title: 'Flexible Commitment', desc: 'Choose between weekdays or weekends.' },
              { icon: CheckCircle, title: 'Certification', desc: 'Get QR-verified participation certificates.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-3">
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-background-dark p-6 lg:p-12 rounded-[2rem] lg:rounded-[3rem] border border-primary/5 shadow-xl space-y-5"
          >
            {/* Mobile Header style */}
            <h2 className="text-2xl font-bold text-primary dark:text-slate-100 lg:text-3xl"> Volunteer Registration </h2>
            <p className="text-sm text-slate-500 mb-6">Join our community and make an impact on the ground.</p>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Full Name</p>
              <input 
                {...register('name', { required: true })}
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 p-4 text-sm" 
                placeholder="Enter your full name" 
                type="text"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Email Address</p>
              <input 
                {...register('email', { required: true })}
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 p-4 text-sm" 
                placeholder="example@email.com" 
                type="email"
              />
            </div>

            {/* Phone & Occupation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Phone Number</p>
                <input 
                  {...register('phone', { required: true })}
                  className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 p-4 text-sm" 
                  placeholder="+91 XXXXX XXXXX" 
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Occupation</p>
                <input 
                  {...register('occupation', { required: true })}
                  className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 p-4 text-sm" 
                  placeholder="Student, Engineer, etc." 
                  type="text"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Skills</p>
              <textarea 
                {...register('skills', { required: true })}
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 min-h-[100px] p-4 text-sm resize-none" 
                placeholder="E.g. Teaching, Marketing, Event Management"
              />
            </div>

            {/* Location with Icon from Spec */}
            <div className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Location</p>
              <div className="relative">
                <input 
                  {...register('location', { required: true })}
                  className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 pl-11 p-4 text-sm" 
                  placeholder="City, State" 
                  type="text"
                />
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            {/* Availability - Select element from Spec */}
            <div className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold pb-2 uppercase tracking-wider">Availability</p>
              <select 
                {...register('availability', { required: true })}
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 border border-primary/10 bg-white dark:bg-slate-800/50 h-14 px-4 text-sm appearance-none cursor-pointer"
              >
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings only</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Submit Button form Footer from Spec */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary text-white h-14 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-60 bg-gray-400' : 'shadow-lg shadow-primary/10'}`}
              >
                {loading ? 'Applying...' : 'Apply'}
                <Sparkles size={18} />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApply;
