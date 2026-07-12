import { Project, Skill, EducationItem } from './types';

export const PROFILE_INFO = {
  name: 'Md. Istiak Islam',
  nickname: 'Istiak',
  tagline: 'Creative Mind, Expert Solutions',
  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfcaG48pqttCGyk_lyBVM7hV6o27XHEDB7_-lOYy1HRVHmhW59qqjZE4g&s=10',
  titles: [
    'IT Professional',
    'IT Course Instructor',
    'IT Support Administrator',
    'E-commerce Manager',
    'Graphics Designer'
  ],
  bioBengali: 'আইটি এবং ওয়েব টেকনোলজির এই দুনিয়ায় আমি আপনার আইডিয়াগুলোকে বাস্তবে রূপ দিতে কাজ করি। নেটওয়ার্কিং, সিস্টেম অ্যাডমিনিস্ট্রেশন, গ্রাফিক্স ডিজাইন এবং ই-কমার্স সলিউশনে আমার দীর্ঘ কাজের অভিজ্ঞতা রয়েছে।',
  bioEnglish: 'In this fast-paced world of IT and Web Technology, I bridge the gap between creative design and complex server execution. From managing enterprise network setups and e-commerce architectures to instructing next-generation IT leaders, I strive for high performance and clean aesthetics.',
  whatsappUrl: 'https://wa.me/8801640092412',
  phone: '+880 1640-092412',
  email: 'iforistiak@gmail.com',
  location: 'Rajshahi, Bangladesh',
  telegramUrl: 'https://t.me/iforistiak',
  githubUrl: 'https://github.com/iforistiak',
  linkedinUrl: 'https://linkedin.com/in/thistiak',
  facebookUrl: 'https://www.facebook.com/mdistiakislamamin',
  instagramUrl: 'https://instagram.com/istiakislam_',
  pinterestUrl: 'https://pinterest.com/iforistiak',
  stats: [
    { label: 'IT Solutions Deployed', value: '150+' },
    { label: 'E-commerce Clients Managed', value: '45+' },
    { label: 'Hours of IT Mentorship', value: '800+' },
    { label: 'Systems Configured', value: '300+' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Network & IT Infrastructure Setup',
    category: 'it',
    description: 'High-availability router, firewall, and local network virtualization design for a corporate office.',
    details: 'This project involved designing, installing, and managing secure corporate hardware environments. We integrated redundant WAN gateways, custom security firewalls, internal file synchronization servers (NAS), and robust offline domain directories to optimize team workflow.',
    tags: ['MikroTik RouterOS', 'Network Security', 'Firewall Rules', 'NAS Storage', 'Active Directory'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  },
  {
    id: 'proj-2',
    title: 'E-Commerce Ecosystem & Catalog Automation',
    category: 'ecommerce',
    description: 'A robust digital retail management pipeline featuring automated bulk product imports and stock synchronization.',
    details: 'Designed and deployed an integrated administrative dashboard for an active multi-vendor shop. Configured payment gateways, customized checkout routes, optimized server loading times, and trained staff on inventory controls.',
    tags: ['WooCommerce', 'Shopify Admin', 'Inventory Sync', 'Payment Gateway Integration', 'SEO'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  },
  {
    id: 'proj-3',
    title: 'Brand Identity & Visual Graphics Pack',
    category: 'graphics',
    description: 'A comprehensive branding visual kit including high-definition vector logos, banner assets, and flyers.',
    details: 'Formulated visual identities for online businesses to boost social engagement. Crafted high-fidelity vector graphics, responsive display banners, and promotional cards using industry-standard design tools.',
    tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Branding Kit', 'Vector Assets', 'Social Layouts'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  },
  {
    id: 'proj-4',
    title: 'Next-Gen IT Course & Training Portal',
    category: 'web',
    description: 'A bespoke responsive online web landing page and training hub designed for IT course enrollment.',
    details: 'Developed a custom high-performance React-based learning management layout. It features course curriculums, interactive quizzes, video player modules, student dashboards, and clean scheduling integrations.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'LMS UI'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  },
  {
    id: 'proj-5',
    title: 'Automated Software Deployment Server',
    category: 'it',
    description: 'Automated script-driven software installation suite to deploy essential workplace apps simultaneously.',
    details: 'Implemented custom shell and PowerShell script automation to instantly setup Windows and Linux environments, saving over 2 hours of manual technical setup per machine for large training labs.',
    tags: ['Shell Scripting', 'OS Deployment', 'PowerShell', 'SysPrep', 'Automated Installs'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  },
  {
    id: 'proj-6',
    title: 'Social Media Management & Organic Growth Campaign',
    category: 'graphics',
    description: 'Strategic audience targeting, custom content calendars, and professional asset management.',
    details: 'Designed and organized daily creative assets, formulated structured targeting models, and grew an online page community organic footprint by 150% in three months via specialized content distribution workflows.',
    tags: ['Social Marketing', 'Content Calendars', 'Analytics Tracking', 'Audience Growth'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    link: 'https://github.com/iforistiak'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Social Media Management', percentage: 90, color: 'blue', category: 'design' },
  { name: 'IT Support (Online & Offline)', percentage: 90, color: 'green', category: 'it-support' },
  { name: 'Computer Software & Hardware Setup', percentage: 85, color: 'red', category: 'it-support' },
  { name: 'E-commerce Management', percentage: 80, color: 'purple', category: 'systems' },
  { name: 'Administrator System Controls', percentage: 95, color: 'amber', category: 'systems' },
  { name: 'Team Work & Collaboration', percentage: 80, color: 'red', category: 'training' },
  { name: 'Mentorship in IT Courses', percentage: 85, color: 'blue', category: 'training' },
  { name: 'Network Troubleshooting & Routing', percentage: 75, color: 'green', category: 'it-support' },
  { name: 'Graphics Design & Vector Art', percentage: 80, color: 'purple', category: 'design' }
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'edu-1',
    institute: 'Masjid Mission Academy School & College, Rajshahi',
    degree: 'Primary & Lower Secondary Education',
    year: 'Class - Play to Seven',
    description: 'Laid down strong academic baselines, active participation in science exhibitions, and initial fascination with computer peripherals and office software.',
    type: 'school'
  },
  {
    id: 'edu-2',
    institute: 'Rajshahi Lokenath High School, Rajshahi',
    degree: 'Secondary School Certificate (SSC)',
    year: 'Class - Eight to Ten',
    description: 'Focused on computer science basics, digital drafting, and self-taught software installation procedures. Engaged deeply in team projects and hardware experimentation.',
    type: 'school'
  },
  {
    id: 'edu-3',
    institute: "Shahid Mamun Mahmud Police Lines School & College, Rajshahi",
    degree: 'Higher Secondary Certificate (HSC)',
    year: 'Class - Eleven to Twelve',
    description: 'Specialized pre-university academic work. Developed key communication skills, participated in institutional technical support setups, and coordinated laboratory workshops.',
    type: 'college'
  },
  {
    id: 'edu-4',
    institute: 'Rajshahi Court College, Rajshahi',
    degree: 'Bachelor of Arts (BA)',
    year: 'Under National University of Bangladesh',
    description: 'Acquiring critical humanities perspectives, analytical reasoning, and research methods. Balancing university studies with freelance IT administration, client consultancies, and course tutoring.',
    type: 'university'
  }
];

export const SERVICES = [
  {
    id: 'srv-1',
    title: 'PC Diagnostics & Hardware Setup',
    basePrice: 15,
    unit: 'Device',
    description: 'Full software installation, BIOS configurations, driver tuning, thermal paste application, and OS optimization.',
    estimatedHours: 2,
    icon: 'Laptop'
  },
  {
    id: 'srv-2',
    title: 'E-commerce Admin & Catalog Management',
    basePrice: 120,
    unit: 'Month',
    description: 'Full catalog configuration, bulk spreadsheet imports, stock level tracking, checkout gateway setup, and promotional codes system.',
    estimatedHours: 15,
    icon: 'ShoppingBag'
  },
  {
    id: 'srv-3',
    title: 'Digital Branding & Vector Graphics',
    basePrice: 40,
    unit: 'Project',
    description: 'Logo creation, corporate business cards, banner kits, and fully structured editable vector source files (.AI, .PSD).',
    estimatedHours: 5,
    icon: 'Palette'
  },
  {
    id: 'srv-4',
    title: 'Corporate Network Infrastructure Setup',
    basePrice: 150,
    unit: 'Setup',
    description: 'MikroTik router configuration, dual-WAN failover configs, secure firewalls, LAN routing paths, and shared network drives.',
    estimatedHours: 10,
    icon: 'Network'
  },
  {
    id: 'srv-5',
    title: '1-on-1 IT Course Mentorship Session',
    basePrice: 25,
    unit: 'Hour',
    description: 'Private personalized lesson on IT admin, system maintenance, software workflows, or graphical composition with step-by-step guidance.',
    estimatedHours: 1,
    icon: 'GraduationCap'
  }
];

export const MOCK_BOT_RESPONSES: Record<string, string[]> = {
  general: [
    "Hello! I am Istiak's automated portfolio assistant. What can I help you with today? Feel free to ask about my skills, education, or projects!",
    "Hi there! Nice to meet you. You can browse through my tabs on the sidebar or book a session directly from the Booking tab.",
    "Hey! If you want to discuss a custom project, click the 'Lets Talk' button on my profile to connect instantly via WhatsApp (+8801640092412)."
  ],
  skills: [
    "I specialize in IT Support (both software and hardware setup), Systems Administration (Active Directory, router configuration), and E-commerce management.",
    "For visual designs, I am highly proficient in Adobe Photoshop and Illustrator, creating corporate logos, banners, and vector assets.",
    "I also have deep experience in teaching. I mentor students in IT courses, teaching them system administration and computer troubleshooting techniques."
  ],
  projects: [
    "I have worked on several key projects, including high-availability corporate networks using MikroTik, complex e-commerce catalog automations, and LMS course portals.",
    "You can see all details of my projects in the 'Projects' tab! Every item features descriptions of technologies used and links."
  ],
  booking: [
    "Booking a consultation is easy! Simply head over to the 'Booking' tab in the sidebar, fill in your details, and select your preferred date/time.",
    "All bookings made here are saved to your local browser storage so you can review and track them instantly."
  ],
  education: [
    "I completed my high school in Masid Mission Academy and Lokenath High School, Rajshahi.",
    "I completed my college at Shahid Mamun Mahmud Police Line's School & College, Rajshahi.",
    "Currently, I am pursuing my Bachelor of Arts (BA) at Rajshahi Court College, which is affiliated with the National University of Bangladesh."
  ]
};
