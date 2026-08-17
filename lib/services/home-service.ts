import Gig from "@/models/Gig";
import Order from "@/models/Order";
import { connectToDatabase } from "@/lib/db";
import { demoGigs, demoHomeStats } from "@/lib/demo-data";
import { isDatabaseConfigured } from "@/lib/env";
import { serializeData } from "@/lib/utils";
import type { GigListItem } from "@/lib/services/gig-service";

export async function getHomePageData() {
  if (!isDatabaseConfigured()) {
    return {
      featuredGigs: demoGigs.slice(0, 4),
      stats: demoHomeStats,
    };
  }

  await connectToDatabase();

  const [featuredGigs, totalOrders, revenueAggregate, activeGigs] = await Promise.all([
    Gig.find({})
      .populate("freelancerId", "name avatar isVerified")
      .sort({ rating: -1, createdAt: -1 })
      .limit(6)
      .lean(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    Gig.countDocuments(),
  ]);

  return serializeData({
    featuredGigs,
    stats: {
      totalOrders,
      revenue: revenueAggregate[0]?.total ?? 0,
      activeGigs,
    },
  }) as unknown as {
    featuredGigs: GigListItem[];
    stats: {
      totalOrders: number;
      revenue: number;
      activeGigs: number;
    };
  };
}
