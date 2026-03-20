import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, CreditCard, User, Mail, Phone, ChevronRight } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    toast.error(`Payments are temporarily unavailable. Please contact ${contactInfo.phone} or ${contactInfo.email} to donate.`, { duration: 6000 });
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
                    onClick={() => { setSelectedAmount(item.value); setCustomAmount(''); }}
                    className={`p-6 rounded-2xl font-bold flex flex-col items-center justify-center gap-1 aspect-square border-2 transition-all ${
                      selectedAmount === item.value && !customAmount 
                        ? 'bg-primary text-white border-primary shadow-lg' 
                        : 'bg-white text-primary border-primary/10 hover:border-primary/40 text-slate-900'
                    }`}
                  >
                    <span className="text-2xl font-black">₹{item.value}</span>
                    <span className={`text-xs font-medium ${selectedAmount === item.value && !customAmount ? 'text-white/80' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
                <div className="relative aspect-square">
                  <input 
                    type="number"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
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
              disabled={loading || !donorDetails.name || !donorDetails.email}
              className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-400' : 'bg-primary hover:opacity-90 shadow-xl shadow-primary/20'
              }`}
            >
              {loading ? 'Processing...' : `Donate ₹${customAmount || selectedAmount} Now`} <ChevronRight size={20} />
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              Secure 256-bit SSL encrypted payment
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donate;
