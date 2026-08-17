import { Types } from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { demoGigs } from "@/lib/demo-data";
import { isDatabaseConfigured } from "@/lib/env";
import Gig from "@/models/Gig";
import { serializeData } from "@/lib/utils";

export interface GigListItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: number;
  images: string[];
  videoIntroUrl?: string;
  rating: number;
  freelancerId?: {
    _id?: string;
    name?: string;
    avatar?: string;
    isVerified?: boolean;
    bio?: string;
    skills?: string[];
  };
}

export interface FreelancerGigItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: number;
  images: string[];
  videoIntroUrl?: string;
}

export interface GigFilters {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
}

function buildGigFilters(filters: GigFilters) {
  const query: Record<string, unknown> = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};

    if (filters.minPrice) {
      (query.price as Record<string, number>).$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      (query.price as Record<string, number>).$lte = Number(filters.maxPrice);
    }
  }

  if (filters.rating) {
    query.rating = { $gte: Number(filters.rating) };
  }

  return query;
}

function applyGigFilters(gigs: GigListItem[], filters: GigFilters) {
  return gigs.filter((gig) => {
    if (filters.category && gig.category !== filters.category) {
      return false;
    }

    if (filters.minPrice && gig.price < Number(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice && gig.price > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.rating && gig.rating < Number(filters.rating)) {
      return false;
    }

    return true;
  });
}

export async function getGigs(filters: GigFilters = {}) {
  if (!isDatabaseConfigured()) {
    return applyGigFilters(demoGigs, filters);
  }

  await connectToDatabase();

  const gigs = await Gig.find(buildGigFilters(filters))
    .populate("freelancerId", "name avatar isVerified")
    .sort({ createdAt: -1 })
    .lean();

  return serializeData(gigs) as unknown as GigListItem[];
}

export async function getGigById(gigId: string) {
  if (!isDatabaseConfigured()) {
    return demoGigs.find((gig) => gig._id === gigId) ?? null;
  }

  if (!Types.ObjectId.isValid(gigId)) {
    return null;
  }

  await connectToDatabase();

  const gig = await Gig.findById(gigId)
    .populate("freelancerId", "name avatar bio skills isVerified")
    .lean();

  return serializeData(gig) as unknown as GigListItem | null;
}

export async function getFreelancerGigs(freelancerId: string) {
  if (!isDatabaseConfigured()) {
    return demoGigs
      .filter((gig) => gig.freelancerId?._id === freelancerId)
      .map(({ _id, title, description, category, price, deliveryTime, images, videoIntroUrl }) => ({
        _id,
        title,
        description,
        category,
        price,
        deliveryTime,
        images,
        videoIntroUrl,
      }));
  }

  await connectToDatabase();

  const gigs = await Gig.find({ freelancerId }).sort({ createdAt: -1 }).lean();

  return serializeData(gigs) as unknown as FreelancerGigItem[];
}
