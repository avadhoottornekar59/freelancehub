import { z } from "zod";

import { GIG_CATEGORIES, ORDER_STATUSES, USER_ROLES } from "@/lib/constants";

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters long.");

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email address."),
  password: passwordRule,
  role: z.enum(USER_ROLES),
  inviteCode: z.string().optional(),
});

export const gigSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(30, "Description must be at least 30 characters."),
  category: z.enum(GIG_CATEGORIES),
  price: z.coerce.number().min(500, "Minimum gig price is 500 INR."),
  deliveryTime: z.coerce.number().int().min(1).max(60),
  images: z
    .array(z.string().url("Enter valid image URLs."))
    .min(1, "At least one image is required.")
    .max(5, "Use up to 5 images."),
});

export const messageSchema = z.object({
  orderId: z.string().min(1),
  receiverId: z.string().min(1),
  content: z.string().min(1).max(2000),
});

export const reviewSchema = z.object({
  orderId: z.string().min(1),
  freelancerId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000),
});

export const availabilitySchema = z.object({
  availableDates: z
    .array(z.string().datetime({ offset: true }))
    .or(z.array(z.string().date())),
});

export const orderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});

export const paymentOrderSchema = z.object({
  gigId: z.string().min(1),
});

export const paymentVerificationSchema = z.object({
  gigId: z.string().min(1),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export const skillTestSubmissionSchema = z.object({
  answers: z.record(z.coerce.number().int().min(0)),
});

export const estimatorSchema = z.object({
  projectType: z.string().min(2),
  features: z.string().min(10),
  deadline: z.string().min(3),
  budgetContext: z.string().optional(),
});
