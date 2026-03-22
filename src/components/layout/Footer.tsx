import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import api from '../../services/api';
import { contactInfo } from '../../config/contactInfo';

const programsFallback = [
  { name: 'Child Education', path: '/programs/education' },
  { name: 'Safe Water', path: '/programs/water' },
  { name: 'Health Care', path: '/programs/health' },
  { name: 'Farmer Support', path: '/programs/farmers' },
  { name: 'Environment', path: '/programs/environment' },
];

type ProgramLink = { name: string; path: string };

const Footer = () => {
  const [programLinks, setProgramLinks] = useState<ProgramLink[]>(programsFallback);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const { data } = await api.get('/programs');
        if (Array.isArray(data) && data.length) {
          const links = data.slice(0, 5).map((p: any) => ({
            name: p.title || p.name || 'Program',
            path: `/programs/${p.slug || p._id || ''}`,
          }));
          setProgramLinks(links);
        }
      } catch {
        setProgramLinks(programsFallback);
      }
    };
    loadPrograms();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-gray-800">
                <img src="/logo.png" className="w-full h-full object-cover scale-110" alt="Viplora Foundation Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none text-white">VIPLORA</span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-secondary leading-relaxed">Foundation</span>
                <span className="text-[7px] font-medium tracking-wide text-gray-400">For People Planet Purpose</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Empowering marginalized communities through sustainable health, education, and livelihood programs.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ViploraFoundation" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/Viplora_Purpose" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/viplorafoundation?igsh=MTNka2VibGFzaTQ5dg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/viplora-foundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://wa.me/917620837934" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.5 0 101.7-82.8 184.5-184.6 184.5zm101.3-138.3c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.6-30.7-38.2-3.2-5.6-.4-8.6 2.4-11.4 2.6-2.6 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7 .9-7-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-11-9.1-9.5-12.5-9.7-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.2 31.7 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pl-5 md:pl-0">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-primary transition-colors">Our Programs</Link></li>
              <li><Link to="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
              <li><Link to="/donate" className="hover:text-primary transition-colors">Donate Now</Link></li>
              <li>
                <a 
                  href={contactInfo.contactUrl} 
                  className="hover:text-primary transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* User Portals */}
          <div className="pl-5 md:pl-0">
            <h3 className="text-xl font-bold mb-6">Access Portals</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
              <li><Link to="/auth/login" className="hover:text-primary transition-colors">Volunteer Login</Link></li>
              <li><Link to="/auth/login" className="hover:text-primary transition-colors">Donor Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="pl-5 md:pl-0">
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <MapPin className="text-primary shrink-0" />
                <a 
                  href={contactInfo.contactUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="text-primary shrink-0" />
                <div className="space-y-1">
                  {[contactInfo.phone, contactInfo.phoneAlt].filter(Boolean).map((num) => (
                    <a 
                      key={num}
                      href={`tel:${num.replace(/\\s+/g, '')}`} 
                      className="hover:text-primary transition-colors block"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="text-primary shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; 2026 Viplora Foundation. All rights reserved. | Developed by{' '}
            <a href="https://www.viplora.tech" target="_blank" rel="noopener noreferrer" className="hover:underline text-white font-medium hover:text-primary transition-colors">
              Viplora Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
