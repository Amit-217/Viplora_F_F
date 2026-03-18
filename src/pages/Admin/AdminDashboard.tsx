import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { motion } from 'framer-motion';
import { CreditCard, Users, FolderHeart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Raised', value: '₹12.5L', icon: CreditCard, color: 'bg-green-500' },
    { label: 'Active Programs', value: '8', icon: FolderHeart, color: 'bg-blue-500' },
    { label: 'Volunteers', value: '142', icon: Users, color: 'bg-orange-500' },
    { label: 'Monthly Growth', value: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6"
            >
              <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Recent Donations</h3>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">JD</div>
                    <div>
                      <p className="font-bold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-400">Education Program</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">₹5,000</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Active Volunteer Applications</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">AS</div>
                    <div>
                      <p className="font-bold text-gray-900">Ankit Sharma</p>
                      <p className="text-xs text-gray-400">Software Skills • Weekends</p>
                    </div>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline">Review</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
