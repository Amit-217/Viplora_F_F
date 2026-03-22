import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { motion } from 'framer-motion';
import { CreditCard, Users, FolderHeart, TrendingUp, Plus, X, Loader2, Bell, Trash2, CheckSquare } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', message: '', link: '' });
  const [formLoading, setFormLoading] = useState(false);



  const [stats, setStats] = useState([
    { label: 'Total Raised', value: '₹0L', icon: CreditCard, color: 'bg-green-500' },
    { label: 'Active Programs', value: '0', icon: FolderHeart, color: 'bg-blue-500' },
    { label: 'Volunteers', value: '0', icon: Users, color: 'bg-orange-500' },
    { label: 'Monthly Growth', value: '+0%', icon: TrendingUp, color: 'bg-purple-500' },
  ]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [recentVolunteers, setRecentVolunteers] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: statsData } = await api.get('/admin/stats');
      const { data: paymentsData } = await api.get('/admin/payments');
      
      const newStats = stats.map((stat, i) => {
        if (statsData.stats[i]) {
          return { ...stat, value: statsData.stats[i].value };
        }
        return stat;
      });
      setStats(newStats);
      setRecentDonations(paymentsData.slice(0, 4));

      const { data: volData } = await api.get('/volunteer/applications');
      if (volData && Array.isArray(volData)) {
        setRecentVolunteers(volData.filter((v: any) => v.status === 'pending').slice(0, 3));
      }

      const { data: noticesData } = await api.get('/notice');
      setNotices(noticesData);


    } catch (error) {
      console.log('Error fetching dashboard stats', error);
    }
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post('/notice', noticeForm);
      alert('Announcement published & Emails triggered successfully!');
      setIsNoticeModalOpen(false);
      setNoticeForm({ title: '', message: '', link: '' });
      // Refresh list
      const { data } = await api.get('/notice');
      setNotices(data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to post notice');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await api.delete(`/notice/${id}`);
        setNotices(notices.filter(notice => notice._id !== id));
      } catch (err: any) {
        alert('Failed to delete notice');
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsNoticeModalOpen(true)} className="bg-primary hover:bg-opacity-90 text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-primary/20 transition-all">
              <Plus size={18} /> New Notice
            </button>

            {user && (
              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-black shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900 line-clamp-1">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {user.id}</p>
                </div>
              </div>
            )}
          </div>
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

        {/* Published Notices Section */}
        {notices.length > 0 && (
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell className="text-primary" size={20} /> Active Announcements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.map((notice) => (
                <div key={notice._id} className="p-5 rounded-2xl bg-gray-50 flex justify-between items-start gap-3 hover:shadow-md transition-shadow">
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{notice.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{notice.message}</p>
                    {notice.link && (
                      <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline">View link</a>
                    )}
                  </div>
                  <button onClick={() => handleDeleteNotice(notice._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Recent Donations</h3>
            <div className="space-y-4">
              {recentDonations.map((donation, i) => (
                <div key={donation._id || i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {donation.donorDetails?.name ? donation.donorDetails.name.substring(0, 2).toUpperCase() : 'AN'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{donation.donorDetails?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-400">{donation.programId?.title || 'General Fund'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">₹{donation.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Active Volunteer Applications</h3>
            <div className="space-y-4">
              {recentVolunteers.length > 0 ? recentVolunteers.map(vol => (
                <div key={vol._id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                      {vol.fullName ? vol.fullName.charAt(0).toUpperCase() : 'V'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{vol.fullName}</p>
                      <p className="text-xs text-gray-400">{vol.occupation} • {vol.availability}</p>
                    </div>
                  </div>
                  <span className="text-secondary font-bold text-sm uppercase tracking-wider">{vol.status}</span>
                </div>
              )) : (
                <div className="text-center p-4 text-gray-400 font-medium">No pending volunteers found.</div>
              )}
            </div>
          </div>
        </div>

        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsNoticeModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-black text-gray-900">Broadcast Notice</h2>
                <button onClick={() => setIsNoticeModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                  <input type="text" required value={noticeForm.title} onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g., Urgent Meeting Today" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea required value={noticeForm.message} onChange={e => setNoticeForm({ ...noticeForm, message: e.target.value })} rows={4} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Details of the announcement..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Link / URL (Optional)</label>
                  <input type="url" value={noticeForm.link} onChange={e => setNoticeForm({ ...noticeForm, link: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g., https://zoom.us/..." />
                </div>
                <button type="submit" disabled={formLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-opacity-90 transition-all flex justify-center items-center gap-2">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : 'Publish & Email Broadcast'}
                </button>
              </form>
            </motion.div>
          </div>
        )}



      </main>
    </div>
  );
};

export default AdminDashboard;
