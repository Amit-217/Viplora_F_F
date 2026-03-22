import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, Clock, LogOut, RefreshCw } from 'lucide-react';

const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    return null;
  }
};

const SessionTimeoutModal = () => {
  const { user, token, login, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 minutes countdown
  const countdownIntervalRef = useRef<any>(null);
  const checkIntervalRef = useRef<any>(null);

  useEffect(() => {
    // 1. Only track for logged-in Admin or Volunteer
    if (!user || !token) {
      setShowModal(false);
      return;
    }
    
    if (user.role !== 'admin' && user.role !== 'volunteer') {
      setShowModal(false);
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return;

    // Periodically check if token is about to expire
    const checkExpiry = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - currentTime; // in seconds

      // Show warning 2 minutes (120s) before token expires
      if (timeLeft <= 120 && timeLeft > 0 && !showModal) {
        setShowModal(true);
        setSecondsLeft(timeLeft);
      }
    };

    checkIntervalRef.current = setInterval(checkExpiry, 1000);

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [user, token, showModal]);

  // Countdown timer logic when modal is open
  useEffect(() => {
    if (showModal) {
      countdownIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [showModal]);

  const handleLogout = () => {
    setShowModal(false);
    logout();
    window.location.href = '/auth/login';
  };

  const handleContinue = async () => {
    try {
      // Import api dynamically to avoid circular references if any
      const api = (await import('../../services/api')).default; 
      const { data } = await api.post('/auth/refresh-token');
      
      if (data.token) {
        login(data.token, user); // Update token inside context
        setShowModal(false);     // Close Modal
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error("Failed to refresh token", err);
      handleLogout();
    }
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-orange-100 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-5">
            <AlertTriangle size={32} className="animate-pulse" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Session Inactive!</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            You have been inactive for a while. For your security, we will log you out soon.
          </p>

          <div className="bg-gray-50 flex items-center gap-3 px-5 py-3 rounded-2xl mb-8 border border-gray-100">
            <Clock size={20} className="text-orange-500" />
            <span className="font-bold text-gray-800 text-lg">
              Logging out in {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleLogout}
              className="flex-1 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-5 py-3 bg-primary hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Continue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SessionTimeoutModal;
