import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Calendar, Download, User as UserIcon, ShieldCheck } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data } = await api.get('/donations/user');
      setDonations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Hello, {user?.name}!</h1>
            <p className="text-gray-500 font-medium">Thank you for being a part of VIPLORA Foundation.</p>
          </div>
          <div className="bg-white px-8 py-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold">
              {user?.id.split('-')[1]}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Donor ID</p>
              <p className="font-bold text-gray-900">{user?.id}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-primary p-8 rounded-[3rem] text-white shadow-xl shadow-primary/20">
              <Heart className="mb-6 text-secondary" fill="currentColor" size={32} />
              <h3 className="text-4xl font-black mb-2">₹12,500</h3>
              <p className="opacity-80 font-medium">Total Contribution</p>
            </motion.div>
            
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> Profile Security
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Email Verified</span>
                  <span className="text-green-600 font-bold">Verified</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Account Role</span>
                  <span className="text-primary font-bold uppercase">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Recent Donations</h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="px-8 py-6">Campaign</th>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6">Amount</th>
                      <th className="px-8 py-6 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {donations.length > 0 ? donations.map((donation: any) => (
                      <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6 font-bold text-gray-900">Education Fund</td>
                        <td className="px-8 py-6 text-gray-500 text-sm">Mar 15, 2026</td>
                        <td className="px-8 py-6 font-bold text-primary">₹5,000</td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-all">
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                          No donations recorded yet. Start your impact journey today!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
