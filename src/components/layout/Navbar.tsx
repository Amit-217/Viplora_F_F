import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Home, Info, Layers, HandHeart, FileText, Images, Phone, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
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

  const navLinks = [
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
    { 
      name: 'Programs', 
      path: '/programs',
      icon: Layers,
      subLinks: [
        { name: 'All Programs', path: '/programs' },
        { name: 'Education', path: '/programs/education' },
        { name: 'Food Security', path: '/programs/food' },
        { name: 'Clean Water', path: '/programs/water' },
        { name: 'Environment', path: '/programs/environment' },
      ]
    },
    { name: 'Volunteer', path: '/volunteer/apply', icon: HandHeart },
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Gallery', path: '/gallery', icon: Images },
    // Use internal SPA route so dev server localhost and production both work
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'Donate', path: '/donate', icon: Heart },
    { name: 'Login', path: '/auth/login', icon: LogIn },
    { name: 'Register', path: '/auth/register', icon: UserPlus },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-[120] transition-all duration-300 bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-100 py-4">
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
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 transition-all text-slate-800 dark:text-white hover:text-primary"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 transition-all text-slate-800 dark:text-white hover:text-primary`}
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </Link>
                )}

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
            <Link 
              to="/auth/login" 
              className={`font-bold text-sm uppercase tracking-widest px-6 py-2 rounded-full transition-all text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800`}
            >
              Portal
            </Link>
            <Link to="/donate" className="bg-secondary text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-secondary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
          </div>

          {/* Mobile Menu Toggle (Visible on lg and below) */}
          <div className="xl:hidden flex items-center gap-4">
            <Link to="/donate" className="sm:hidden bg-secondary p-3 rounded-xl text-white shadow-lg">
              <Heart size={20} fill="currentColor" />
            </Link>
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
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 text-xl font-black text-slate-900 hover:text-primary transition-colors px-3 py-2 rounded-2xl"
                      >
                        <span className="flex items-center gap-3">
                          {link.icon ? <link.icon size={20} className="text-primary/80" /> : null}
                          {link.name}
                        </span>
                      </a>
                    ) : link.subLinks ? (
                      <button
                        type="button"
                        onClick={() => setMobileOpen(mobileOpen === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between gap-3 text-xl font-black transition-colors px-3 py-2 rounded-2xl ${
                          location.pathname === link.path 
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
