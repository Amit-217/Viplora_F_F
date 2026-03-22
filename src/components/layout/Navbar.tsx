import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Home, Info, Layers, HandHeart, FileText, Images, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const baseLinks = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'About', 
      path: '/about',
      icon: Info,
      subLinks: [
        { name: 'Vision & Mission', path: '/about/vision' },
        { name: 'Our Story', path: '/about/story' },
        { name: 'Team', path: '/about/team' },
        { name: 'Transparency', path: '/about/transparency' },
      ]
    },
    { name: 'Programs', path: '/programs', icon: Layers },
    { name: 'Volunteer', path: '/volunteer/apply', icon: HandHeart },
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Gallery', path: '/gallery', icon: Images },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const navLinks = [
    ...baseLinks,
    ...(user ? [
      user.role === 'admin' 
        ? { name: 'Admin', path: '/admin', icon: Layers } 
        : user.role === 'volunteer' 
          ? { name: 'Dashboard', path: '/volunteer/dashboard', icon: Layers } 
          : { name: 'Dashboard', path: '/dashboard', icon: Layers }
    ] : [])
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-[120] transition-all duration-300 bg-white/70 backdrop-filter backdrop-blur-xl shadow-2xl border-b border-slate-200 py-4" style={{ backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-[52px] h-[52px] bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform duration-300 overflow-hidden border border-gray-100">
                <img src="/logo.png" className="w-full h-full object-contain p-1" alt="Viplora Foundation Logo" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter leading-none text-slate-900 dark:text-white`}>
                VIPLORA
              </span>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-relaxed text-orange-500`}>
                Foundation
              </span>
              <span className={`text-[8px] font-bold tracking-wider mt-0.5 text-slate-500 dark:text-slate-400`}>
                For People Planet Purpose
              </span>
            </div>
          </Link>

          {/* Desktop Links (Hidden on Tablet/Mobile) */}
          <div className="hidden xl:flex items-center gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 transition-all text-slate-800 dark:text-white hover:text-primary`}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {link.subLinks && activeDropdown === link.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-3xl py-4 mt-4 border border-gray-50 overflow-hidden"
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-8 py-3.5 text-sm font-bold text-gray-600 hover:bg-accent hover:text-primary transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-2xl transition-all border border-slate-100 shadow-sm"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-black shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-slate-800">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`transition-transform text-slate-400 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-64 bg-white shadow-2xl rounded-3xl p-5 border border-gray-100 overflow-hidden z-50 text-slate-900"
                    >
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-sm line-clamp-1">{user.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {user.id}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link 
                          to={user.role === 'admin' ? '/admin' : user.role === 'volunteer' ? '/volunteer/dashboard' : '/dashboard'} 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl text-sm font-bold text-gray-700 transition-all"
                        >
                          <Layers size={16} /> My Dashboard
                        </Link>
                        <button 
                          onClick={logout} 
                          className="flex items-center gap-2 w-full p-2 hover:bg-red-50 rounded-xl text-sm font-bold text-red-600 transition-all"
                        >
                          <X size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/auth/login" 
                className="btn-secondary font-bold text-sm uppercase tracking-widest"
              >
                Portal
              </Link>
            )}
            <Link to="/donate" className="btn-primary font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
          </div>

          {/* Mobile Menu Toggle (Visible on lg and below) */}
          <div className="xl:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-3 rounded-2xl transition-all bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-md`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white lg:hidden z-[105]"
            />
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full min-h-screen w-[75%] max-w-md z-[110] bg-white text-slate-900 lg:hidden flex flex-col shadow-2xl border-r border-slate-100 rounded-r-3xl overflow-hidden"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-white sticky top-0 z-[111] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-100">
                    <img src="/logo.png" className="w-full h-full object-cover scale-110" alt="Viplora Foundation Logo" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">Viplora</p>
                    <p className="text-xs font-semibold text-slate-500">Foundation</p>
                  </div>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-700 hover:bg-slate-200"><X size={24} /></button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-3">
                    {link.subLinks ? (
                      <button
                        type="button"
                        onClick={() => setMobileOpen(mobileOpen === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between gap-3 text-xl font-black transition-colors px-3 py-2 rounded-2xl ${
                          location.pathname.startsWith(link.path) 
                            ? 'bg-primary/10 text-primary shadow-lg shadow-primary/20' 
                            : 'text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {link.icon ? <link.icon size={20} className="text-primary/80" /> : null}
                          {link.name}
                        </span>
                        <ChevronDown size={18} className={`transition-transform ${mobileOpen === link.name ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 text-xl font-black transition-colors px-3 py-2 rounded-2xl ${
                          location.pathname === link.path 
                            ? 'bg-primary/10 text-primary shadow-lg shadow-primary/20' 
                            : 'text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {link.icon ? <link.icon size={20} className="text-primary/80" /> : null}
                        {link.name}
                      </Link>
                    )}
                    {link.subLinks && mobileOpen === link.name && (
                      <div className="pl-6 border-l-4 border-slate-200 space-y-1">
                        {link.subLinks.map((sub) => {
                          const active = location.pathname === sub.path;
                          return (
                            <Link 
                              key={sub.name} 
                              to={sub.path} 
                              onClick={() => setIsMenuOpen(false)}
                              className={`block text-base font-semibold transition-colors ${
                                active ? 'text-primary' : 'text-slate-700 hover:text-primary'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 p-6 grid grid-cols-2 gap-3 bg-white">
                {user ? (
                  <button
                    onClick={logout}
                    className="btn-secondary text-center font-bold text-sm uppercase tracking-widest"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/auth/login"
                    className="btn-secondary text-center font-bold text-sm uppercase tracking-widest"
                  >
                    Portal
                  </Link>
                )}
                <Link
                  to="/donate"
                  className="btn-primary text-center font-black text-sm uppercase tracking-widest"
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
