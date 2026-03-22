import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShieldCheck, CreditCard, User, Mail, Phone, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactInfo } from '../../../config/contactInfo';

const amounts = [100, 500, 1000, 2000, 5000];

const Donate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const programId = searchParams.get('program');

  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Donation Info */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary p-12 rounded-[3rem] text-white h-full relative overflow-hidden"
            >
              <div className="relative z-10">
                <Heart className="w-16 h-16 text-secondary mb-8" fill="currentColor" />
                <h1 className="text-4xl font-bold mb-6">Your Contribution <br/>Creates Change</h1>
                <p className="text-xl opacity-80 leading-relaxed mb-10">
                  Every rupee you donate helps us provide clean water, quality education, and sustainable livelihoods to those who need it most.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <ShieldCheck className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">100% Secure</h4>
                      <p className="text-sm opacity-60">Encrypted payment gateway</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <CreditCard className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Tax Benefit</h4>
                      <p className="text-sm opacity-60">Eligible for 80G deduction</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Abstract Shape */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>

          {/* Right: Donation Form */}
          <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl shadow-primary/5">
            
            {/* Mobile App Header style fallback */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex-1 text-center">Donate</h2>
            </div>

            {/* Hero Banner with Gold Gradient from Spec */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#B8860B] flex flex-col justify-end overflow-hidden rounded-2xl min-h-[160px] relative shadow-lg p-6">
                <div className="absolute inset-0 bg-black/5"></div>
                <p className="text-primary tracking-tight text-2xl font-extrabold leading-tight relative z-10">
                  Support Our Mission
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6 text-slate-900">Select Amount</h2>

            {/* Amount Selector Grid with descriptions */}
            <div className="mb-10">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { value: 500, label: 'Starter Impact' },
                  { value: 2000, label: 'Popular Choice' },
                  { value: 5000, label: 'Major Change' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => { setSelectedAmount(item.value); setCustomAmount(''); handlePayment(); }}
                    className={`p-4 px-6 rounded-2xl font-bold flex flex-row items-center justify-between h-16 border-2 transition-all ${
                      selectedAmount === item.value && !customAmount 
                        ? 'bg-primary text-white border-primary shadow-lg' 
                        : 'bg-white text-primary border-primary/10 hover:border-primary/40 text-slate-900'
                    }`}
                  >
                    <span className="text-xl font-black">₹{item.value}</span>
                    <span className={`text-xs font-medium ${selectedAmount === item.value && !customAmount ? 'text-white/80' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
                <div className="relative h-16">
                  <input 
                    type="number"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); if(e.target.value.length >= 3) handlePayment(); }}
                    className="w-full h-full text-center text-xl font-bold rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20 border-2 border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Donor Details */}
            <div className="space-y-4 mb-8">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Donor Information</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={donorDetails.name}
                  onChange={(e) => setDonorDetails({...donorDetails, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={donorDetails.email}
                  onChange={(e) => setDonorDetails({...donorDetails, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Phone Number"
                  value={donorDetails.phone}
                  onChange={(e) => setDonorDetails({...donorDetails, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Payment Methods from Spec */}
            <h3 className="text-slate-900 text-lg font-bold mb-4">Payment Methods</h3>
            <div className="flex flex-col gap-3 mb-10">
              {[
                { title: 'UPI', desc: 'GPay, PhonePe, Paytm', icon: CreditCard },
                { title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
                { title: 'Net Banking', desc: 'All major Indian banks', icon: ShieldCheck }
              ].map((method, idx) => (
                <div 
                  key={idx} 
                  onClick={handlePayment}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-primary/5 rounded-xl border border-primary/5 cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <method.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{method.title}</p>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              ))}
            </div>

            <button 
              onClick={handlePayment}
              className="w-full py-5 rounded-2xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2 bg-primary hover:opacity-90 shadow-xl shadow-primary/20"
            >
              Donate ₹{customAmount || selectedAmount} Now <ChevronRight size={20} />
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              Secure 256-bit SSL encrypted payment
            </p>
          </div>

        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3.5rem] shadow-2xl p-10 text-center space-y-6 overflow-hidden md:max-w-md"
            >
              {/* Gold gradients sidebar bar layouts correctly absolute flawless */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-secondary via-yellow-400 to-amber-600" />
              
              <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-500 mx-auto shadow-inner shadow-amber-200/30">
                <ShieldCheck size={40} className="drop-shadow-sm" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Support Directly</h2>
                <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                  Online payments are temporarily resting. You can still create direct impact by reaching out to our team flawlessly!
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl space-y-3 border border-slate-100 dark:border-slate-800 shadow-inner">
                <p className="font-black text-xl text-slate-800 dark:text-slate-200">Call Us</p>
                <a href={`tel:${contactInfo.phone}`} className="text-2xl font-black text-primary block hover:underline">{contactInfo.phone}</a>
                {contactInfo.phoneAlt && <a href={`tel:${contactInfo.phoneAlt}`} className="text-xl font-bold text-primary/70 block hover:underline">{contactInfo.phoneAlt}</a>}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60" />
                <p className="font-medium text-sm text-slate-400">Email us at</p>
                <a href={`mailto:${contactInfo.email}`} className="font-bold text-slate-700 dark:text-slate-300 hover:underline">{contactInfo.email}</a>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-full btn-primary py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
                >
                  Got It, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donate;
