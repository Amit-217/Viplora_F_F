import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, User, Phone, Mail, Briefcase, Clock, Loader2, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageVolunteers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'volunteers'>('applications');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingApp, setViewingApp] = useState<any>(null); // For details popup
  const [editingApp, setEditingApp] = useState<any>(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [formLoading, setFormLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      fetchApplications(1);
    } else {
      setCurrentPage(1);
    }
  }, [activeTab]);

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    setApplications([]); // Clear old list to prevent visual flash
    try {
      const type = activeTab === 'applications' ? 'applications' : 'approved';
      const { data } = await api.get(`/volunteer/applications?page=${page}&limit=25&status=${type}`);
      
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(`${id}-${status}`);
    try {
      await api.patch(`/volunteer/applications/${id}/status`, { status });
      // Optimistic Update
      setApplications((prev: any) => prev.map((app: any) => app._id === id ? { ...app, status } : app));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application/volunteer? This action cannot be undone.')) {
      try {
        await api.delete(`/volunteer/applications/${id}`);
        fetchApplications();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (app: any) => {
    setEditingApp(app);
    setValue('fullName', app.fullName);
    setValue('phone', app.phone);
    setValue('occupation', app.occupation);
    setValue('skills', app.skills);
    setValue('availability', app.availability);
    setValue('reason', app.reason);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      await api.put(`/volunteer/applications/${editingApp._id}`, data);
      setIsModalOpen(false);
      reset();
      setEditingApp(null);
      fetchApplications();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // With backend pagination, applications are already filtered and sliced correctly
  const paginatedApplications = applications;
  const filteredApplications = applications;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Management</h1>
            <p className="text-gray-500">Review applications and manage approved volunteers.</p>
          </div>
          
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'applications' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Applications
            </button>
            <button 
              onClick={() => setActiveTab('volunteers')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'volunteers' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Approved Volunteers
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
        ) : (
          <div className="space-y-6">
            {paginatedApplications.length > 0 ? (
              activeTab === 'applications' ? (
                // CARDS VIEW FOR APPLICATIONS
                <div className="space-y-6">
                  {paginatedApplications.map((app: any) => (
                    <motion.div 
                      key={app._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 flex flex-col md:flex-row justify-between items-center gap-6 cursor-pointer hover:shadow-lg hover:border-primary/10 transition-all duration-300"
                      onClick={() => setViewingApp(app)}
                    >
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center font-bold">
                              {app.fullName?.charAt(0) || 'V'}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{app.fullName || 'Anonymous'}</h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500"><Mail size={15} className="opacity-70" /> {app.email}</div>
                          <div className="flex items-center gap-3 text-sm text-gray-500"><Phone size={15} className="opacity-70" /> {app.phone}</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest"><Briefcase size={14} /> Background</div>
                          <p className="text-gray-700 font-semibold text-sm">{app.occupation}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 capitalize"><Clock size={14} className="opacity-70" /> {app.availability}</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest"><User size={14} /> Motivation</div>
                          <p className="text-gray-600 text-sm italic line-clamp-2 leading-relaxed">"{app.reason}"</p>
                        </div>
                      </div>

                      <div className="flex md:flex-col justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'approved')} 
                              disabled={!!updatingId}
                              className="p-2.5 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-xl transition-all disabled:opacity-50" 
                              title="Approve"
                            >
                              {updatingId === `${app._id}-approved` ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'rejected')} 
                              disabled={!!updatingId}
                              className="p-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl transition-all disabled:opacity-50" 
                              title="Reject"
                            >
                              {updatingId === `${app._id}-rejected` ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
                            </button>
                          </>
                        )}
                        <button onClick={() => handleEdit(app)} className="p-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all" title="Edit"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(app._id)} className="p-2.5 bg-gray-50 hover:bg-gray-800 text-gray-700 hover:text-white rounded-xl transition-all" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // TABLE VIEW FOR APPROVED VOLUNTEERS
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <th className="px-8 py-6">ID</th>
                        <th className="px-8 py-6">Name</th>
                        <th className="px-8 py-6">Mobile No</th>
                        <th className="px-8 py-6">Location</th>
                        <th className="px-8 py-6">Availability</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginatedApplications.map((app: any) => (
                        <tr 
                          key={app._id} 
                          className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                          onClick={() => setViewingApp(app)}
                        >
                          <td className="px-8 py-6">
                            <span className="font-bold text-primary text-sm">{app.userId?.customId || 'N/A'}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                                {app.fullName?.charAt(0) || 'V'}
                              </div>
                              <span className="font-bold text-gray-900">{app.fullName}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-gray-600 font-medium">{app.phone || 'N/A'}</td>
                          <td className="px-8 py-6 text-gray-600">{app.location || 'N/A'}</td>
                          <td className="px-8 py-6 capitalize text-gray-600">{app.availability}</td>
                          <td className="px-8 py-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleEdit(app)} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit size={18} /></button>
                            <button onClick={() => handleDelete(app._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold text-xl">No profiles found in this section</p>
              </div>
            )}

            {/* Arrow Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-600 disabled:opacity-40 hover:bg-gray-50 flex items-center justify-center w-12 h-12 transition-all disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-50 shadow-sm">
                Page <span className="text-primary">{currentPage}</span> of {totalPages}
              </div>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-600 disabled:opacity-40 hover:bg-gray-50 flex items-center justify-center w-12 h-12 transition-all disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* DETAILS READ-ONLY MODAL */}
        <AnimatePresence>
          {viewingApp && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingApp(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-900 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-lg">
                      {viewingApp.fullName?.charAt(0) || 'V'}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{viewingApp.fullName}</h2>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{viewingApp.status}</span>
                    </div>
                  </div>
                  <button onClick={() => setViewingApp(null)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                </div>

                <div className="p-10 space-y-6 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</span>
                      <span className="font-bold text-gray-800 break-all">{viewingApp.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</span>
                      <span className="font-bold text-gray-800">{viewingApp.phone}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Occupation</span>
                      <span className="font-bold text-gray-800 capitalize">{viewingApp.occupation}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</span>
                      <span className="font-bold text-gray-800 capitalize">{viewingApp.location || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</span>
                      <span className="font-bold text-primary capitalize">{viewingApp.availability}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skills</span>
                      <span className="font-bold text-gray-800">{viewingApp.skills || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Motivation / Reason</span>
                    <p className="p-6 bg-accent/30 rounded-2xl text-gray-700 italic border border-accent/20 leading-relaxed">
                      "{viewingApp.reason}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-primary text-white">
                  <h2 className="text-2xl font-bold">Edit Application Details</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-6 overflow-y-auto">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input {...register('fullName', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                      <input {...register('phone')} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Occupation</label>
                      <input {...register('occupation')} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Skills</label>
                    <input {...register('skills')} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Teaching, Cooking" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Availability</label>
                    <select {...register('availability')} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Reason / Motivation</label>
                    <textarea {...register('reason')} rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                    <button type="submit" disabled={formLoading} className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-opacity-90 transition-all">
                      {formLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ManageVolunteers;
