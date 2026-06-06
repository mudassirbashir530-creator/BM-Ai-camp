import { useState, useEffect } from 'react';
import { TabVal } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import RegisterView from './components/RegisterView';
import HandbookView from './components/HandbookView';
import ResourcesView from './components/ResourcesView';
import ScheduleView from './components/ScheduleView';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTabState] = useState<TabVal>(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page') as TabVal;
    if (['home', 'register', 'handbook', 'resources', 'schedule'].includes(p)) {
      return p;
    }
    return 'home';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Synchronize state with URL search params for deep linking
  const setActiveTab = (tab: TabVal) => {
    setActiveTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('page', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Back-button/Forward-button history support
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('page') as TabVal;
      if (p && ['home', 'register', 'handbook', 'resources', 'schedule'].includes(p)) {
        setActiveTabState(p);
      } else {
        setActiveTabState('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Back to top floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select target page according to active state
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterView />;
      case 'handbook':
        return <HandbookView />;
      case 'resources':
        return <ResourcesView />;
      case 'schedule':
        return <ScheduleView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-orange selection:text-white">
      
      {/* Alert Header Strip (urgency banner) */}
      <div className="bg-orange text-white py-2 px-4 text-center text-[11px] font-mono font-bold tracking-wider relative z-50 no-print flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
        <span>LIMITED COHORT SEATS AVAILABLE (MAX 20 CAMERS) — PKR 4,998 FLAT COHORT COST</span>
      </div>

      {/* Persistent Global Nav */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Multi-Screen Sandbox Panel */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Persistent Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Back to top overlay button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-navy hover:bg-orange text-white shadow-lg transition-all z-40 cursor-pointer no-print animate-fade-in border border-white/5 active:scale-95"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
