export const USER_ROLES = ["client", "freelancer", "admin"] as const;
export const ORDER_STATUSES = ["pending", "in_progress", "completed"] as const;

export const GIG_CATEGORIES = [
  "Web Development",
  "Design",
  "Writing",
  "Marketing",
  "Video",
  "Mobile Apps",
  "Data",
] as const;

export const SKILL_TEST_SKILLS = [
  "web-development",
  "design",
  "writing",
] as const;

export const DASHBOARD_ROUTES = {
  client: "/dashboard/client",
  freelancer: "/dashboard/freelancer",
  admin: "/dashboard/admin",
} as const;

export type UserRole = (typeof USER_ROLES)[number];
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type SkillSlug = (typeof SKILL_TEST_SKILLS)[number];
