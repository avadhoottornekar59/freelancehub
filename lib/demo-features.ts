import { demoGigs, demoHomeStats } from "@/lib/demo-data";

export interface DemoReview {
  id: string;
  gigId: string;
  freelancerId: string;
  clientName: string;
  clientCompany: string;
  rating: number;
  comment: string;
  createdAt: string;
  projectLabel: string;
}

export interface DemoConversationMessage {
  id: string;
  sender: "client" | "freelancer";
  author: string;
  content: string;
  sentAt: string;
}

export interface DemoConversation {
  id: string;
  gigId: string;
  gigTitle: string;
  participantName: string;
  participantRole: "Client" | "Freelancer";
  orderStage: "Pending" | "In Progress" | "Completed";
  unreadCount: number;
  messages: DemoConversationMessage[];
}

export interface DemoAdminUser {
  id: string;
  name: string;
  role: "Client" | "Freelancer" | "Admin";
  status: "Active" | "Banned" | "Review";
  city: string;
  gigs: number;
  rating: number;
}

export interface DemoAdminOrder {
  id: string;
  gigTitle: string;
  clientName: string;
  freelancerName: string;
  amount: number;
  status: "Pending" | "In Progress" | "Completed";
  flagged: boolean;
}

export interface DemoAdminGig {
  id: string;
  title: string;
  freelancerName: string;
  category: string;
  status: "Live" | "Needs Review" | "Featured";
}

export const demoReviews: DemoReview[] = [
  {
    id: "review-1",
    gigId: "demo-gig-1",
    freelancerId: "demo-user-1",
    clientName: "Naina Patel",
    clientCompany: "Launch Layer",
    rating: 5,
    comment:
      "Aarav turned our rough notes into a clean marketing site and kept communication calm and structured the whole week.",
    createdAt: "2026-03-18T09:30:00.000Z",
    projectLabel: "Startup website refresh",
  },
  {
    id: "review-2",
    gigId: "demo-gig-1",
    freelancerId: "demo-user-1",
    clientName: "Rohan Desai",
    clientCompany: "North Atlas",
    rating: 5,
    comment:
      "Fast delivery, thoughtful edits, and a stronger mobile experience than we expected from the initial brief.",
    createdAt: "2026-03-26T13:15:00.000Z",
    projectLabel: "B2B landing page",
  },
  {
    id: "review-3",
    gigId: "demo-gig-2",
    freelancerId: "demo-user-2",
    clientName: "Mira Khanna",
    clientCompany: "Bloom Studio",
    rating: 4,
    comment:
      "The branding direction felt premium and usable. We especially loved the social kit and typography guidance.",
    createdAt: "2026-03-14T10:10:00.000Z",
    projectLabel: "Brand identity system",
  },
  {
    id: "review-4",
    gigId: "demo-gig-8",
    freelancerId: "demo-user-5",
    clientName: "Aditya Menon",
    clientCompany: "Pocket Sprint",
    rating: 5,
    comment:
      "Sana mapped the onboarding and dashboard flows clearly, which made our MVP build much easier to scope.",
    createdAt: "2026-03-30T16:45:00.000Z",
    projectLabel: "Mobile MVP design",
  },
  {
    id: "review-5",
    gigId: "demo-gig-9",
    freelancerId: "demo-user-6",
    clientName: "Anika Rao",
    clientCompany: "Wave Cart",
    rating: 4,
    comment:
      "Great turnaround on promo edits. Captions, pacing, and export formats were all production-ready for launch week.",
    createdAt: "2026-04-02T11:05:00.000Z",
    projectLabel: "Product launch teaser",
  },
  {
    id: "review-6",
    gigId: "demo-gig-10",
    freelancerId: "demo-user-7",
    clientName: "Kunal Shah",
    clientCompany: "Signal Dock",
    rating: 5,
    comment:
      "Dev delivered a dashboard structure our internal team could actually use. The filters and reporting views were excellent.",
    createdAt: "2026-04-04T08:20:00.000Z",
    projectLabel: "Operations dashboard",
  },
];

export const demoConversations: DemoConversation[] = [
  {
    id: "thread-1",
    gigId: "demo-gig-1",
    gigTitle: "Build a modern business website in Next.js",
    participantName: "Aarav Mehta",
    participantRole: "Freelancer",
    orderStage: "In Progress",
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        sender: "freelancer",
        author: "Aarav",
        content: "I have the homepage draft ready. Do you want the CTA to push demos or direct contact?",
        sentAt: "2026-04-18T09:15:00.000Z",
      },
      {
        id: "msg-2",
        sender: "client",
        author: "You",
        content: "Let us optimize for demos first. We can keep the direct contact option in the footer.",
        sentAt: "2026-04-18T09:21:00.000Z",
      },
      {
        id: "msg-3",
        sender: "freelancer",
        author: "Aarav",
        content: "Perfect. I will update the hero and send the mobile version next.",
        sentAt: "2026-04-18T09:25:00.000Z",
      },
    ],
  },
  {
    id: "thread-2",
    gigId: "demo-gig-8",
    gigTitle: "Launch a mobile app UI kit for MVP founders",
    participantName: "Sana Ali",
    participantRole: "Freelancer",
    orderStage: "Pending",
    unreadCount: 0,
    messages: [
      {
        id: "msg-4",
        sender: "client",
        author: "You",
        content: "Sharing our app idea and the three main screens we need in phase one.",
        sentAt: "2026-04-17T14:00:00.000Z",
      },
      {
        id: "msg-5",
        sender: "freelancer",
        author: "Sana",
        content: "This looks like a good fit. I recommend confirming your onboarding and dashboard priorities first.",
        sentAt: "2026-04-17T14:18:00.000Z",
      },
    ],
  },
  {
    id: "thread-3",
    gigId: "demo-gig-9",
    gigTitle: "Produce short-form promo videos for product launches",
    participantName: "Ishaan Verma",
    participantRole: "Freelancer",
    orderStage: "Completed",
    unreadCount: 0,
    messages: [
      {
        id: "msg-6",
        sender: "freelancer",
        author: "Ishaan",
        content: "Final exports are uploaded in vertical, square, and landscape sizes.",
        sentAt: "2026-04-15T18:02:00.000Z",
      },
      {
        id: "msg-7",
        sender: "client",
        author: "You",
        content: "Received. The pacing is great and the captions are exactly what we needed.",
        sentAt: "2026-04-15T18:09:00.000Z",
      },
    ],
  },
];

export const demoAdminUsers: DemoAdminUser[] = [
  {
    id: "admin-user-1",
    name: "Aarav Mehta",
    role: "Freelancer",
    status: "Active",
    city: "Pune",
    gigs: 2,
    rating: 4.9,
  },
  {
    id: "admin-user-2",
    name: "Riya Kapoor",
    role: "Freelancer",
    status: "Active",
    city: "Mumbai",
    gigs: 2,
    rating: 4.8,
  },
  {
    id: "admin-user-3",
    name: "Kabir Sinha",
    role: "Freelancer",
    status: "Review",
    city: "Bengaluru",
    gigs: 3,
    rating: 4.6,
  },
  {
    id: "admin-user-4",
    name: "Naina Patel",
    role: "Client",
    status: "Active",
    city: "Ahmedabad",
    gigs: 0,
    rating: 4.7,
  },
  {
    id: "admin-user-5",
    name: "Legacy Test Account",
    role: "Client",
    status: "Banned",
    city: "Delhi",
    gigs: 0,
    rating: 2.1,
  },
];

export const demoAdminOrders: DemoAdminOrder[] = [
  {
    id: "order-1",
    gigTitle: "Build a modern business website in Next.js",
    clientName: "Naina Patel",
    freelancerName: "Aarav Mehta",
    amount: 18000,
    status: "In Progress",
    flagged: false,
  },
  {
    id: "order-2",
    gigTitle: "Launch a mobile app UI kit for MVP founders",
    clientName: "Aditya Menon",
    freelancerName: "Sana Ali",
    amount: 26000,
    status: "Pending",
    flagged: true,
  },
  {
    id: "order-3",
    gigTitle: "Produce short-form promo videos for product launches",
    clientName: "Anika Rao",
    freelancerName: "Ishaan Verma",
    amount: 17000,
    status: "Completed",
    flagged: false,
  },
];

export const demoAdminGigs: DemoAdminGig[] = demoGigs.slice(0, 6).map((gig, index) => ({
  id: gig._id,
  title: gig.title,
  freelancerName: gig.freelancerId?.name ?? "Freelancer",
  category: gig.category,
  status: index === 0 ? "Featured" : index % 3 === 0 ? "Needs Review" : "Live",
}));

export const demoAdminStatsExtended = {
  users: demoAdminUsers.length,
  gigs: demoGigs.length,
  orders: demoAdminOrders.length,
  revenue: demoHomeStats.revenue,
  flaggedOrders: demoAdminOrders.filter((order) => order.flagged).length,
};

export function getGigReviews(gigId: string) {
  return demoReviews.filter((review) => review.gigId === gigId);
}

export function getFreelancerReviews(freelancerId: string) {
  return demoReviews.filter((review) => review.freelancerId === freelancerId);
}

export function getAverageRating(reviews: DemoReview[]) {
  if (reviews.length === 0) {
    return 0;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
}

export function getConversationByGigId(gigId: string) {
  return demoConversations.find((conversation) => conversation.gigId === gigId) ?? null;
}
