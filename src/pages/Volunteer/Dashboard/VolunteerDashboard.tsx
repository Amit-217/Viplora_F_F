import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Award, Clock, Calendar, CheckSquare, Star, Download, QrCode, BookOpen, ArrowRight, Bell, X, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import logoImg from '../../../assets/logo.png';
import signatureImg from '../../../assets/signature.png';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [blogCount, setBlogCount] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certType, setCertType] = useState<'general' | 'assignment' | 'event'>('general');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const handleDownloadCertificate = async () => {
    try {
      const element = document.getElementById('certificate-canvas');
      if (!element) return;
      const dataUrl = await htmlToImage.toPng(element, { 
        quality: 1.0, 
        pixelRatio: 3 
      });
      
      const pdf = new jsPDF('l', 'mm', 'a4'); 
      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210); 
      pdf.save(`Viplora_Certificate_${user?.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err: any) {
      console.error(err);
      alert("Failed to download certificate: " + err.message);
    }
  };

  const hasCompleted = activities.some((a: any) => a.status === 'completed' || a.type === 'event');

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const { data } = await api.get('/blog');
        const myBlogs = data.filter((b: any) => b.authorId === user?.id || b.author === user?.name);
        setBlogCount(myBlogs.length);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchNotices = async () => {
      try {
        const { data } = await api.get('/notice');
        setNotices(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchActivities = async () => {
      try {
        const { data } = await api.get('/activities');
        setActivities(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchBlogCount();
      fetchNotices();
      fetchActivities();
    }
  }, [user]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-stretch gap-6">
          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-gray-100 flex-grow">
            <div className="flex items-center gap-4 md:gap-6 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-xl shadow-primary/20">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-gray-900">Volunteer Portal</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm mt-1">{user?.name} • ID: {user?.id && user.id.includes('NaN') ? 'VOL-1234' : user?.id}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Active Status</span>
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Gold Tier Member</span>
            </div>
          </div>
          
          <Link to="/volunteer/blogs" className="bg-primary p-6 md:p-10 rounded-2xl md:rounded-[3rem] text-white shadow-xl shadow-primary/20 w-full md:w-80 flex flex-col justify-center hover:bg-opacity-95 transition-all group">
            <BookOpen className="text-secondary mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-5xl font-black mb-2">{blogCount}</h3>
            <p className="opacity-70 font-bold uppercase tracking-widest text-xs">My Published Blogs</p>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Tasks */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Notice Board */}
            {notices.length > 0 && (
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-[3rem] border border-primary/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Bell className="text-primary animate-bounce" /> Announcement Board
                  </h3>
                </div>
                <div className="space-y-4">
                  {notices.map((notice, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex gap-4 items-start hover:shadow-md transition-shadow">
                      <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                        <Calendar size={20} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900 mb-1">{notice.title}</h4>
                        <p className="text-gray-500 text-sm mb-3">{notice.message}</p>
                        {notice.link && (
                          <a href={notice.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                            Join / View Details <ArrowRight size={14} />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-gray-300 font-medium shrink-0">{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CheckSquare className="text-primary" /> Current Assignments
              </h3>
              <div className="space-y-6">
                {activities.filter((a: any) => a.type === 'assignment').length > 0 ? (
                  activities.filter((a: any) => a.type === 'assignment').map((task: any, i: number) => (
                    <div key={i} className="group p-6 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 transition-all flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{task.title}</h4>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <Calendar size={14} /> {new Date(task.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-primary shadow-sm capitalize">{task.status || 'Pending'}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400 font-medium">No active assignments found.</div>
                )}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Calendar className="text-primary" /> Upcoming Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.filter((a: any) => a.type === 'event').length > 0 ? (
                  activities.filter((a: any) => a.type === 'event').map((event: any, i: number) => (
                    <div key={i} className="p-6 rounded-[2rem] border-2 border-gray-50 hover:border-primary/10 transition-all">
                      <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                      {event.location && <p className="text-sm text-gray-500 mb-1">{event.location}</p>}
                      <p className="text-xs font-bold text-primary uppercase">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-6 text-gray-400 font-medium">No upcoming internal events.</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Certificates */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Award className="text-primary" /> Certificates
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="p-6 rounded-[2rem] bg-accent border border-primary/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <QrCode size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Service Excellence</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Issued Mar 2026</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="w-full py-3 bg-primary hover:bg-opacity-90 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                  >
                    <Download size={14} /> Download Certificate
                  </button>
                </div>
              </div>
              <Star className="absolute -bottom-10 -right-10 text-primary/5 w-40 h-40" fill="currentColor" />
            </div>

            <div className="bg-gradient-to-br from-secondary to-orange-600 p-10 rounded-[3rem] text-white shadow-xl shadow-secondary/20">
              <h4 className="text-xl font-black mb-4 leading-tight">Help us grow our community!</h4>
              <p className="text-sm opacity-80 mb-6 font-medium">Refer a friend to volunteer and earn bonus impact badges.</p>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('https://www.viplorafoundation.in/volunteer/apply');
                    alert('Link copied to clipboard!');
                  }} 
                  className="w-full py-3 bg-white text-secondary rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md"
                >
                  <Copy size={16} /> Copy Link
                </button>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.open('https://api.whatsapp.com/send?text=Join%20me%20as%20a%20Volunteer%20at%20Viplora%20Foundation!%20Apply%20here:%20https://www.viplorafoundation.in/volunteer/apply', '_blank')}
                    className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://www.viplorafoundation.in/volunteer/apply', '_blank')}
                    className="flex-1 py-3 bg-[#0077B5] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* High-End Certificate Modal */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsCertificateModalOpen(false)} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 flex flex-col items-center">
            
            <button onClick={() => setIsCertificateModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-500"><X size={20} /></button>
            
            <div className="mb-6 w-full max-w-lg flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Award Category</label>
                <select value={certType} onChange={e => { setCertType(e.target.value as any); setSelectedActivity(null); }} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-gray-800 cursor-pointer shadow-sm">
                  <option value="general">🌸 General Contribution</option>
                  <option value="assignment">📋 Internal Task Completion</option>
                  <option value="event">🎉 Event Participation</option>
                </select>
              </div>

              {certType !== 'general' && (
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Select Specific Title</label>
                  <select onChange={e => setSelectedActivity(activities.find(a => a._id === e.target.value))} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-gray-800 cursor-pointer shadow-sm">
                    <option value="">-- Overall Category --</option>
                    {activities.filter((a: any) => a.type === certType).map((act: any) => (
                      <option key={act._id} value={act._id}>{act.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Certificate Canvas Frame */}
            <div className="w-full overflow-x-auto border border-gray-100 rounded-xl p-2 bg-gray-50 flex justify-start md:justify-center">
              <div id="certificate-canvas" style={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', minWidth: '780px' }} className="aspect-[1.414] border-2 p-12 flex flex-col items-center justify-center relative rounded-xl text-center overflow-hidden shadow-sm">
              <div style={{ borderColor: '#1E293B' }} className="absolute inset-6 border-2 m-2 pointer-events-none" />
              <div style={{ borderColor: '#E2E8F0' }} className="absolute inset-6 border m-4 pointer-events-none" />
              
              <img src={logoImg} className="w-14 h-14 object-contain mb-2 mix-blend-multiply" alt="Viplora Logo" />
              
              <div style={{ backgroundColor: '#F3F4F6', color: '#4B5563', borderColor: '#E5E7EB' }} className="text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-gray-200">
                {certType.replace('general', 'General').replace('assignment', 'Task').replace('event', 'Event')} Verification
              </div>

              <h2 className="text-4xl font-serif text-[#1E293B] font-bold tracking-tight mb-1">
                {certType === 'general' ? 'Certificate of Appreciation' : certType === 'assignment' ? 'Certificate of Completion' : 'Certificate of Participation'}
              </h2>
              <p className="text-base text-[#1E293B] font-black uppercase tracking-widest mb-10">Viplora Foundation</p>
              
              <p style={{ color: '#6B7280' }} className="text-sm font-sans italic mb-4">This is to certify that</p>
              
              <h1 style={{ color: '#1E293B', borderBottomColor: 'rgba(30, 41, 59, 0.2)' }} className="text-5xl font-serif font-bold border-b-2 pb-2 mb-6 px-12 capitalize tracking-normal">{user?.name}</h1>
              
              <div style={{ color: '#6B7280' }} className="text-sm max-w-lg leading-relaxed mb-12 font-sans px-6 font-medium">
                {certType === 'general' && 'has demonstrated outstanding dedication and selfless service contributing to the core social enhancement initiatives.'}
                {certType === 'assignment' && (
                  <span>has successfully completed {selectedActivity ? <span>the task <strong className="text-gray-800">"{selectedActivity.title}"</strong></span> : 'multiple internal assignments'} with exceptional commitment inside framework coordinates.</span>
                )}
                {certType === 'event' && (
                  <span>has actively participated and contributed during {selectedActivity ? <span>the event <strong className="text-gray-800">"{selectedActivity.title}"</strong></span> : 'the foundation gatherings'} supporting continuous community growth.</span>
                )}
              </div>
              
              <div className="flex justify-between w-full px-24 mt-4 relative z-10">
                <div className="text-center">
                  <div className="w-32 border-b border-gray-300 mx-auto mb-1 relative">
                    <img src={signatureImg} className="absolute -top-10 left-1/2 -translate-x-1/2 h-14 mix-blend-multiply opacity-95 select-none pointer-events-none" alt="Signature" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">Amit Chandure</p>
                  <p style={{ color: '#9CA3AF' }} className="text-[9px] font-bold uppercase tracking-wide">Founder, Viplora Foundation</p>
                </div>
                
                <div className="text-center flex flex-col justify-end">
                  <div className="w-32 border-b border-gray-300 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
                  <p style={{ color: '#9CA3AF' }} className="text-[9px] font-bold uppercase tracking-wide">ISSUE DATE</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 flex flex-col items-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://www.viplorafoundation.in" style={{ borderColor: '#E5E7EB', backgroundColor: '#ffffff' }} className="w-12 h-12 object-contain mb-1 shadow-sm p-1 border" alt="QR" />
                <p style={{ color: '#9CA3AF' }} className="text-[6px] font-bold tracking-widest uppercase">Verify</p>
              </div>

              <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-[#1E293B]" />
              <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-[#1E293B]" />
              <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-[#1E293B]" />
              <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-[#1E293B]" />
              <div style={{ backgroundColor: '#CFB53B', color: '#ffffff' }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold px-4 py-1.5 rounded-full tracking-widest">VERIFIED DIGITAL AWARD</div>
              </div>
            </div>

            <button onClick={handleDownloadCertificate} className="w-full mt-6 py-4 bg-[#CFB53B] hover:bg-[#B59C31] text-white rounded-2xl font-black shadow-xl shadow-[#CFB53B]/30 hover:shadow-[#CFB53B]/50 transition-all flex justify-center items-center gap-2 text-base">
              <Download size={20} className="animate-bounce" /> Get PDF Certificate
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
