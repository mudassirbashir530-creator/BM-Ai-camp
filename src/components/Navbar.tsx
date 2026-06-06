import { useState, useEffect } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { TabVal } from '../types';

interface NavbarProps {
  activeTab: TabVal;
  setActiveTab: (tab: TabVal) => void;
}

import InstituteLogo from './InstituteLogo';

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle sticky layout styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        scrolled && setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavClick = (tab: TabVal, id?: string) => {
    setActiveTab(tab);
    setIsOpen(false);
    
    // Smooth scrolling
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', tab: 'home' as TabVal, id: null },
    { label: 'About', tab: 'home' as TabVal, id: 'about' },
    { label: 'Schedule', tab: 'schedule' as TabVal, id: null },
    { label: 'Resources', tab: 'resources' as TabVal, id: null },
    { label: 'Handbook', tab: 'handbook' as TabVal, id: null },
  ];

  return (
    <header 
      id="navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${
        scrolled 
          ? 'bg-navy/95 backdrop-blur-md border-b border-orange/20 py-3 shadow-lg' 
          : 'bg-navy border-b border-border/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <InstituteLogo theme="white" className="h-10 w-auto" />
            <div className="hidden sm:block border-l border-white/20 pl-3 ml-1">
              <span className="block font-mono text-orange text-sm font-bold tracking-tight leading-none">AI SUMMER</span>
              <span className="block font-sans text-white text-sm font-semibold uppercase tracking-wider leading-none mt-1">CAMP</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const worksOnId = item.id;
              const isTabActive = worksOnId 
                ? (activeTab === 'home' && window.location.hash === `#${worksOnId}`)
                : activeTab === item.tab;

              return (
                <button
                  key={item.label}
                  id={`nav-item-${item.label.toLowerCase()}`}
                  onClick={() => handleNavClick(item.tab, item.id || undefined)}
                  className={`relative font-sans text-sm font-medium tracking-wide uppercase transition-colors py-2 group cursor-pointer ${
                    isTabActive 
                      ? 'text-orange font-semibold' 
                      : 'text-white/85 hover:text-orange'
                  }`}
                >
                  {item.label}
                  {/* Underline indicator */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange transform origin-left transition-transform duration-300 ${isTabActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </button>
              );
            })}

            {/* CTA Register Button */}
            <button
              id="nav-register-btn-desktop"
              onClick={() => handleNavClick('register')}
              className={`font-sans text-xs font-semibold uppercase tracking-wider bg-orange text-white px-5 py-3 rounded-sm transition-all duration-300 hover:bg-[#C94E16] cursor-pointer shadow-md shadow-orange/10 hover-shadow active:scale-[0.98] ${
                activeTab === 'register' ? 'ring-2 ring-white ring-offset-2 ring-offset-navy' : ''
              }`}
            >
              Register →
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-sm text-white/90 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-border/10 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`mobile-nav-item-${item.label.toLowerCase()}`}
                onClick={() => handleNavClick(item.tab, item.id || undefined)}
                className="block w-full text-left px-3 py-3 rounded-sm text-base font-medium text-white/90 hover:text-white hover:bg-orange/10 hover:text-orange transition-all cursor-pointer font-sans"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-3">
              <button
                id="mobile-nav-register-btn"
                onClick={() => handleNavClick('register')}
                className="w-full text-center font-sans text-sm font-semibold uppercase tracking-wider bg-orange text-white py-3 rounded-sm hover:bg-[#C94E16] transition-all cursor-pointer shadow-lg shadow-orange/15"
              >
                Register Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
