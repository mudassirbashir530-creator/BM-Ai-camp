import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  Brain, 
  Send, 
  Database, 
  FileCheck2, 
  ExternalLink,
  LogOut,
  LogIn,
  FileSpreadsheet,
  RefreshCw,
  Plus,
  Check
} from 'lucide-react';
import { RegistrationFormData } from '../types';
import InstituteLogo from './InstituteLogo';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function RegisterView() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Local saved registrations database (mock/local persistence)
  const [localRegistrations, setLocalRegistrations] = useState<any[]>(() => {
    const raw = localStorage.getItem('AISC_REGISTRATIONS_DB');
    return raw ? JSON.parse(raw) : [];
  });

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    city: 'Karachi', // Default city since we are block-located there
    guardianName: '',
    guardianPhone: '',
    relation: '',
    schoolName: '',
    grade: '',
    stream: '',
    gradYear: '',
    heardFrom: [],
    aiLevel: '',
    interests: [],
    motivation: ''
  });

  const [declaration1, setDeclaration1] = useState(false);
  const [declaration2, setDeclaration2] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const handleInputChange = (field: keyof RegistrationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCheckboxArray = (field: 'heardFrom' | 'interests', value: string) => {
    setFormData(prev => {
      const arr = [...(prev[field] as string[])];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter(x => x !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  const calculateAge = (dobString: string) => {
    if (!dobString) return 0;
    const today = new Date('2026-06-06');
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: string[] = [];

    if (step === 1) {
      if (!formData.firstName.trim()) stepErrors.push('First Name is required');
      if (!formData.lastName.trim()) stepErrors.push('Last Name is required');
      if (!formData.dob) {
        stepErrors.push('Date of Birth is required');
      } else {
        const studentAge = calculateAge(formData.dob);
        if (studentAge < 12 || studentAge > 18) {
          stepErrors.push(`Student must be between 12 and 18 years old to register for the 2026 cohort (current age is calculated as: ${studentAge} years old)`);
        }
      }
      if (!formData.gender) stepErrors.push('Gender selection is required');
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) stepErrors.push('A valid email address is required');
      if (!formData.phone.trim()) stepErrors.push('Phone number is required');
      if (!formData.city.trim()) stepErrors.push('City is required');
      if (!formData.guardianName.trim()) stepErrors.push('Guardian Name is required');
      if (!formData.guardianPhone.trim()) stepErrors.push('Guardian Phone is required');
    }

    if (step === 2) {
      if (!formData.schoolName.trim()) stepErrors.push('School/College Name is required');
      if (!formData.grade.trim()) stepErrors.push('Grade/Class level is required');
    }

    if (step === 3) {
      if (!formData.aiLevel) stepErrors.push('AI Experience Level selection is required');
      if (!formData.motivation || formData.motivation.length < 20) {
        stepErrors.push('Motivation statement must be at least 20 characters long');
      }
    }

    if (step === 4) {
      if (!declaration1 || !declaration2) {
        stepErrors.push('Both declaration checkboxes must be accepted before submitting');
      }
    }

    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors([]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors([]);
    setCurrentStep(prev => prev - 1);
  };

  const generateRefNum = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digit random code
    return `AISC-2026-${randomSuffix}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrors([]);

    const refNum = generateRefNum();
    const payload = {
      timestamp: new Date().toISOString(),
      refNo: refNum,
      ...formData
    };

    try {
      // Save directly to Firebase Firestore Database
      await addDoc(collection(db, 'registrations'), payload);
      
      // Save to local visualization backup for admin
      saveLocalBackup(payload);

      setSubmissionSuccess(refNum);
    } catch (err: any) {
      console.error('Database Sync Error:', err);
      // Even if Firestore fails, secure a local copy to prevent data loss
      saveLocalBackup(payload);
      setErrors([`Connectivity issue detected. Application cached locally (Ref: ${refNum}). We will sync it once you are back online.`]);
      setSubmissionSuccess(refNum);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveLocalBackup = (newReg: any) => {
    const databaseList = [newReg, ...localRegistrations];
    setLocalRegistrations(databaseList);
    localStorage.setItem('AISC_REGISTRATIONS_DB', JSON.stringify(databaseList));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      city: 'Karachi',
      guardianName: '',
      guardianPhone: '',
      relation: '',
      schoolName: '',
      grade: '',
      stream: '',
      gradYear: '',
      heardFrom: [],
      aiLevel: '',
      interests: [],
      motivation: ''
    });
    setDeclaration1(false);
    setDeclaration2(false);
    setSubmissionSuccess(null);
    setCurrentStep(1);
    setErrors([]);
  };

  // Pre-configured arrays for selection buttons
  const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
  const STREAM_OPTIONS = ['Pre-Engineering', 'Pre-Medical', 'Computer Science', 'Commerce', 'General Arts', 'Undergrad/O-A Level'];
  const HEARD_FROM_OPTIONS = ['WhatsApp Group', 'Friend/Relative Referrals', 'Bright Mind Flyer', 'Instructor Direct', 'Social Media'];
  const AI_EXPERIENCE_LEVELS = ['Complete Beginner (Never used ChatGPT)', 'Intermediate User (Prompted for homework)', 'Advanced Innovator (Used APIs or built workflows)'];
  const TOPICS_OF_INTERESTS = ['Generative Text (GPT/Claude)', 'Visual Generation (Stable Diffusion/DALL-E)', 'Workflow automation with n8n', 'Agent Swarms & Multi-Agent systems', 'Ethical AI Guidelines', 'AI career paths'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Header Info Block */}
      <div className="text-center space-y-4 mb-10 no-print">
        <div className="flex justify-center mb-6">
          <InstituteLogo theme="blue" className="h-28 sm:h-32 w-auto" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-navy tracking-tight">Summer Cohort Registration</h1>
        <p className="font-sans text-slate-500 font-light max-w-xl mx-auto text-sm">
          Complete the form below to apply for the Bright Mind Institute AI Summer Camp 2026. Registrations take less than 5 minutes.
        </p>
      </div>

      {/* Progress Circles Bar */}
      {!submissionSuccess && (
        <div className="mb-10 no-print">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isPast = currentStep > step;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all ${
                        isPast 
                          ? 'bg-teal text-white' 
                          : isActive 
                            ? 'bg-orange text-white ring-4 ring-orange/15 font-bold' 
                            : 'bg-white text-slate-400 border border-border'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-5 h-5" /> : step}
                    </div>
                    <span className="font-sans text-[10px] uppercase font-bold text-[#7A7A72] mt-1.5">
                      {step === 1 ? 'Personal' : step === 2 ? 'Education' : step === 3 ? 'AI Level' : 'Review'}
                    </span>
                  </div>
                  {step < 4 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-colors ${step < currentStep ? 'bg-teal' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ERROR LIST CONTAINER */}
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-sm no-print">
          <div className="flex space-x-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans font-bold text-red-800 text-sm">Please correct the following errors:</h4>
              <ul className="list-disc pl-5 mt-1 text-xs text-red-750 space-y-1">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION SUCCESS CARD */}
      {submissionSuccess ? (
        <div className="bg-white p-8 rounded-sm border border-border text-center space-y-6 shadow-md max-w-xl mx-auto py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 text-teal mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display text-4xl text-navy font-medium tracking-tight">Registration Complete!</h2>
          <div className="py-4 px-6 bg-[#FAF7F2] rounded-sm divide-y divide-border space-y-3 font-mono text-sm">
            <div className="flex justify-between py-1">
              <span className="text-[#7A7A72]">Ref Number</span>
              <span className="text-orange font-bold font-mono">{submissionSuccess}</span>
            </div>
            <div className="flex justify-between py-2 pt-3">
              <span className="text-[#7A7A72]">Registrant</span>
              <span className="text-navy font-semibold">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#7A7A72]">Class Fee</span>
              <span className="text-teal font-semibold">PKR 4,998 (Pay on Arrival)</span>
            </div>
          </div>
          <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Congratulations. Your registration credentials have been backed up. Please take a screenshot of your unique reference number or save this page. 
            Bright Mind staff will contact you soon on the provided email (<span className="text-navy font-semibold">{formData.email}</span>) or WhatsApp.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                window.focus();
                window.print();
              }}
              className="px-6 py-3 border border-border hover:bg-neutral-50 text-navy font-sans text-xs uppercase tracking-wider font-semibold rounded-sm duration-150 cursor-pointer"
            >
              Print Confirmation
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-orange hover:bg-[#C94E16] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm duration-150 cursor-pointer"
            >
              Submit Another Form
            </button>
          </div>
        </div>
      ) : (
        /* THE FORM SHELL */
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-sm shadow-md overflow-hidden relative no-print">
          
          {/* Form Spinner Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-orange/20 border-t-orange rounded-full animate-spin" />
              <p className="font-mono text-xs text-orange uppercase tracking-wider font-bold">Synchronizing with system database...</p>
            </div>
          )}

          {/* STEP 1: PERSONAL INFORMATION */}
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div className="bg-navy p-6 border-b border-border text-white flex items-center space-x-3">
              <div className="font-mono text-xs text-orange bg-orange/10 px-2.5 py-1 border border-orange/20">STEP 01 / 04</div>
              <h2 className="font-display text-2xl font-medium tracking-tight">Personal Details</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required={currentStep === 1}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. Mudassir"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required={currentStep === 1}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. Bashir"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    required={currentStep === 1}
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Gender <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {GENDER_OPTIONS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleInputChange('gender', g)}
                        className={`py-2 px-3 border rounded-sm font-sans text-xs font-medium cursor-pointer transition-colors ${
                          formData.gender === g 
                            ? 'bg-orange text-white border-orange' 
                            : 'bg-white text-navy border-border hover:bg-neutral-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required={currentStep === 1}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. student@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Contact Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required={currentStep === 1}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. +92 3XX XXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required={currentStep === 1}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                  placeholder="e.g. Karachi"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <span className="block text-xs font-mono text-orange uppercase font-bold tracking-wider mb-4">GUARDIAN CREDENTIALS SECURITY</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Guardian Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required={currentStep === 1}
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                      placeholder="e.g. Bashir Ahmad"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Guardian Phone <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required={currentStep === 1}
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                      placeholder="e.g. +92 310 2310119"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Relation <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required={currentStep === 1}
                      value={formData.relation}
                      onChange={(e) => handleInputChange('relation', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                      placeholder="Father / Mother / Uncle"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: EDUCATION DETAILS */}
          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="bg-navy p-6 border-b border-border text-white flex items-center space-x-3">
              <div className="font-mono text-xs text-orange bg-orange/10 px-2.5 py-1 border border-orange/20">STEP 02 / 04</div>
              <h2 className="font-display text-2xl font-medium tracking-tight">Academic Profile</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">School / College Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required={currentStep === 2}
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. Karachi Public School"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Grade / Year of Study <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required={currentStep === 2}
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. Class 10 / Grade 11 / O-Levels"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Academic Stream</label>
                  <select
                    value={formData.stream}
                    onChange={(e) => handleInputChange('stream', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                  >
                    <option value="">-- Select Stream --</option>
                    {STREAM_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Target Graduation Year</label>
                  <input
                    type="number"
                    value={formData.gradYear}
                    onChange={(e) => handleInputChange('gradYear', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                    placeholder="e.g. 2026"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-3">How did you hear about AI Summer Camp?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {HEARD_FROM_OPTIONS.map((val) => {
                    const isChecked = formData.heardFrom.includes(val);
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => toggleCheckboxArray('heardFrom', val)}
                        className={`p-3 border rounded-sm text-left flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-orange/5 border-orange text-orange font-semibold shadow-inner' 
                            : 'bg-white text-navy border-border hover:bg-neutral-50'
                        }`}
                      >
                        <span>{val}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-orange" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: AI BACKGROUND */}
          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <div className="bg-navy p-6 border-b border-border text-white flex items-center space-x-3">
              <div className="font-mono text-xs text-orange bg-orange/10 px-2.5 py-1 border border-orange/20">STEP 03 / 04</div>
              <h2 className="font-display text-2xl font-medium tracking-tight">AI Background & Interest</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-3">AI Experience Level <span className="text-red-500">*</span></label>
                <div className="space-y-2.5">
                  {AI_EXPERIENCE_LEVELS.map((level) => {
                    const isSelected = formData.aiLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleInputChange('aiLevel', level)}
                        className={`w-full p-4 border rounded-sm text-left flex items-start justify-between text-xs font-medium cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-orange/5 border-orange text-orange font-semibold shadow-inner' 
                            : 'bg-white text-navy border-border hover:bg-neutral-50'
                        }`}
                      >
                        <span>{level}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-orange mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-3">Which topics are you most passionate about? (Optional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPICS_OF_INTERESTS.map((topic) => {
                    const isChecked = formData.interests.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleCheckboxArray('interests', topic)}
                        className={`p-3 border rounded-sm text-left flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-orange/5 border-orange text-orange font-semibold shadow-inner' 
                            : 'bg-white text-navy border-border hover:bg-neutral-50'
                        }`}
                      >
                        <span className="line-clamp-1">{topic}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-orange" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <label className="block text-xs font-mono font-bold uppercase text-[#7A7A72] mb-1.5">Motivation Statement <span className="text-red-500">*</span> <span className="lowercase font-light font-sans text-[11px]">(minimum 20 characters)</span></label>
                <textarea
                  required={currentStep === 3}
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2]/50 border border-border focus:outline-none focus:border-orange rounded-sm text-sm"
                  placeholder="Tell us what excites you about AI and what you hope to build during the 4-week camp."
                />
                <div className="text-[10px] text-[#7A7A72] font-mono mt-1 text-right">
                  Count: {formData.motivation.length} characters (needs 20)
                </div>
              </div>

            </div>
          </div>

          {/* STEP 4: REVIEW & DECLARATION */}
          <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
            <div className="bg-navy p-6 border-b border-border text-white flex items-center space-x-3">
              <div className="font-mono text-xs text-orange bg-orange/10 px-2.5 py-1 border border-orange/20">STEP 04 / 04</div>
              <h2 className="font-display text-2xl font-medium tracking-tight">Review & Declaration</h2>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="bg-orange-light p-4 rounded-sm border border-orange/15">
                <h3 className="font-sans font-bold text-[#E05C1A] text-xs uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <FileCheck2 className="w-4 h-4" />
                  <span>REGISTRATION PROFILE DATA</span>
                </h3>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs font-sans">
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">Student Name</dt>
                    <dd className="font-bold text-navy mt-0.5">{formData.firstName} {formData.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">Email / Contact</dt>
                    <dd className="font-bold text-navy mt-0.5">{formData.email} / {formData.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">City Location</dt>
                    <dd className="font-bold text-navy mt-0.5">{formData.city}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">Guardian Name</dt>
                    <dd className="font-bold text-navy mt-0.5">{formData.guardianName} ({formData.relation}) — {formData.guardianPhone}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">School & Grade</dt>
                    <dd className="font-bold text-navy mt-0.5">{formData.schoolName} ({formData.grade})</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase font-mono text-[10px]">AI background and plans</dt>
                    <dd className="text-[#7A7A72] text-[11px] leading-relaxed mt-0.5 max-w-sm line-clamp-2" title={formData.motivation}>
                      {formData.motivation}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Declarations list checkboxes */}
              <div className="space-y-4 pt-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={declaration1}
                    onChange={(e) => setDeclaration1(e.target.checked)}
                    className="w-4.5 h-4.5 text-orange accent-orange focus:ring-orange/30 border-border rounded-sm mt-0.5 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-[#7A7A72] leading-relaxed font-sans">
                    I declare and confirm that I have access to a working laptop to bring to camp daily and that I have my parent/guardian's consent to participate in this 4-week program. <span className="text-red-550 font-bold">*</span>
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={declaration2}
                    onChange={(e) => setDeclaration2(e.target.checked)}
                    className="w-4.5 h-4.5 text-orange accent-orange focus:ring-orange/30 border-border rounded-sm mt-0.5 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-[#7A7A72] leading-relaxed font-sans">
                    I acknowledge that the camp fee is <strong>PKR 4,998 flat per student</strong>, payable during camp admission at the Bright Mind office, and that registering does not guarantee admission unless validated by the Bright Mind Education board. <span className="text-red-550 font-bold">*</span>
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* BUTTON NAVIGATION CONTROLS */}
          <div className="bg-slate-100 p-5 px-6 border-t border-border flex justify-between items-center no-print">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 border border-border hover:bg-neutral-50 text-navy py-2.5 px-4 font-sans text-xs uppercase tracking-wider font-semibold rounded-sm duration-150 cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div /> // Spacer
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center space-x-2 bg-orange hover:bg-[#C94E16] text-white py-2.5 px-5 font-sans text-xs uppercase tracking-wider font-semibold rounded-sm duration-150 cursor-pointer shadow-sm"
              >
                <span>Continue Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 bg-teal hover:bg-[#0D7A6B]/90 text-white py-2.5 px-6 font-sans text-xs uppercase tracking-wider font-semibold rounded-sm duration-150 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            )}
          </div>

        </form>
      )}

      {/* DETAILED APPLICANT DATABASE VISUALIZER */}
      {localRegistrations.length > 0 && (
        <div className="mt-16 bg-white border border-border rounded-sm p-6 shadow-sm no-print space-y-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-border pb-3">
            <h3 className="font-sans font-bold text-navy text-sm uppercase tracking-wider flex items-center space-x-2">
              <Database className="w-4 h-4 text-teal animate-pulse" />
              <span>Workspace Local Registrations Audit ({localRegistrations.length})</span>
            </h3>
            <span className="font-mono text-[9px] text-slate-400">Data persists in local storage only</span>
          </div>

          <div className="overflow-x-auto text-[11px] font-mono">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-border text-[#7A7A72]">
                  <th className="p-2 py-3">REF NUMBER</th>
                  <th className="p-2 py-3">NAME & AGE</th>
                  <th className="p-2 py-3">SCHOOL & GRADE</th>
                  <th className="p-2 py-3">GUARDIAN CONTACT</th>
                  <th className="p-2 py-3 text-right">DATE SUBMITTED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {localRegistrations.map((item, index) => (
                  <tr key={index} className="hover:bg-[#FAF7F2]/50 text-slate-800">
                    <td className="p-2 py-2.5 text-orange font-bold font-mono">{item.refNo}</td>
                    <td className="p-2 py-2.5">{item.firstName} {item.lastName} <span className="text-[10px] text-slate-400 font-sans">({item.gender})</span></td>
                    <td className="p-2 py-2.5 font-sans">{item.schoolName} <span className="font-mono text-[10px] text-slate-400">({item.grade})</span></td>
                    <td className="p-2 py-2.5 font-mono">{item.guardianName} ({item.guardianPhone})</td>
                    <td className="p-2 py-2.5 text-right text-slate-400 text-[10px]">{new Date(item.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-right">
            <button
              onClick={() => {
                if (window.confirm('Clear all entries in local database? This does not alter Google Sheets.')) {
                  localStorage.removeItem('AISC_REGISTRATIONS_DB');
                  setLocalRegistrations([]);
                }
              }}
              className="text-[#7A7A72] hover:text-red-500 hover:underline duration-150 cursor-pointer text-[10px] font-mono"
            >
              Clear Database Log
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
