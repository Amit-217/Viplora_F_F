import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
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
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Programs</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/programs/education" className="hover:text-primary transition-colors">Child Education</Link></li>
              <li><Link to="/programs/water" className="hover:text-primary transition-colors">Safe Water</Link></li>
              <li><Link to="/programs/health" className="hover:text-primary transition-colors">Health Care</Link></li>
              <li><Link to="/programs/farmers" className="hover:text-primary transition-colors">Farmer Support</Link></li>
              <li><Link to="/programs/environment" className="hover:text-primary transition-colors">Environment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <MapPin className="text-primary shrink-0" />
                <span>123 NGO Street, Hope City, IND</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-primary shrink-0" />
                <span>info@viplora.org</span>
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
