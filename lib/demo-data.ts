import type { GigListItem } from "@/lib/services/gig-service";
import type { SkillSlug } from "@/lib/constants";

export interface DemoSkillQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DemoSkillTest {
  slug: SkillSlug;
  title: string;
  summary: string;
  passingScore: number;
  questions: DemoSkillQuestion[];
}

export interface DemoAvailabilityProfile {
  userId: string;
  name: string;
  title: string;
  timezone: string;
  summary: string;
  availableDates: string[];
}

export const demoGigs: GigListItem[] = [
  {
    _id: "demo-gig-1",
    title: "Build a modern business website in Next.js",
    description:
      "I will design and develop a responsive Next.js website for your business with clean UI, strong performance, and a polished launch-ready layout.",
    category: "Web Development",
    price: 18000,
    deliveryTime: 5,
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    videoIntroUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    rating: 4.9,
    freelancerId: {
      _id: "demo-user-1",
      name: "Aarav Mehta",
      avatar: "",
      isVerified: true,
      bio: "Full-stack developer focused on startup websites and dashboards.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  },
  {
    _id: "demo-gig-2",
    title: "Create premium brand identity and social media kit",
    description:
      "I will craft a visual identity package with logo directions, brand colors, typography, and ready-to-use social media assets for your launch.",
    category: "Design",
    price: 12000,
    deliveryTime: 4,
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    ],
    videoIntroUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    rating: 4.8,
    freelancerId: {
      _id: "demo-user-2",
      name: "Riya Kapoor",
      avatar: "",
      isVerified: true,
      bio: "Brand designer helping small teams look established from day one.",
      skills: ["Branding", "Figma", "Adobe Illustrator"],
    },
  },
  {
    _id: "demo-gig-3",
    title: "Write high-converting website and landing page copy",
    description:
      "I will write clear, persuasive copy for your homepage, product page, or landing page so your offer feels sharper and converts better.",
    category: "Writing",
    price: 8500,
    deliveryTime: 3,
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    ],
    rating: 4.7,
    freelancerId: {
      _id: "demo-user-3",
      name: "Kabir Sinha",
      avatar: "",
      isVerified: false,
      bio: "Conversion writer for SaaS, creators, and service businesses.",
      skills: ["Copywriting", "SEO", "Content Strategy"],
    },
  },
  {
    _id: "demo-gig-4",
    title: "Set up targeted ads and growth campaign strategy",
    description:
      "I will create a practical paid marketing plan with campaign structure, targeting suggestions, and launch assets for your first growth sprint.",
    category: "Marketing",
    price: 15000,
    deliveryTime: 6,
    images: [
      "https://images.unsplash.com/photo-1557838923-2985c318be48",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
    rating: 4.6,
    freelancerId: {
      _id: "demo-user-4",
      name: "Neha Sharma",
      avatar: "",
      isVerified: true,
      bio: "Performance marketer focused on lead generation and launch campaigns.",
      skills: ["Meta Ads", "Google Ads", "Analytics"],
    },
  },
  {
    _id: "demo-gig-5",
    title: "Design a SaaS dashboard with Figma and handoff notes",
    description:
      "I will design a clean SaaS dashboard experience with reusable components, responsive screens, and a practical handoff for development.",
    category: "Design",
    price: 22000,
    deliveryTime: 7,
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    ],
    rating: 4.9,
    freelancerId: {
      _id: "demo-user-2",
      name: "Riya Kapoor",
      avatar: "",
      isVerified: true,
      bio: "Brand and product designer helping digital teams ship interfaces with clarity.",
      skills: ["Figma", "Design Systems", "Dashboard UX"],
    },
  },
  {
    _id: "demo-gig-6",
    title: "Develop a portfolio or landing page with clean animations",
    description:
      "I will build a modern landing page or personal portfolio with smooth interactions, mobile responsiveness, and a polished final presentation.",
    category: "Web Development",
    price: 14500,
    deliveryTime: 4,
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
    rating: 4.8,
    freelancerId: {
      _id: "demo-user-1",
      name: "Aarav Mehta",
      avatar: "",
      isVerified: true,
      bio: "Full-stack developer focused on startup websites and dashboards.",
      skills: ["React", "Next.js", "Motion"],
    },
  },
  {
    _id: "demo-gig-7",
    title: "Write SEO blog articles and content calendar for your niche",
    description:
      "I will create a keyword-aware content plan and write blog articles that fit your brand voice while staying readable and structured.",
    category: "Writing",
    price: 9500,
    deliveryTime: 5,
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    ],
    rating: 4.7,
    freelancerId: {
      _id: "demo-user-3",
      name: "Kabir Sinha",
      avatar: "",
      isVerified: false,
      bio: "Conversion writer for SaaS, creators, and service businesses.",
      skills: ["SEO Writing", "Editorial Planning", "Content Strategy"],
    },
  },
  {
    _id: "demo-gig-8",
    title: "Launch a mobile app UI kit for MVP founders",
    description:
      "I will design a sharp mobile app UI kit with onboarding, dashboard, settings, and key flows ready for early-stage product teams.",
    category: "Mobile Apps",
    price: 26000,
    deliveryTime: 8,
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    ],
    videoIntroUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    rating: 4.8,
    freelancerId: {
      _id: "demo-user-5",
      name: "Sana Ali",
      avatar: "",
      isVerified: true,
      bio: "Mobile product designer focused on MVP flows, app polish, and handoff-ready systems.",
      skills: ["Mobile UI", "Prototype Design", "Figma"],
    },
  },
  {
    _id: "demo-gig-9",
    title: "Produce short-form promo videos for product launches",
    description:
      "I will edit crisp launch videos, reels, and feature teasers with motion, captions, and platform-ready exports for your campaign.",
    category: "Video",
    price: 17000,
    deliveryTime: 5,
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ],
    rating: 4.6,
    freelancerId: {
      _id: "demo-user-6",
      name: "Ishaan Verma",
      avatar: "",
      isVerified: true,
      bio: "Video editor for startup launches, reels, and fast-turn campaign assets.",
      skills: ["Premiere Pro", "Motion Graphics", "Short-form Video"],
    },
  },
  {
    _id: "demo-gig-10",
    title: "Build a lightweight analytics dashboard for internal teams",
    description:
      "I will create an internal analytics dashboard with charts, filters, role-aware views, and a clean operational layout for fast decisions.",
    category: "Data",
    price: 32000,
    deliveryTime: 9,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
    rating: 4.9,
    freelancerId: {
      _id: "demo-user-7",
      name: "Dev Malhotra",
      avatar: "",
      isVerified: true,
      bio: "Data product builder focused on dashboards, reports, and operational analytics.",
      skills: ["Dashboards", "Data Visualization", "Product Analytics"],
    },
  },
  {
    _id: "demo-gig-11",
    title: "Create a conversion-focused email sequence for your offer",
    description:
      "I will write a welcome flow, sales nudges, and retention emails tailored to your product so you can follow up with clarity and intent.",
    category: "Writing",
    price: 7800,
    deliveryTime: 3,
    images: [
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    ],
    rating: 4.5,
    freelancerId: {
      _id: "demo-user-3",
      name: "Kabir Sinha",
      avatar: "",
      isVerified: false,
      bio: "Conversion writer for SaaS, creators, and service businesses.",
      skills: ["Email Copy", "Launch Messaging", "Retention"],
    },
  },
  {
    _id: "demo-gig-12",
    title: "Run a paid acquisition audit and campaign reset",
    description:
      "I will review your ad account, fix obvious leak points, simplify campaign structure, and propose a cleaner testing plan for the next sprint.",
    category: "Marketing",
    price: 14000,
    deliveryTime: 4,
    images: [
      "https://images.unsplash.com/photo-1557838923-2985c318be48",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
    rating: 4.7,
    freelancerId: {
      _id: "demo-user-4",
      name: "Neha Sharma",
      avatar: "",
      isVerified: true,
      bio: "Performance marketer focused on lead generation and launch campaigns.",
      skills: ["Audit", "Paid Growth", "Campaign Strategy"],
    },
  },
];

export const demoHomeStats = {
  totalOrders: 128,
  revenue: 485000,
  activeGigs: demoGigs.length,
};

export const demoSkillTests: DemoSkillTest[] = [
  {
    slug: "web-development",
    title: "Web Development Verification",
    summary: "Test core frontend and product-building instincts with a short practical quiz.",
    passingScore: 70,
    questions: [
      {
        id: "web-1",
        question: "Which Next.js feature is best for fetching data at request time in the App Router?",
        options: ["Client-side useEffect", "Server components", "Static HTML exports", "CSS Modules"],
        correctAnswer: 1,
      },
      {
        id: "web-2",
        question: "Why is TypeScript valuable in a growing product codebase?",
        options: [
          "It removes the need for tests",
          "It catches many integration mistakes earlier",
          "It makes all code run faster automatically",
          "It replaces state management",
        ],
        correctAnswer: 1,
      },
      {
        id: "web-3",
        question: "What is the main benefit of component reusability?",
        options: [
          "Every page looks identical",
          "Less duplication and easier maintenance",
          "No need for design systems",
          "Database queries become faster",
        ],
        correctAnswer: 1,
      },
      {
        id: "web-4",
        question: "Which practice best improves frontend performance?",
        options: [
          "Shipping the largest possible bundle",
          "Avoiding any loading states",
          "Reducing unnecessary client-side work",
          "Putting all logic in one file",
        ],
        correctAnswer: 2,
      },
      {
        id: "web-5",
        question: "When should a form show inline validation feedback?",
        options: [
          "Only after the site deploys",
          "As users interact or submit invalid data",
          "Never, because it distracts users",
          "Only on desktop",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    slug: "design",
    title: "Design Verification",
    summary: "Show that you can balance visual craft, hierarchy, clarity, and client goals.",
    passingScore: 70,
    questions: [
      {
        id: "design-1",
        question: "What makes visual hierarchy effective?",
        options: [
          "All elements having the same size",
          "Clear emphasis through scale, spacing, and contrast",
          "Using as many fonts as possible",
          "Hiding the call-to-action",
        ],
        correctAnswer: 1,
      },
      {
        id: "design-2",
        question: "A strong brand system should primarily help with what?",
        options: [
          "Confusing every touchpoint",
          "Consistency across different outputs",
          "Replacing content strategy entirely",
          "Avoiding collaboration",
        ],
        correctAnswer: 1,
      },
      {
        id: "design-3",
        question: "What is the purpose of whitespace in interface design?",
        options: [
          "To waste screen space",
          "To create structure and improve readability",
          "To remove all interaction",
          "To hide poor typography",
        ],
        correctAnswer: 1,
      },
      {
        id: "design-4",
        question: "What should a designer understand before picking colors?",
        options: [
          "The product goals and audience",
          "Only personal taste",
          "How many animations are on the page",
          "The database schema",
        ],
        correctAnswer: 0,
      },
      {
        id: "design-5",
        question: "Which feedback response is most professional?",
        options: [
          "Ignoring the client",
          "Defending every decision emotionally",
          "Explaining tradeoffs and iterating thoughtfully",
          "Restarting the project every time",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    slug: "writing",
    title: "Writing Verification",
    summary: "Check tone, clarity, structure, and persuasive communication for client-facing work.",
    passingScore: 70,
    questions: [
      {
        id: "writing-1",
        question: "Good product copy should first be:",
        options: ["Clear", "Long", "Abstract", "Complicated"],
        correctAnswer: 0,
      },
      {
        id: "writing-2",
        question: "What improves readability the most?",
        options: [
          "Dense paragraphs with no breaks",
          "Short sentences and strong structure",
          "Using jargon in every line",
          "Avoiding headings",
        ],
        correctAnswer: 1,
      },
      {
        id: "writing-3",
        question: "Why is audience awareness important?",
        options: [
          "It helps match tone and message to reader needs",
          "It eliminates editing",
          "It guarantees SEO rankings",
          "It removes the need for research",
        ],
        correctAnswer: 0,
      },
      {
        id: "writing-4",
        question: "A strong call-to-action should be:",
        options: ["Vague", "Passive", "Specific and direct", "Hidden in the footer"],
        correctAnswer: 2,
      },
      {
        id: "writing-5",
        question: "Editing is valuable because it:",
        options: [
          "Usually weakens the message",
          "Sharpens clarity and removes friction",
          "Makes all content shorter no matter what",
          "Only matters for print",
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export const demoAvailabilityProfiles: DemoAvailabilityProfile[] = [
  {
    userId: "demo-user-1",
    name: "Aarav Mehta",
    title: "Next.js Product Developer",
    timezone: "Asia/Kolkata",
    summary: "Best for startup websites, dashboards, and MVP polish work.",
    availableDates: [
      "2026-04-07",
      "2026-04-08",
      "2026-04-10",
      "2026-04-12",
      "2026-04-14",
      "2026-04-16",
      "2026-04-17",
      "2026-04-21",
      "2026-04-22",
      "2026-04-24",
    ],
  },
  {
    userId: "demo-user-2",
    name: "Riya Kapoor",
    title: "Brand Identity Designer",
    timezone: "Asia/Kolkata",
    summary: "Available for visual systems, launch kits, and brand refreshes.",
    availableDates: [
      "2026-04-06",
      "2026-04-09",
      "2026-04-11",
      "2026-04-13",
      "2026-04-15",
      "2026-04-18",
      "2026-04-20",
      "2026-04-23",
      "2026-04-25",
      "2026-04-27",
    ],
  },
  {
    userId: "demo-user-3",
    name: "Kabir Sinha",
    title: "Conversion Copywriter",
    timezone: "Asia/Kolkata",
    summary: "Ideal for landing pages, email sequences, and offer positioning.",
    availableDates: [
      "2026-04-05",
      "2026-04-07",
      "2026-04-09",
      "2026-04-12",
      "2026-04-13",
      "2026-04-15",
      "2026-04-19",
      "2026-04-20",
      "2026-04-26",
      "2026-04-28",
    ],
  },
  {
    userId: "demo-user-4",
    name: "Neha Sharma",
    title: "Performance Marketing Strategist",
    timezone: "Asia/Kolkata",
    summary: "Strong fit for campaign audits, paid growth, and launch planning.",
    availableDates: [
      "2026-04-08",
      "2026-04-10",
      "2026-04-11",
      "2026-04-16",
      "2026-04-18",
      "2026-04-22",
      "2026-04-24",
      "2026-04-26",
    ],
  },
  {
    userId: "demo-user-5",
    name: "Sana Ali",
    title: "Mobile UI Designer",
    timezone: "Asia/Kolkata",
    summary: "Available for MVP mobile UI systems, flows, and clickable prototypes.",
    availableDates: [
      "2026-04-07",
      "2026-04-09",
      "2026-04-12",
      "2026-04-14",
      "2026-04-17",
      "2026-04-21",
      "2026-04-23",
      "2026-04-29",
    ],
  },
  {
    userId: "demo-user-6",
    name: "Ishaan Verma",
    title: "Launch Video Editor",
    timezone: "Asia/Kolkata",
    summary: "Great for short-form edits, feature teasers, and fast-turn campaign videos.",
    availableDates: [
      "2026-04-06",
      "2026-04-08",
      "2026-04-13",
      "2026-04-15",
      "2026-04-19",
      "2026-04-20",
      "2026-04-25",
      "2026-04-27",
    ],
  },
  {
    userId: "demo-user-7",
    name: "Dev Malhotra",
    title: "Analytics Dashboard Specialist",
    timezone: "Asia/Kolkata",
    summary: "Available for dashboards, analytics views, and internal product reporting.",
    availableDates: [
      "2026-04-05",
      "2026-04-08",
      "2026-04-10",
      "2026-04-14",
      "2026-04-18",
      "2026-04-19",
      "2026-04-22",
      "2026-04-30",
    ],
  },
];

export const demoAdminStats = {
  users: 312,
  gigs: demoGigs.length,
  orders: 128,
  verifiedFreelancers: demoGigs.filter((gig) => gig.freelancerId?.isVerified).length,
};
