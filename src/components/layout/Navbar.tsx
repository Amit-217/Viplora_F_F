import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
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
      subLinks: [
        { name: 'All Programs', path: '/programs' },
        { name: 'Education', path: '/programs/education' },
        { name: 'Food Security', path: '/programs/food' },
        { name: 'Clean Water', path: '/programs/water' },
        { name: 'Environment', path: '/programs/environment' },
      ]
    },
    { name: 'Volunteer', path: '/volunteer/apply' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-2xl py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-[52px] h-[52px] bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform duration-300 overflow-hidden border border-gray-100">
                <img src="/logo.png" className="w-full h-full object-cover scale-110" alt="Viplora Foundation Logo" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                VIPLORA
              </span>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-relaxed ${isScrolled ? 'text-primary' : 'text-secondary'}`}>
                Foundation
              </span>
              <span className={`text-[8px] font-bold tracking-wider mt-0.5 ${isScrolled ? 'text-slate-500' : 'text-white/80'}`}>
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
                  className={`font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 transition-all hover:text-secondary ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
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
            <Link 
              to="/auth/login" 
              className={`font-bold text-sm uppercase tracking-widest px-6 py-2 rounded-full transition-all ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
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
              className={`p-3 rounded-2xl transition-all ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white backdrop-blur-md'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white lg:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-50">
              <span className="text-2xl font-black text-primary">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50 rounded-2xl"><X size={24} /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-4">
                  <Link
                    to={link.path}
                    className="text-4xl font-black text-gray-900 hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <div className="pl-6 border-l-4 border-accent space-y-4">
                      {link.subLinks.map((sub) => (
                        <Link key={sub.name} to={sub.path} className="block text-lg font-bold text-gray-400 hover:text-secondary">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-gray-50 gap-4 flex flex-col">
              <Link to="/donate" className="w-full bg-primary text-white py-6 rounded-[2rem] text-center font-black text-xl shadow-2xl shadow-primary/20">
                Donate Now
              </Link>
              <div className="flex gap-4">
                <Link to="/auth/login" className="flex-grow bg-gray-100 text-gray-900 py-5 rounded-[2rem] text-center font-bold">Login</Link>
                <Link to="/auth/register" className="flex-grow bg-gray-100 text-gray-900 py-5 rounded-[2rem] text-center font-bold">Register</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
