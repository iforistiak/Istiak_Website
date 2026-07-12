export type SectionType = 'home' | 'projects' | 'education' | 'skills' | 'services' | 'booking' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'it' | 'web' | 'ecommerce' | 'graphics' | 'all';
  description: string;
  details: string;
  tags: string[];
  image: string;
  link: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  percentage: number;
  color: 'blue' | 'green' | 'red' | 'purple' | 'amber';
  category: 'it-support' | 'systems' | 'design' | 'training';
}

export interface EducationItem {
  id: string;
  institute: string;
  degree: string;
  year: string;
  description: string;
  type: 'school' | 'college' | 'university';
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
