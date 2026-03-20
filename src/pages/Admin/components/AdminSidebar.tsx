import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderHeart, Users, CreditCard, BookOpen, Image as ImageIcon, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Programs', path: '/admin/programs', icon: FolderHeart },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    { name: 'Donations', path: '/admin/donations', icon: CreditCard },
    { name: 'Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Admins', path: '/admin/manage-admins', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      <div className={`p-8 border-b border-gray-50 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all`}>
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 text-xl shrink-0">V</div>
        {!isCollapsed && <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase whitespace-nowrap">Viplora</span>}
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap group ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-primary'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon size={22} strokeWidth={3} className="shrink-0" />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button 
          onClick={logout}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-sm uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all whitespace-nowrap ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={22} strokeWidth={3} className="shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
      
      {/* Collapse button for desktop */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-100 rounded-full items-center justify-center shadow-md text-gray-500 hover:text-primary transition-colors z-10"
      >
        <ChevronRight size={14} className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block ${isCollapsed ? 'w-24' : 'w-72'} bg-white border-r border-gray-100 shadow-lg sticky top-0 h-screen transition-all duration-300 z-[110] shrink-0 overflow-y-auto`}>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[130] flex items-center justify-between px-6">
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
          <div className="fixed inset-0 z-[140] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="absolute inset-0 bg-white/90" 
            />
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto border-r border-gray-100"
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
