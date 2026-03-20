import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Check, X, User, Phone, Mail, Briefcase, Clock, Loader2 } from 'lucide-react';

const ManageVolunteers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/volunteer/applications');
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/volunteer/applications/${id}/status`, { status });
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Management</h1>
          <p className="text-gray-500">Review and approve applications to join your mission.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="space-y-6">
            {applications.length > 0 ? applications.map((app: any) => (
              <motion.div 
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-8"
              >
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent text-primary rounded-2xl flex items-center justify-center font-bold">
                        {app.fullName?.charAt(0) || 'V'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{app.fullName || 'Anonymous Volunteer'}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          app.status === 'approved' ? 'bg-green-100 text-green-600' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Mail size={16} /> {app.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Phone size={16} /> {app.phone}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <Briefcase size={16} /> Background
                    </div>
                    <p className="text-gray-700 font-medium">{app.occupation}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 capitalize">
                      <Clock size={16} /> Availability: <span className="font-bold text-gray-900">{app.availability}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <User size={16} /> Motivation
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-3">"{app.reason}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col justify-center gap-3">
                  {app.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'approved')}
                        className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 transition-all"
                      >
                        <Check size={24} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        className="p-4 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/20 hover:scale-110 transition-all"
                      >
                        <X size={24} />
                      </button>
                    </>
                  )}
                  {app.status !== 'pending' && (
                    <div className="p-4 bg-gray-50 text-gray-400 rounded-2xl font-bold text-xs uppercase vertical-lr">
                      Processed
                    </div>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold text-xl">No volunteer applications found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageVolunteers;
