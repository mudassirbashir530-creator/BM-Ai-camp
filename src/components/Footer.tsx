import { Mail, Phone, MapPin } from 'lucide-react';
import { TabVal } from '../types';
import InstituteLogo from './InstituteLogo';

interface FooterProps {
  setActiveTab: (tab: TabVal) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = 2026; // As per the PRD metadata

  const handleNavClick = (tab: TabVal) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-navy text-white/80 border-t border-border/10 pt-16 pb-12 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-border/10 pb-12 mb-12">
          
          {/* Col 1: Institute Brand block */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <InstituteLogo theme="white" className="h-14 w-auto object-left origin-left" />
              <span className="font-mono text-orange text-lg font-bold">AI Summer Camp 2026</span>
            </div>
            <p className="font-sans text-sm text-white/70 max-w-sm leading-relaxed">
              Empowering students aged 12–18 with zero-code artificial intelligence expertise, workflow automation, and prompt design frameworks.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-white uppercase tracking-wider text-sm">Navigation Hub</h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button onClick={() => handleNavClick('home')} className="text-left text-white/70 hover:text-orange transition-colors cursor-pointer py-1">Home</button>
              <button onClick={() => handleNavClick('schedule')} className="text-left text-white/70 hover:text-orange transition-colors cursor-pointer py-1">Schedule</button>
              <button onClick={() => handleNavClick('resources')} className="text-left text-white/70 hover:text-orange transition-colors cursor-pointer py-1">Resources</button>
              <button onClick={() => handleNavClick('handbook')} className="text-left text-white/70 hover:text-orange transition-colors cursor-pointer py-1">Handbook</button>
              <button onClick={() => handleNavClick('register')} className="text-left text-orange hover:underline transition-all cursor-pointer py-1">Register Now →</button>
            </div>
          </div>

          {/* Col 3: Contact & Support */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-white uppercase tracking-wider text-sm">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange" />
                <a href="mailto:Brightmindinstituteofeducation@gmail.com" className="hover:text-orange transition-colors">
                  Brightmindinstituteofeducation@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange" />
                <a href="https://wa.me/923102310119" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
                  +92 310 2310119
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                <span>Manzoor Colony, Karachi, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <div>
            <span className="font-mono">Copyright © {currentYear} AI Summer Camp.</span> All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://wa.me/923102310119" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">WhatsApp</a>
            <a href="mailto:Brightmindinstituteofeducation@gmail.com" className="hover:text-orange transition-colors">Email Support</a>
            <span className="text-white/30">Karachi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
