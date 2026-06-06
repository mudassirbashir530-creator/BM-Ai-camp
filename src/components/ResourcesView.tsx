import { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  ExternalLink, 
  FolderOpen, 
  Youtube, 
  Search, 
  Filter 
} from 'lucide-react';
import { Resource } from '../types';
import { RESOURCES, CHANNELS } from '../sharedData';

export default function ResourcesView() {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'article'>('all');

  // Filter items matching week, type, and search queries (for state-of-the-art usability)
  const filteredResources = RESOURCES.filter(res => {
    const matchesWeek = selectedWeek === 'all' || res.week === selectedWeek;
    const matchesType = selectedType === 'all' || res.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.source.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesWeek && matchesType && matchesSearch;
  });

  const weeks = [
    { label: 'All Resources', val: 'all' as const },
    { label: 'Week 1: Foundations', val: 1 },
    { label: 'Week 2: Prompting', val: 2 },
    { label: 'Week 3: Agents & n8n', val: 3 },
    { label: 'Week 4: Careers & Ethics', val: 4 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 no-print">
      
      {/* Page Heading */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase bg-[#FAF7F2] text-[#7A7A72] border border-border px-3 py-1 rounded-sm">Resource Hub</span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy tracking-tight">Curated Learning Library</h1>
        <p className="font-sans text-[#7A7A72] text-sm font-light leading-relaxed">
          High-fidelity tutorials, articles, manuals and lecture reference materials assembled by Bright Mind Institute instructors to power your study circles.
        </p>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white border border-border p-5 rounded-sm shadow-sm space-y-4">
        
        {/* Dynamic Week filter tabs */}
        <div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider mb-2.5">Filter by Camp Week</span>
          <div className="flex flex-wrap gap-2">
            {weeks.map((w) => {
              const isActive = selectedWeek === w.val;
              return (
                <button
                  key={w.label}
                  onClick={() => setSelectedWeek(w.val)}
                  className={`py-2 px-4 rounded-sm font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-orange text-white border border-orange shadow-sm' 
                      : 'bg-white text-navy border border-border hover:bg-neutral-50'
                  }`}
                >
                  {w.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input & Media-Type filters */}
        <div className="flex flex-col md:flex-row gap-4 pt-2.5 border-t border-border/10">
          
          {/* Search bar input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, channel source, or topic tag..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-xs font-sans"
            />
          </div>

          {/* Media filter buttons */}
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider shrink-0 mr-1">Resource Type:</span>
            <div className="inline-flex rounded-sm border border-border p-0.5 bg-paper text-xs">
              {(['all', 'video', 'article'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`py-1.5 px-3.5 rounded-sm uppercase font-mono font-bold text-[10px] cursor-pointer tracking-wider transition-colors ${
                    selectedType === t 
                      ? 'bg-navy text-white font-bold shadow-sm' 
                      : 'text-[#7A7A72] hover:text-navy'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FILTER RESULTS COUNTER */}
      <div className="flex justify-between items-center text-xs font-mono text-[#7A7A72] border-b border-border/10 pb-2">
        <span className="uppercase tracking-widest">AISC Library Directory</span>
        <span>Showing {filteredResources.length} matching resources</span>
      </div>

      {/* RESOURCE ITEMS CARDS GRID */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isVideo = res.type === 'video';
            return (
              <div 
                key={res.id}
                className="bg-white border border-border p-6 rounded-sm shadow-sm flex flex-col justify-between hover:border-orange/30 hover:shadow-md transition-all duration-300"
              >
                <div>
                  
                  {/* Type Badge & Week tracker */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded-sm border ${
                      isVideo 
                        ? 'bg-red-50 text-red-650 border-red-100' 
                        : 'bg-[#EEF1F7] text-[#0E1C35] border-navy/10'
                    }`}>
                      {isVideo ? <Play className="w-2.5 h-2.5 fill-red-650 stroke-none shrink-0" /> : <BookOpen className="w-2.5 h-2.5 shrink-0" />}
                      <span>{isVideo ? '▶ VIDEO' : '📄 ARTICLE'}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-450 uppercase tracking-widest font-bold">Week {res.week}</span>
                  </div>

                  {/* Resource Card Body */}
                  <h3 className="font-sans font-bold text-navy text-sm leading-snug line-clamp-2 hover:text-orange transition-colors min-h-[2.5rem]" title={res.title}>
                    {res.title}
                  </h3>
                  
                  <div className="text-[11px] text-[#7A7A72] font-mono mt-1 mb-6">
                    Source: <span className="font-semibold text-slate-700">{res.source}</span>
                  </div>

                </div>

                {/* Card Meta Row & Button */}
                <div className="flex justify-between items-center pt-4 border-t border-border/15">
                  <span className="font-mono text-[9px] bg-[#FAF7F2] text-slate-600 border border-border px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    #{res.topic}
                  </span>
                  
                  <a 
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 font-sans uppercase font-bold text-[10px] tracking-wider text-orange hover:text-[#C94E16] hover:underline"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border border-dashed border-border p-12 text-center rounded-sm">
          <FolderOpen className="w-12 h-12 text-slate-350 mx-auto mb-4" />
          <h3 className="font-display text-2xl text-navy font-semibold">No Resources Match Your Selection</h3>
          <p className="font-sans text-xs text-[#7A7A72] max-w-sm mx-auto mt-2 leading-relaxed font-light">
            Try resetting your search parameter strings or selecting 'All Resources' on the week filter dashboard.
          </p>
        </div>
      )}

      {/* SECTION BONUS: High Priority Subscriptions */}
      <section className="bg-navy text-white p-8 sm:p-10 rounded-sm border border-border/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-[40px]" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 text-orange font-mono font-bold text-xs uppercase tracking-widest">
            <Youtube className="w-5 h-5 text-red-500 fill-red-500" />
            <span>Bonus — Recommended YouTube Subscriptions</span>
          </div>

          <h3 className="font-display text-3xl font-medium tracking-tight">Stay Empowered Daily</h3>
          <p className="font-sans text-white/70 text-xs font-light max-w-xl">
            Subscribe to these pre-screened technical educators. Regular reviews of their active tutorial posts will vastly accelerate your summer camp research.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {CHANNELS.map((ch) => (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/5 p-4 rounded-sm flex flex-col justify-between hover:bg-white/10 hover:border-orange/20 transition-all group cursor-pointer"
              >
                <div>
                  <h4 className="font-sans font-bold text-white group-hover:text-orange text-sm transition-colors">{ch.name}</h4>
                  <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light mt-1.5">{ch.benefit}</p>
                </div>
                <div className="text-[10px] text-orange font-mono uppercase font-bold text-right pt-3">
                  Visit Channel →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
