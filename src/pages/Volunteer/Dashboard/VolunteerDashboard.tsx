import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { motion } from 'framer-motion';
import { Award, Clock, Calendar, CheckSquare, Star, Download, QrCode } from 'lucide-react';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex-grow">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl shadow-primary/20">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900">Volunteer Portal</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">{user?.name} • ID: {user?.id}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Active Status</span>
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Gold Tier Member</span>
            </div>
          </div>
          
          <div className="bg-primary p-10 rounded-[3rem] text-white shadow-xl shadow-primary/20 w-full md:w-80">
            <Clock className="text-secondary mb-4" size={32} />
            <h3 className="text-5xl font-black mb-2">42</h3>
            <p className="opacity-70 font-bold uppercase tracking-widest text-xs">Total Impact Hours</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CheckSquare className="text-primary" /> Current Assignments
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'Community Outreach', date: 'Mar 20, 2026', status: 'Pending' },
                  { title: 'Data Entry for Farmers', date: 'Mar 22, 2026', status: 'In Progress' }
                ].map((task, i) => (
                  <div key={i} className="group p-6 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 transition-all flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-400 flex items-center gap-2"><Calendar size={14} /> {task.date}</p>
                    </div>
                    <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-primary shadow-sm">{task.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Calendar className="text-primary" /> Upcoming Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Tree Plantation Drive', loc: 'North Park', time: '09:00 AM' },
                  { title: 'Food Distribution', loc: 'City Square', time: '11:30 AM' }
                ].map((event, i) => (
                  <div key={i} className="p-6 rounded-[2rem] border-2 border-gray-50 hover:border-primary/10 transition-all">
                    <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-sm text-gray-500 mb-1">{event.loc}</p>
                    <p className="text-xs font-bold text-primary uppercase">{event.time}</p>
                  </div>
                ))}
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
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                    <Download size={14} /> Download Certificate
                  </button>
                </div>
              </div>
              <Star className="absolute -bottom-10 -right-10 text-primary/5 w-40 h-40" fill="currentColor" />
            </div>

            <div className="bg-gradient-to-br from-secondary to-orange-600 p-10 rounded-[3rem] text-white shadow-xl shadow-secondary/20">
              <h4 className="text-xl font-black mb-4 leading-tight">Help us grow our community!</h4>
              <p className="text-sm opacity-80 mb-6 font-medium">Refer a friend to volunteer and earn bonus impact badges.</p>
              <button className="w-full py-4 bg-white text-secondary rounded-2xl font-bold text-sm hover:scale-105 transition-all">
                Share Referral Link
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
