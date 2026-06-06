import { useState } from 'react';
import { Printer, CalendarRange, Info, Clock, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { SCHEDULE } from '../sharedData';

export default function ScheduleView() {
  const [activeWeekTab, setActiveWeekTab] = useState<number | 'all'>('all');

  // Groups sessions by weeks for clean separate tables format
  const weeksData = [
    { num: 1, name: 'Week 1: Understanding AI foundations', theme: 'AI History, LLM comparison matrices, Transformers & spotting AI-Generated structures.', color: 'border-[#E05C1A]', headerBg: 'bg-[#E05C1A] text-white', themeLabel: 'orange' },
    { num: 2, name: 'Week 2: Mastery of Prompt Engineering', theme: 'Role personifications, context engineering frames, Chains of Thoughts, and Studying AI honor scripts.', color: 'border-[#0E1C35]', headerBg: 'bg-[#0E1C35] text-white', themeLabel: 'navy' },
    { num: 3, name: 'Week 3: AI Agents & Automation workflows', theme: 'Autonomous loops, setting up Visual Workflows with n8n nodes, and ground-linking local knowledge bases (RAG).', color: 'border-[#0D7A6B]', headerBg: 'bg-[#0D7A6B] text-white', themeLabel: 'teal' },
    { num: 4, name: 'Week 4: Ethical Frontiers, Careers & Demo Day', theme: 'Auditing core datasets, exploring AI jobs, construction of final Sandbox Masterpieces, and formal presentations on Demo Day.', color: 'border-[#C49A2A]', headerBg: 'bg-[#C49A2A] text-white', themeLabel: 'gold' }
  ];

  const getWeekSessions = (wNum: number) => {
    return SCHEDULE.filter(session => session.weekNum === wNum);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Heading banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/15 pb-8 no-print">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-1.5 font-mono text-xs uppercase bg-[#FAF7F2] text-[#7A7A72] border border-border px-3 py-1 rounded-sm">
            <CalendarRange className="w-3.5 h-3.5 text-orange" />
            <span>Time mapping control</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy tracking-tight">Official 4-Week Timetable</h1>
          <p className="font-sans text-slate-500 font-light text-xs sm:text-sm max-w-xl leading-relaxed">
            Pioneer Cohort lecture schedule, daily practices, and demo configurations. Lessons run Monday to Thursday from 10:00 AM to 12:00 PM.
          </p>
        </div>
        
        {/* Actions Button */}
        <button
          onClick={() => {
            window.focus();
            window.print();
          }}
          className="inline-flex items-center space-x-2 bg-navy hover:bg-orange text-white text-xs font-mono font-semibold uppercase tracking-wider px-5 py-3 rounded-sm border border-border transition-all duration-150 cursor-pointer self-start md:self-center shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Timetable</span>
        </button>
      </div>

      {/* TIMING SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-border p-5 rounded-sm shadow-sm font-sans text-xs">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-orange mt-0.5 shrink-0" />
          <div>
            <div className="font-mono text-[9px] uppercase text-[#7A7A72] tracking-wider">Class Timings</div>
            <div className="font-bold text-navy mt-0.5">10:00 AM – 12:00 PM PST</div>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <CalendarRange className="w-5 h-5 text-orange mt-0.5 shrink-0" />
          <div>
            <div className="font-mono text-[9px] uppercase text-[#7A7A72] tracking-wider">Session Days</div>
            <div className="font-bold text-navy mt-0.5">Monday to Thursday (Friday sandbox Optional)</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <span className="font-medium inline-block text-center w-5 h-5 mt-0.5 text-[#C49A2A] font-bold shrink-0">🎓</span>
          <div>
            <div className="font-mono text-[9px] uppercase text-[#7A7A72] tracking-wider">Design Framework</div>
            <div className="font-bold text-navy mt-0.5">Pioneer No-Code Ecosystem Build</div>
          </div>
        </div>
      </div>

      {/* WEEK FILTER TAB CONTROL */}
      <div className="flex flex-wrap gap-2.5 bg-paper p-1 rounded-sm border border-border no-print">
        <button
          onClick={() => setActiveWeekTab('all')}
          className={`py-2 px-4 rounded-sm font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all ${
            activeWeekTab === 'all' 
              ? 'bg-orange text-white shadow-sm' 
              : 'text-navy hover:bg-white/50'
          }`}
        >
          All 4 Weeks
        </button>
        {weeksData.map((wk) => (
          <button
            key={wk.num}
            onClick={() => setActiveWeekTab(wk.num)}
            className={`py-2 px-4 rounded-sm font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all ${
              activeWeekTab === wk.num 
                ? 'bg-[#0E1C35] text-white shadow-sm' 
                : 'text-navy hover:bg-white/50'
            }`}
          >
            Week {wk.num}
          </button>
        ))}
      </div>

      {/* TIMETABLE LAYOUT PORT WRAPPER */}
      <div className="space-y-12">
        {weeksData.map((wk) => {
          // Hide table if week tab is filtered out
          if (activeWeekTab !== 'all' && activeWeekTab !== wk.num) return null;

          const sessions = getWeekSessions(wk.num);

          return (
            <div 
              key={wk.num}
              className={`bg-white border rounded-sm shadow-sm overflow-hidden border-t-8 pb-3 ${wk.color} print-card`}
            >
              
              {/* Table top category panel banner */}
              <div className={`p-5 ${wk.headerBg} flex flex-col sm:flex-row sm:items-baseline justify-between gap-2.5`}>
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-sm mr-2.5">
                    SECTION 0{wk.num}
                  </span>
                  <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide">
                    {wk.name}
                  </span>
                </div>
                <span className="font-sans text-xs text-white/80 max-w-sm mt-1 text-left sm:text-right font-light leading-snug line-clamp-2">
                  Theme: {wk.theme}
                </span>
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-border text-[#7A7A72] font-mono uppercase text-[9px] tracking-wider">
                      <th className="p-4 w-28 border-r border-border/10">Days Log</th>
                      <th className="p-4 border-r border-border/10">Primary Session Topics</th>
                      <th className="p-4">Daily Hands-on Project Sandbox Practice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-slate-800">
                    {sessions.map((ses, sIdx) => (
                      <tr 
                        key={sIdx}
                        className={`hover:bg-[#FAF7F2]/40 transition-colors ${
                          sIdx % 2 === 1 ? 'bg-[#FAF7F2]/10' : 'bg-white'
                        }`}
                      >
                        <td className="p-4 font-mono font-bold text-navy border-r border-border/10">
                          {ses.day}
                        </td>
                        <td className="p-4 font-bold text-navy text-[13px] border-r border-border/10 max-w-md">
                          {ses.sessionName}
                        </td>
                        <td className="p-4 text-[#7A7A72] text-[12px] font-light leading-relaxed">
                          {ses.dailyPractice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE COMPACT STACKED CARD VIEW */}
              <div className="block sm:hidden divide-y divide-border/20 px-4">
                {sessions.map((ses, sIdx) => (
                  <div key={sIdx} className="py-4 space-y-1.5 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase font-bold text-orange">
                      <span>{ses.day}</span>
                      <span>SESSION {sIdx + 1}</span>
                    </div>
                    <h4 className="font-bold text-navy text-sm font-sans">{ses.sessionName}</h4>
                    <p className="font-sans text-[#7A7A72] leading-relaxed pt-1 font-light text-[11px]">
                      <strong className="font-mono text-[9px] uppercase font-bold text-slate-500 block">Daily Sandbox Practice:</strong>
                      {ses.dailyPractice}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* ACADEMIC INFRASTRUCTURE ALERT SUMMARY */}
      <div className="bg-[#EEF1F7] border-l-4 border-navy p-5 rounded-sm flex items-start space-x-3 text-xs font-sans">
        <Info className="w-5 h-5 text-navy shrink-0 mt-0.5" />
        <div className="space-y-1 text-[#12120E]/90 leading-relaxed font-light">
          <span className="font-mono uppercase font-bold text-navy tracking-wider text-[10px] block">FRIDAY PROJECT INTENSIVES LAB RULES</span>
          <p>
            Friday afternoons are left completely open and are held as <strong>Project Consultations</strong>. Attendance is completely optional. Campers construct physical folders, host web integrations on platforms, and receive individual support leading up to their final graduation reviews.
          </p>
        </div>
      </div>

    </div>
  );
}
