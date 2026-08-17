import { NextResponse } from "next/server";

import { requireUser } from "@/lib/access";
import { connectToDatabase } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/env";
import { getGigs } from "@/lib/services/gig-service";
import { gigSchema } from "@/lib/validations";
import Gig from "@/models/Gig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const gigs = await getGigs({
    category: searchParams.get("category") ?? undefined,
    minPrice: searchParams.get("minPrice") ?? undefined,
    maxPrice: searchParams.get("maxPrice") ?? undefined,
    rating: searchParams.get("rating") ?? undefined,
  });

  return NextResponse.json(gigs);
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { message: "Database is not configured yet. Demo mode only supports browsing." },
        { status: 503 },
      );
    }

    const user = await requireUser(["freelancer"]);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = gigSchema.parse(body);

    await connectToDatabase();

    const gig = await Gig.create({
      ...parsed,
      freelancerId: user._id,
    });

    return NextResponse.json(gig, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unable to create gig.",
      },
      { status: 400 },
    );
  }
}
