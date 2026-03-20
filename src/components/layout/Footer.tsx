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
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
              <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Programs</h3>
            <ul className="space-y-4 text-gray-400">
              {programLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
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
                <div className="space-y-1">
                  {[contactInfo.email, contactInfo.emailAlt].filter(Boolean).map((mail) => (
                    <a 
                      key={mail}
                      href={`mailto:${mail}`} 
                      className="hover:text-primary transition-colors block"
                    >
                      {mail}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Viplora Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
