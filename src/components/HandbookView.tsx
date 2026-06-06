import { useState, useEffect, useRef } from 'react';
import { 
  Printer, 
  BookOpen, 
  CheckSquare, 
  Square, 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
  GraduationCap, 
  ShieldAlert, 
  ChevronDown, 
  HeartHandshake,
  ArrowDownIcon 
} from 'lucide-react';
import { FAQS } from '../sharedData';

interface NavItem {
  label: string;
  id: string;
}

export default function HandbookView() {
  const [activeSection, setActiveSection] = useState<string>('cover');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Checklist items - state stored in component memory only as per PRD "not localStorage" guidelines
  const [checklist, setChecklist] = useState({
    laptop: false,
    charger: false,
    notebook: false,
    waterBottle: false,
    curiosity: false,
    earphones: false
  });

  const handbookNav: NavItem[] = [
    { label: 'Welcome Booklet', id: 'cover' },
    { label: 'Camp Overview', id: 'overview' },
    { label: '4-Week curriculum', id: 'curriculum' },
    { label: 'Camp Daily Timetable', id: 'schedule' },
    { label: 'Workspace AI Tools', id: 'tools' },
    { label: 'AISC Checklist', id: 'checklist' },
    { label: 'Code of Conduct', id: 'conduct' },
    { label: 'FAQ Accordions', id: 'faq' },
    { label: 'Bright Mind Contact', id: 'contact' },
    { label: 'Student Pledge', id: 'pledge' }
  ];

  // Set up intersection observer to highlight navbar items dynamically on scroll
  useEffect(() => {
    const sections = handbookNav.map(item => document.getElementById(item.id));
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach(sec => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  const handleSidebarClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleCheck = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Sub-Header Actions */}
      <div className="flex justify-between items-center bg-white border border-border p-4 mb-8 sticky top-22 z-20 shadow-sm no-print">
        <div className="flex items-center space-x-2.5">
          <BookOpen className="w-5 h-5 text-orange" />
          <span className="font-sans text-xs uppercase font-bold tracking-wider text-navy">Bright Mind official handbook</span>
        </div>
        <button
          onClick={() => {
            window.focus();
            window.print();
          }}
          className="inline-flex items-center space-x-2 bg-navy text-white text-xs font-mono font-semibold uppercase tracking-wider px-4 py-2 border border-border hover:bg-orange transition-all duration-150 cursor-pointer rounded-sm shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Save / Print PDF</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* DESKTOP FIXED SIDEBAR */}
        <aside className="w-full lg:w-64 shrink-0 sticky top-40 z-10 no-print hidden lg:block border border-border p-5 bg-navy text-white rounded-sm">
          <div className="font-mono text-orange uppercase tracking-wider font-extrabold text-[10px] mb-4">Handbook Index</div>
          <nav className="space-y-1 text-xs">
            {handbookNav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full text-left py-2.5 px-3 border-l-2 transition-all block duration-150 hover:bg-white/5 cursor-pointer font-sans uppercase tracking-wider ${
                    isActive 
                      ? 'border-orange text-orange font-bold bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MOBILE HORIZONTAL SIDEBAR CHIPS */}
        <div className="w-full overflow-x-auto flex gap-2 pb-3 mb-4 lg:hidden no-print">
          {handbookNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`py-2 px-3 shrink-0 rounded-sm font-sans text-[11px] uppercase tracking-wider font-semibold border transition-all ${
                  isActive 
                    ? 'bg-orange border-orange text-white' 
                    : 'bg-white border-border text-navy hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* COMPREHENSIVE HANDBOOK PORTFOLIO BODY */}
        <div className="flex-1 space-y-20 bg-white border border-border rounded-sm p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
          
          {/* Cover Section (#cover) */}
          <section id="cover" className="relative p-8 sm:p-12 bg-navy text-white text-center border border-border/10 overflow-hidden rounded-sm print-card">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E05C1A0A_1px,transparent_1px),linear-gradient(to_bottom,#E05C1A0A_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="relative z-10 space-y-6">
              <span className="font-mono text-orange text-xs font-bold tracking-widest uppercase">Bright Mind Institute of Education</span>
              <h2 className="font-display font-medium text-4xl sm:text-6xl tracking-tight leading-none leading-tight">
                AI Summer Camp <span className="font-bold block text-orange">Student Handbook</span>
              </h2>
              <div className="h-0.5 w-16 bg-orange mx-auto my-4" />
              <p className="font-sans text-white/80 max-w-sm mx-auto text-sm font-light">
                The comprehensive handbook, honor framework, checklists and camp study guidelines for the Pioneer Cohort.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <span className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-1 rounded-sm">Cohort 2026</span>
                <span className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-1 rounded-sm">4 Weeks</span>
                <span className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-1 rounded-sm">No Coding</span>
                <span className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-1 rounded-sm font-bold text-orange">Certificate Output</span>
              </div>
            </div>
          </section>

          {/* Camp OverviewSection (#overview) */}
          <section id="overview" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              01 — Camp Overview & Vision
            </div>
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Welcome to the Frontier</h3>
            <p className="font-sans text-slate-700 text-sm leading-relaxed font-light">
              We welcome you to Bright Mind Institute’s official summer cohort. Modern artificial intelligence represents the fastest technological evolution in human history. This camp was designed to bypass tedious coding blocks and go straight to visual workflows, prompting theory, and real agent operations.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="border border-border p-4 bg-[#FAF7F2]/10 hover:shadow-inner flex items-start space-x-3 rounded-sm">
                <Calendar className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono uppercase text-[#7A7A72]">Camp Duration</div>
                  <div className="font-sans font-bold text-navy text-xs">4 Weeks flat</div>
                </div>
              </div>
              <div className="border border-border p-4 bg-[#FAF7F2]/10 hover:shadow-inner flex items-start space-x-3 rounded-sm">
                <Clock className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono uppercase text-[#7A7A72]">Session Hours</div>
                  <div className="font-sans font-bold text-navy text-xs">10:00 AM – 12:00 PM</div>
                </div>
              </div>
              <div className="border border-border p-4 bg-[#FAF7F2]/10 hover:shadow-inner flex items-start space-x-3 rounded-sm">
                <Users className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono uppercase text-[#7A7A72]">Group Capacity</div>
                  <div className="font-sans font-bold text-navy text-xs">Max 20 students</div>
                </div>
              </div>
              <div className="border border-border p-4 bg-[#FAF7F2]/10 hover:shadow-inner flex items-start space-x-3 rounded-sm col-span-2 md:col-span-3">
                <GraduationCap className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono uppercase text-[#7A7A72]">Graduation output</div>
                  <div className="font-sans font-bold text-navy text-xs">Physical Certificate of Agentic mastery & capstone demo day evaluation</div>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum Section (#curriculum) */}
          <section id="curriculum" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              02 — Pioneer Syllabus Framework
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">The Scaffolded syllabus</h3>
            
            <div className="space-y-4">
              {/* Week 1 item */}
              <div className="border-l-4 border-orange bg-orange-light p-4 rounded-sm border border-border border-l-4">
                <div className="font-mono text-[10px] text-orange font-bold uppercase">Week 01 — UNDERSTANDING FUNDAMENTALS</div>
                <h4 className="font-sans font-bold text-navy text-sm mt-0.5">Model Mechanics & Bottlenecks</h4>
                <p className="font-sans text-xs text-[#7A7A72] mt-1.5 leading-relaxed font-light">
                  Compare OpenAI ChatGPT, Anthropic Claude, and Google Gemini. Explore history pathways and master the tokenization limitations of transformers.
                </p>
              </div>

              {/* Week 2 item */}
              <div className="border-l-4 border-navy bg-navy-light p-4 rounded-sm border border-border border-l-4">
                <div className="font-mono text-[10px] text-navy font-bold uppercase">Week 02 — THE PERFECT PROMPT ENGINE</div>
                <h4 className="font-sans font-bold text-navy text-sm mt-0.5">Anatomy Rules, Context Framing & Math reasoning</h4>
                <p className="font-sans text-xs text-[#7A7A72] mt-1.5 leading-relaxed font-light">
                  Build exact prompting structures referencing specific rules (Role, Context, Formats, Constraints). Audit models under zero-shot and few-shot workloads.
                </p>
              </div>

              {/* Week 3 item */}
              <div className="border-l-4 border-teal bg-teal/5 p-4 rounded-sm border border-border border-l-4">
                <div className="font-mono text-[10px] text-[#0D7A6B] font-bold uppercase">Week 03 — AUTOMATION VISUAL PIPELINES</div>
                <h4 className="font-sans font-bold text-navy text-sm mt-0.5">n8n Node Workflows & Grounding datasets</h4>
                <p className="font-sans text-xs text-[#7A7A72] mt-1.5 leading-relaxed font-light">
                  Coordinate autonomous agents using multi-agent blueprints and visual node-building pipelines. Plug in custom grounding directories.
                </p>
              </div>

              {/* Week 4 item */}
              <div className="border-l-4 border-gold bg-gold/5 p-4 rounded-sm border border-border border-l-4">
                <div className="font-mono text-[10px] text-gold-dark font-bold uppercase">Week 04 — INTEGRITY, ETHICS & DEMO PITCH</div>
                <h4 className="font-sans font-bold text-navy text-sm mt-0.5">Hallucination Audits, Honor framework & Masterpiece build</h4>
                <p className="font-sans text-xs text-[#7A7A72] mt-1.5 leading-relaxed font-light">
                  Evaluate dataset biases, build ethical student honor systems, polish presentations, and pitch your final masteries on Demo Day.
                </p>
              </div>
            </div>
          </section>

          {/* Daily Schedule Section (#schedule) */}
          <section id="schedule" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              03 — Inside the Classroom
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Daily Timetable (8:45 AM - 1:00 PM)</h3>
            
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border border-border">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-border text-[#7A7A72] font-mono uppercase text-[10px]">
                    <th className="p-3">Time slot</th>
                    <th className="p-3">Activity description</th>
                    <th className="p-3 text-right">Class type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-slate-800">
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">08:45 AM</td>
                    <td className="p-3">Student Arrival & Laboratory Computers Setup</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 font-bold tracking-tight rounded-sm">PRE-LAB</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">09:00 AM</td>
                    <td className="p-3">Theoretical Core Lecture & Model Mechanics mapping</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold tracking-tight rounded-sm">LECTURE</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">10:00 AM</td>
                    <td className="p-3">Guided Lab-Practice & Live Peer-to-Peer building</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-green-100 text-green-700 font-bold tracking-tight rounded-sm">HANDS-ON</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">11:30 AM</td>
                    <td className="p-3">Refreshment & Hydration Break</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 font-bold tracking-tight rounded-sm">BREAK</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">11:45 AM</td>
                    <td className="p-3">Personal Sandbox Project construction & peer review circles</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-green-100 text-green-700 font-bold tracking-tight rounded-sm">HANDS-ON</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-orange">12:45 PM</td>
                    <td className="p-3">Daily reflections, folder sync, and checklist logups</td>
                    <td className="p-3 text-right"><span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 font-bold tracking-tight rounded-sm">WRAP-UP</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-light p-4 border border-orange/15 rounded-sm flex items-start space-x-3 mt-4">
              <ShieldAlert className="w-5 h-5 text-orange shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-orange uppercase font-bold tracking-wider">Academic Policy Alert</span>
                <p className="font-sans text-xs text-slate-800 leading-relaxed font-light mt-0.5">
                  <strong>Friday = Project Day.</strong> Friday sessions are held exclusively as optional workspace hours for students running elaborate automated integrations or building advanced models.
                </p>
              </div>
            </div>
          </section>

          {/* AI Tools Section (#tools) */}
          <section id="tools" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              04 — Software Workspace Ecosystem
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Approved camp workspace</h3>
            <p className="font-sans text-slate-700 text-sm leading-relaxed font-light">
              Students will set up free student workspaces in the following industry standard platforms during our initial computer bootup on day 1:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <li className="p-4 border border-border hover:shadow-sm rounded-sm">
                <span className="font-mono text-orange font-bold font-semibold uppercase">💬 ChatGPT & Claude API</span>
                <p className="text-slate-550 leading-relaxed font-light mt-1 text-[11px]">Primary conversational targets for prompt blueprints, role engineering, and validation scripts.</p>
              </li>
              <li className="p-4 border border-border hover:shadow-sm rounded-sm">
                <span className="font-mono text-navy font-bold font-semibold uppercase">🔌 n8n workflow engine</span>
                <p className="text-slate-550 leading-relaxed font-light mt-1 text-[11px]">Visual workflow node program to model databases, synchronize Google Forms and fire telegram notifications.</p>
              </li>
              <li className="p-4 border border-border hover:shadow-sm rounded-sm">
                <span className="font-mono text-[#0D7A6B] font-bold font-semibold uppercase">🌟 Gemini workspace sandbox</span>
                <p className="text-slate-550 leading-relaxed font-light mt-1 text-[11px]">Google's cloud computing framework for multimodal analytics, file searching, and audio translation.</p>
              </li>
              <li className="p-4 border border-border hover:shadow-sm rounded-sm">
                <span className="font-mono text-amber-600 font-bold font-semibold uppercase">📖 Notion AI</span>
                <p className="text-slate-550 leading-relaxed font-light mt-1 text-[11px]">Knowledge manager notebook where students record their daily milestones, prompt outputs, and final blueprints.</p>
              </li>
            </ul>
          </section>

          {/* What to Bring Section (#checklist) */}
          <section id="checklist" className="scroll-mt-40 space-y-6 page-break-inside-avoid">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              05 — AISC Ready-Check State
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Interactive checklist</h3>
            <p className="font-sans text-slate-700 text-xs font-light print:hidden">
              Click to cross off each component before departing for camp. <em>(State is saved in tab session memory)</em>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => toggleCheck('laptop')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.laptop ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.laptop ? 'line-through text-slate-400' : 'text-navy'}`}>Charged Notebook Laptop (Windows/Mac/Chromebook)</span>
              </button>

              <button 
                onClick={() => toggleCheck('charger')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.charger ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.charger ? 'line-through text-slate-400' : 'text-navy'}`}>Main electricity charger power adapter</span>
              </button>

              <button 
                onClick={() => toggleCheck('notebook')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.notebook ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.notebook ? 'line-through text-slate-400' : 'text-navy'}`}>Physical Notebook notepad & black paper drawing pen</span>
              </button>

              <button 
                onClick={() => toggleCheck('waterBottle')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.waterBottle ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.waterBottle ? 'line-through text-slate-400' : 'text-navy'}`}>Reusable personal water container</span>
              </button>

              <button 
                onClick={() => toggleCheck('earphones')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.earphones ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.earphones ? 'line-through text-slate-400' : 'text-navy'}`}>Wired high-isolation headphones/earbuds for video deeps</span>
              </button>

              <button 
                onClick={() => toggleCheck('curiosity')}
                className="flex items-center space-x-3 p-4 border border-border bg-paper rounded-sm font-sans font-medium text-xs text-left cursor-pointer transition-colors hover:bg-[#FAF7F2]"
              >
                {checklist.curiosity ? <CheckSquare className="w-5 h-5 text-teal" /> : <Square className="w-5 h-5 text-[#7A7A72]" />}
                <span className={`${checklist.curiosity ? 'line-through text-slate-400 animate-pulse text-teal' : 'text-navy font-semibold'}`}>Unbounded curiosity for Agent swarms!</span>
              </button>
            </div>
          </section>

          {/* Code of Conduct Section (#conduct) */}
          <section id="conduct" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              06 — Honor Code & Conduct
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Code of Conduct</h3>
            <p className="font-sans text-slate-700 text-sm leading-relaxed font-light">
              To guarantee a premium, respectful, high-velocity academic environment, every student of the Pioneer Cohort commits to the following 6 rules:
            </p>

            <div className="space-y-4 font-sans text-xs">
              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">01</span>
                <div>
                  <h4 className="font-bold text-navy">Respect Everyone</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Value the diverse voices and coding levels of every peer, instructor, and educational assistant in Karachi.</p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">02</span>
                <div>
                  <h4 className="font-bold text-navy">Be Present & Engaged</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Avoid social media distraction during session hours. Active collaboration is crucial for project success.</p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">03</span>
                <div>
                  <h4 className="font-bold text-navy">No Passive Learning</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Work through daily sandbox files and prompt practices yourself rather than merely copying from neighbors.</p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">04</span>
                <div>
                  <h4 className="font-bold text-navy">Honest Use of AI</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Leverage models for learning explanation, structural design, and brainstorming—do not plagiarize complete study sheets.</p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">05</span>
                <div>
                  <h4 className="font-bold text-navy">Protect Privacy</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Do not upload private personal datasets, commercial credentials, or keys to public AI model endpoints.</p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-border flex items-start space-x-3 rounded-sm">
                <span className="font-mono text-orange font-bold">06</span>
                <div>
                  <h4 className="font-bold text-navy">Keep Devices Secure</h4>
                  <p className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5">Safeguard your personal laptop, workspace passwords, and physical peripherals when moving about the classroom.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section (#faq) */}
          <section id="faq" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              07 — FAQs
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Handbook FAQs</h3>
            
            <div className="space-y-3.5">
              {FAQS.slice(0, 4).map((faq) => {
                const isOpened = openFaq === faq.id;
                return (
                  <div key={faq.id} className="border border-border rounded-sm overflow-hidden page-break-inside-avoid">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-4 font-sans font-bold text-[#0E1C35] hover:text-orange flex items-center justify-between bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer text-xs"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-orange transition-transform duration-300 shrink-0 print:hidden ${isOpened ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`p-4 font-sans text-xs text-[#7A7A72] bg-white border-t border-border leading-relaxed ${isOpened ? 'block' : 'hidden print:block'}`}>
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Section (#contact) */}
          <section id="contact" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              08 — Direct Support Routing
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">Contact Information</h3>
            <p className="font-sans text-slate-700 text-sm leading-relaxed font-light">
              Need sudden support regarding admissions validation or directions to the Karachi classroom? Reach our help desks directly:
            </p>

            <div className="bg-orange-light p-6 rounded-sm border border-orange/15 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="font-mono text-orange uppercase font-bold text-[10px]">Academic Institute Hub</dt>
                  <dd className="font-bold text-navy mt-1">Bright Mind Institute of Education</dd>
                </div>
                <div>
                  <dt className="font-mono text-orange uppercase font-bold text-[10px]">Office Location</dt>
                  <dd className="font-bold text-navy mt-1">Manzoor Colony, Karachi, Pakistan</dd>
                </div>
                <div>
                  <dt className="font-mono text-orange uppercase font-bold text-[10px]">WhatsApp Hotline</dt>
                  <dd className="font-bold text-navy mt-1">
                    <a href="https://wa.me/923102310119" target="_blank" rel="noopener noreferrer" className="hover:underline text-orange">
                      +92 310 2310119
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-orange uppercase font-bold text-[10px]">Registrations Email</dt>
                  <dd className="font-bold text-navy mt-1">
                    <a href="mailto:Brightmindinstituteofeducation@gmail.com" className="hover:underline text-orange">
                      Brightmindinstituteofeducation@gmail.com
                    </a>
                  </dd>
                </div>
              </div>
            </div>
          </section>

          {/* Student Pledge Section (#pledge) */}
          <section id="pledge" className="scroll-mt-40 space-y-6">
            <div className="bg-navy text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider leading-none rounded-sm">
              09 — Pioneer Pledge Agreement
            </div>
            
            <h3 className="font-display text-4xl text-navy font-semibold tracking-tight">The Student Pledge de Integrity</h3>
            
            {/* The Pledge box */}
            <div className="bg-navy text-white/95 p-6 sm:p-8 border border-orange/20 rounded-sm space-y-6 print-card">
              <div className="flex justify-center text-orange"><HeartHandshake className="w-12 h-12" /></div>
              
              <h4 className="text-center font-display text-2xl font-semibold tracking-tight">AIS Pioneer Honor Pledge</h4>
              
              <p className="font-sans font-light text-slate-350 text-xs text-center leading-relaxed max-w-lg mx-auto">
                "I pledge, on my academic honor as a student of the Bright Mind Institute's Pioneer Cohort, to engage fully in the 4-week camp schedule, to act with pristine collaborative honesty, and to focus my new agentic skills to build safe, beneficial integrations for our community."
              </p>

              {/* Signature Lines block */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[11px] font-mono uppercase text-white/60">
                <div className="space-y-4">
                  <div className="border-b border-white/20 h-8" />
                  <div className="text-center">Student Signature / Signature pad</div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-white/20 h-8 font-sans font-semibold text-center text-white" id="today-pledge-date">
                    {new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}
                  </div>
                  <div className="text-center">Date signed</div>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
