import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderHeart, Users, CreditCard, BookOpen, Image as ImageIcon, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Programs', path: '/admin/programs', icon: FolderHeart },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    { name: 'Donations', path: '/admin/donations', icon: CreditCard },
    { name: 'Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-gray-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 text-xl">V</div>
        <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase">Viplora</span>
      </div>

      <nav className="flex-grow p-6 space-y-3 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-primary'
            }`}
          >
            <item.icon size={20} strokeWidth={3} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} strokeWidth={3} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 bg-white border-r border-gray-100 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[60] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
          <span className="font-black text-xl tracking-tighter text-gray-900">ADMIN</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-3 bg-gray-50 rounded-xl">
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white"
            >
              <SidebarContent />
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full">
                <X size={20} />
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
