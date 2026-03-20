import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { motion } from 'framer-motion';
import { CreditCard, Search } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface Donation {
  _id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
  donorDetails?: {
    name: string;
    email: string;
  };
  programId?: {
    title: string;
  };
}

const ManageDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data } = await api.get('/admin/payments');
      setDonations(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(d => 
    d.donorDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
            <p className="text-gray-500">Track and manage all system transactions</p>
          </div>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by Donor Name or Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Date</th>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Donor</th>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Program</th>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Amount</th>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Order ID</th>
                  <th className="py-5 px-6 font-bold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400">Loading payments...</td>
                  </tr>
                ) : filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400">No payment history found.</td>
                  </tr>
                ) : (
                  filteredDonations.map((donation) => (
                    <motion.tr 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      key={donation._id} 
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">{new Date(donation.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{donation.donorDetails?.name || 'Anonymous'}</td>
                      <td className="py-4 px-6">{donation.programId?.title || 'General Fund'}</td>
                      <td className="py-4 px-6 font-bold text-green-600">₹{(donation.amount || 0).toLocaleString()}</td>
                      <td className="py-4 px-6 text-xs font-mono">{donation.orderId}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          donation.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageDonations;
