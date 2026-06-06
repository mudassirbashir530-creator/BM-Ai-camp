import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  MapPin, 
  Sparkles, 
  Zap, 
  Wrench, 
  FileCheck2,
  ShieldCheck,
  Compass,
  Brain
} from 'lucide-react';
import { TabVal } from '../types';
import { FAQS } from '../sharedData';
import InstituteLogo from './InstituteLogo';

interface HomeViewProps {
  setActiveTab: (tab: TabVal) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Seat Availability Counter Config
  const totalSeats = 20;
  const takenSeats = 14; // Pre-filled visual taken seats
  const remainingSeats = totalSeats - takenSeats;

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleRegisterClick = () => {
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleClick = () => {
    setActiveTab('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const curriculumPreview = [
    {
      week: 'Week 1',
      title: 'Understanding AI',
      desc: 'Master AI fundamentals, compare key language models, and learn how neural networks process information directly without code.',
      tags: ['LLMs', 'Model Sizing', 'History of AI'],
      borderColor: 'border-orange',
      textAccent: 'text-orange',
      bgTag: 'bg-orange/10 text-orange-dark',
    },
    {
      week: 'Week 2',
      title: 'Prompt Engineering',
      desc: 'Unlock Advanced Prompt design patterns, context engineering, role-play simulators, and system instruction blueprints.',
      tags: ['Anatomy', 'Few-Shot', 'CoT Reasoning'],
      borderColor: 'border-navy',
      textAccent: 'text-navy',
      bgTag: 'bg-navy/10 text-navy',
    },
    {
      week: 'Week 3',
      title: 'AI Agents & n8n',
      desc: 'Build functional visual workflows, database synchronizers, autonomous loop helpers, and standard RAG models.',
      tags: ['Visual n8n', 'Swarm Loops', 'RAG Data'],
      borderColor: 'border-teal',
      textAccent: 'text-teal',
      bgTag: 'bg-teal/10 text-teal-dark',
    },
    {
      week: 'Week 4',
      title: 'Ethics & Demo Day',
      desc: 'Address AI bias, data privacy, and ethical compliance. Construct, refine and pitch your custom agent on Graduation Demo Day.',
      tags: ['Mitigate Bias', 'Capstone Pitch', 'Graduation'],
      borderColor: 'border-gold',
      textAccent: 'text-gold',
      bgTag: 'bg-gold/10 text-gold-dark',
    },
  ];

  const outcomes = [
    {
      icon: <Brain className="w-6 h-6 text-orange" />,
      title: 'Understand AI deeply',
      desc: 'Deconstruct transformer architecture, compare Claude, Gemini, and GPT interfaces, and see how cloud intelligence thinks.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-orange" />,
      title: 'Master Prompts',
      desc: 'Format elite inputs using Context Framing, Role Personas, and Chain of Thought (CoT) structures for bulletproof output.'
    },
    {
      icon: <Zap className="w-6 h-6 text-orange" />,
      title: 'Build AI Agents',
      desc: 'Configure autonomous agents that reason, coordinate together, call internal tools, and carry out tasks independently.'
    },
    {
      icon: <Wrench className="w-6 h-6 text-orange" />,
      title: 'No-Code Automation',
      desc: 'Map visual triggers and action pathways in n8n pipelines to automate real-world emails and notification systems.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange" />,
      title: 'Ethical Guidelines',
      desc: 'Audit AI models for latent dataset bias, implement data safety walls, and author private student-level AI honor codes.'
    },
    {
      icon: <Compass className="w-6 h-6 text-orange" />,
      title: 'Career Blueprints',
      desc: 'Chart emerging technology jobs including Prompt Architect, AI trainer, Workflow Integrator, and AI Auditor.'
    }
  ];

  const tools = [
    { name: 'ChatGPT', type: 'Advanced LLM', emoji: '💬' },
    { name: 'Claude', type: 'Creative Logic', emoji: '🎭' },
    { name: 'Gemini', type: 'Google Multimodal', emoji: '🌟' },
    { name: 'n8n', type: 'Visual Pipelines', emoji: '🔌' },
    { name: 'DALL-E', type: 'AI Art Vector', emoji: '🎨' },
    { name: 'Notion AI', type: 'Markdown Productivity', emoji: '📖' },
    { name: 'Perplexity', type: 'Ground Search', emoji: '🔍' },
    { name: 'ElevenLabs', type: 'Speech Synthesis', emoji: '🎙️' }
  ];

  return (
    <div className="w-full">
      
      {/* SECTION ①: Hero Section */}
      <section className="relative overflow-hidden bg-navy text-white py-24 sm:py-32">
        {/* Editorial Navy & Orange background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E05C1A0F_1px,transparent_1px),linear-gradient(to_bottom,#E05C1A0F_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <InstituteLogo theme="white" className="h-32 sm:h-40 w-auto opacity-90 drop-shadow-lg" />
          </div>

          <div className="inline-flex items-center space-x-2 border border-orange/30 px-4 py-1.5 rounded-full bg-orange/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="font-mono text-orange text-xs font-semibold tracking-widest uppercase">APPLICATIONS OPEN · SUMMER 2026</span>
          </div>
          
          <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl tracking-tight max-w-5xl mx-auto leading-none mb-6">
            Learn the Future <br className="hidden sm:block" />
            of <span className="text-orange font-semibold italic">Artificial Intelligence</span>
          </h1>

          <p className="font-sans text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            A 4-week, zero-coding summer intensive designed for ages 12–18. Build workflows, engineer advanced prompts, and deploy autonomous agents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleRegisterClick}
              className="w-full sm:w-auto font-sans text-sm font-semibold uppercase tracking-wider bg-orange hover:bg-[#C94E16] text-white px-8 py-4 rounded-sm transition-all shadow-md shadow-orange/15 hover:shadow-lg cursor-pointer"
            >
              Register Now →
            </button>
            <button
              onClick={handleScheduleClick}
              className="w-full sm:w-auto font-sans text-sm font-semibold uppercase tracking-wider border border-white/20 hover:border-white/55 text-white bg-white/5 px-8 py-4 rounded-sm transition-all cursor-pointer"
            >
              View Schedule
            </button>
          </div>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            <span className="font-sans text-xs bg-white/10 text-white border border-white/5 px-3 py-1.5 rounded-sm">4 Weeks Intensive</span>
            <span className="font-sans text-xs bg-white/10 text-white border border-white/5 px-3 py-1.5 rounded-sm">Limited Seats (20 max)</span>
            <span className="font-sans text-xs bg-white/10 text-white border border-white/5 px-3 py-1.5 rounded-sm">No Coding Required</span>
            <span className="font-sans text-xs bg-white/10 text-white border border-white/5 px-3 py-1.5 rounded-sm">Formal Certificate</span>
          </div>
        </div>
      </section>

      {/* SECTION ②: Stats Strip */}
      <section className="bg-navy border-t border-b border-border/15 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-border/15">
            <div className="py-2">
              <div className="font-display text-4xl sm:text-5xl font-bold text-orange">4</div>
              <div className="font-sans text-xs uppercase tracking-widest text-white/50 mt-1">Weeks Duration</div>
            </div>
            <div className="py-2">
              <div className="font-display text-4xl sm:text-5xl font-bold text-orange">20</div>
              <div className="font-sans text-xs uppercase tracking-widest text-white/50 mt-1">Interactive Sessions</div>
            </div>
            <div className="py-2">
              <div className="font-display text-4xl sm:text-5xl font-bold text-orange">8+</div>
              <div className="font-sans text-xs uppercase tracking-widest text-white/50 mt-1">Hands-on Projects</div>
            </div>
            <div className="py-2">
              <div className="font-display text-4xl sm:text-5xl font-bold text-orange">0</div>
              <div className="font-sans text-xs uppercase tracking-widest text-white/50 mt-1">Lines of Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ③: About the Camp */}
      <section id="about" className="py-20 sm:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-orange text-xs font-semibold tracking-wider uppercase">
                Bright Mind Institute of Education
              </div>
              <h2 className="font-display font-medium text-4xl sm:text-5xl text-navy tracking-tight leading-tight">
                Introducing the <br />
                <span className="font-bold underline decoration-orange decoration-2">Agentic AI Pioneer Cohort</span> (Elite Group)
              </h2>
              <p className="font-sans text-slate-700 leading-relaxed font-light text-base sm:text-lg">
                Artificial Intelligence is changing the world at a breathtaking rate. To leading innovators of the future, understanding prompt patterns and autonomous software pipelines is the ultimate modern superpower. This summer, we are offering an intensive no-code program for students aged 12–18.
              </p>
              <p className="font-sans text-slate-700 leading-relaxed font-light text-base">
                Rather than writing dry code libraries, students will use advanced visual workflow designers and premium LLM configurations to build intelligent, autonomous AI systems that solve real-world problems.
              </p>
              <div className="flex items-center space-x-6 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange text-white text-xs font-mono flex items-center justify-center font-bold">BM</div>
                  <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-mono flex items-center justify-center font-bold">AI</div>
                  <div className="w-8 h-8 rounded-full bg-teal text-white text-xs font-mono flex items-center justify-center font-bold">26</div>
                </div>
                <div className="font-sans text-xs text-[#7A7A72]" id="cohort-tag">
                  Organized by <span className="text-navy font-semibold">Bright Mind Institute</span>, Karachi.
                </div>
              </div>
            </div>

            {/* Right Abstract Visual Column (PRD: split layout, right decorative AI illustration) */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 bg-white p-8 rounded-sm border border-border shadow-md">
                <div className="border border-dashed border-border p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-mono text-xs uppercase text-orange font-bold">COHORT ENUMERATION</span>
                    <span className="font-mono text-xs text-navy font-bold">01 / 2026</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-slate-500">Seat Distribution</span>
                      <span className="font-mono text-navy font-semibold">Limited to 20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-slate-500">Prerequisites</span>
                      <span className="font-mono text-navy font-semibold">No programming background</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-slate-500">Location</span>
                      <span className="font-mono text-navy font-semibold">Manzoor Colony, Karachi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-sans text-slate-500">Curriculum Lead</span>
                      <span className="font-mono text-orange font-semibold">Bright Mind Faculty</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border mt-2">
                    <div className="text-xs font-mono bg-orange-light text-orange p-3 rounded-sm border border-orange/10 leading-relaxed">
                      "Building hands-on solutions with the world's most cutting-edge artificial intelligence platforms."
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Geometric Accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange/10 -z-0 rounded-sm pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-navy/10 -z-0 rounded-sm pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION ④: 4-Week Curriculum Overview */}
      <section className="py-20 sm:py-24 bg-white border-t border-b border-border/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase bg-[#FAF7F2] text-[#7A7A72] border border-border px-3 py-1 rounded-sm mb-4">Structure</span>
            <h2 className="font-display text-4xl sm:text-5xl text-navy font-medium tracking-tight">4-Week Structured Journey</h2>
            <p className="font-sans text-[#7A7A72] mt-4 font-light text-base">
              Carefully scaffolded milestones taking you from fresh beginner to skilled no-code agent architect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumPreview.map((item, index) => (
              <div 
                key={index}
                className={`bg-paper p-6 rounded-sm border-t-4 ${item.borderColor} border border-border shadow-sm hover:shadow-md hover:border-orange/40 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${item.textAccent}`}>
                    {item.week}
                  </span>
                  <h3 className="font-display font-medium text-2xl text-navy tracking-tight mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[#7A7A72] text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                
                {/* Meta Topic Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/15">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${item.bgTag}`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION ⑤: What You Will Learn (6-Grid) */}
      <section className="py-20 sm:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <div className="font-mono text-xs uppercase text-orange font-bold tracking-widest mb-3">PROGRAM REWARD STATES</div>
            <h2 className="font-display text-4xl sm:text-5xl text-navy font-light leading-none tracking-tight">
              What You Will <span className="font-semibold italic">Master</span>
            </h2>
            <p className="font-sans text-slate-500 mt-4 font-light">
              We combine core context understanding, advanced prompt structures, and visual pipelines to deliver reliable training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outcomes.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 border border-border rounded-sm shadow-sm hover:border-orange transition-colors flex items-start space-x-4"
              >
                <div className="bg-orange/5 p-3 rounded-sm border border-orange/10 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-navy text-base tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION ⑥: Tools You Will Use */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-border/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-[#7A7A72] uppercase font-bold tracking-wider">ECOSYSTEM STACK</span>
              <h2 className="font-display text-3xl sm:text-4xl text-navy font-medium mt-1">AI Tools in the Classroom</h2>
            </div>
            <span className="font-sans text-sm text-[#7A7A72] font-light mt-2 sm:mt-0">
              Zero coding environments utilized by elite visual developers.
            </span>
          </div>

          {/* Tools Grid / Scrollable Area */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="bg-paper p-4 rounded-sm border border-border text-center hover:border-orange/40 hover:shadow-sm transition-all duration-300"
              >
                <div className="text-3xl mb-2">{tool.emoji}</div>
                <div className="font-sans font-semibold text-sm text-navy">{tool.name}</div>
                <div className="font-mono text-[9px] text-[#7A7A72] tracking-wider mt-1">{tool.type}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION ⑦: Seat Availability / Urgency Block */}
      <section className="py-20 bg-orange-light text-navy border-t border-b border-orange/15">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          
          <span className="font-mono text-xs uppercase bg-orange/10 text-orange border border-orange/20 px-3 py-1 rounded-sm font-bold">
            Cohort Space Assessment
          </span>

          <h2 className="font-display font-medium text-4xl sm:text-5xl text-navy leading-none tracking-tight">
            Only <span className="font-bold underline decoration-orange decoration-4">{remainingSeats} Seats</span> Remaining
          </h2>

          <p className="font-sans text-slate-800 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
            Each Agentic AI Cohort is strictly capped at {totalSeats} students to guarantee absolute individual computer laboratory focus, personalized feedback, and project oversight.
          </p>

          {/* Visual Seat Counters */}
          <div className="flex justify-center flex-wrap gap-2.5 max-w-sm mx-auto my-6 bg-white p-5 rounded-sm border border-border shadow-inner">
            {Array.from({ length: totalSeats }).map((_, idx) => {
              const isTaken = idx < takenSeats;
              return (
                <div
                  key={idx}
                  title={isTaken ? 'Seat Reserved' : 'Seat Available'}
                  className={`w-4.5 h-4.5 rounded-full border transition-all ${
                    isTaken 
                      ? 'bg-orange border-orange shadow-sm shadow-orange/20' 
                      : 'bg-white border-[#FAF7F2] animate-pulse'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono max-w-sm mx-auto">
            <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-orange rounded-full" /> <span>{takenSeats} Seats Taken</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-white border border-border rounded-full" /> <span>{remainingSeats} Left</span></span>
          </div>

          <div>
            <button
              onClick={handleRegisterClick}
              className="font-sans text-sm font-semibold uppercase tracking-wider bg-orange hover:bg-[#C94E16] text-white px-10 py-4.5 rounded-sm transition-all shadow-md shadow-orange/25 cursor-pointer"
            >
              Secure My Seat Now
            </button>
          </div>

        </div>
      </section>

      {/* SECTION ⑧: Camp Details (Info Grid) */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase text-orange font-bold">FACT SHEETS</span>
              <h2 className="font-display text-4xl text-navy font-medium leading-none">Camp Particulars & Information</h2>
              <p className="font-sans text-sm text-slate-500 font-light leading-relaxed">
                Everything you or your parents need to plan for these four weeks. No hidden costs.
              </p>
            </div>

            <div className="lg:col-span-8 Grid w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Details list item 1 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <Calendar className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Session Days</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">Monday to Thursday (Friday reserved)</div>
                  </div>
                </div>

                {/* Details list item 2 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Time Schedule</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">10:00 AM – 12:00 PM (Morning Sessions)</div>
                  </div>
                </div>

                {/* Details list item 3 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <FileText className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Duration</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">4 Weeks (16 primary sessions + Demo event)</div>
                  </div>
                </div>

                {/* Details list item 4 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <Users className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Class Fee</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">PKR 4,998 flat per student</div>
                  </div>
                </div>

                {/* Details list item 5 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Host Location</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">Manzoor Colony, Karachi, Pakistan</div>
                  </div>
                </div>

                {/* Details list item 6 */}
                <div className="bg-white p-5 rounded-sm border border-border hover:shadow-sm transition-shadow flex items-start space-x-4">
                  <GraduationCap className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#7A7A72]">Credentials Output</div>
                    <div className="font-sans font-semibold text-navy text-sm mt-0.5">Official Bright Mind Education Certificate</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION ⑨: FAQ Accordion */}
      <section id="faq" className="py-20 sm:py-24 bg-white border-t border-b border-border/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 font-mono text-xs uppercase bg-paper border border-border px-3 py-1 rounded-sm text-[#7A7A72]">
              <HelpCircle className="w-3.5 h-3.5 text-orange" />
              <span>Inquiries Answered</span>
            </span>
            <h2 className="font-display text-4xl text-navy font-semibold tracking-tight">Frequently Asked Questions</h2>
            <p className="font-sans text-sm text-slate-500 font-light">
              Clear information for students, prospective parents, and guardians.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpened = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border border-border rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 font-sans font-semibold text-navy hover:text-orange flex items-center justify-between bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-orange transition-transform duration-300 shrink-0 ${isOpened ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpened && (
                    <div className="p-5 font-sans text-xs text-[#7A7A72] bg-white border-t border-border line-height-relaxed animate-slide-down">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION ⑩: Final CTA Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF7F20B_1px,transparent_1px),linear-gradient(to_bottom,#FAF7F20B_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            Seats Are Filling Fast
          </h2>
          <p className="font-sans text-white/70 max-w-xl mx-auto leading-relaxed font-light text-sm">
            Launch your student AI journey at Karachi's premium educational institute. Camp fees stand at PKR 4,998. Give yourself the future edge.
          </p>
          <div className="pt-4">
            <button
              onClick={handleRegisterClick}
              className="font-sans text-sm font-semibold uppercase tracking-wider bg-orange hover:bg-[#C94E16] text-white px-10 py-4.5 rounded-sm transition-all cursor-pointer shadow-lg shadow-orange/20"
            >
              Secure My Camp Registration Now
            </button>
          </div>
          <div className="font-mono text-xs text-white/40 pt-4">
            Bright Mind Institute of Education · Karachi
          </div>
        </div>
      </section>

    </div>
  );
}
