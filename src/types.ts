export type TabVal = 'home' | 'register' | 'handbook' | 'resources' | 'schedule';

export interface RegistrationFormData {
  // Step 1: Personal
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  city: string;
  guardianName: string;
  guardianPhone: string;
  relation: string;

  // Step 2: Education
  schoolName: string;
  grade: string;
  stream: string;
  gradYear: string;
  heardFrom: string[]; // checkboxes

  // Step 3: AI Background
  aiLevel: string; // radio
  interests: string[]; // checkboxes
  motivation: string;
}

export interface Resource {
  id: string;
  type: 'video' | 'article';
  title: string;
  source: string;
  week: number;
  topic: string;
  url: string;
}

export interface ScheduleSession {
  weekNum: number;
  theme: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  sessionName: string;
  dailyPractice: string;
  colorTheme: 'orange' | 'navy' | 'teal' | 'gold';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
