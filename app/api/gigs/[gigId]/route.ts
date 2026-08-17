import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/access";
import { connectToDatabase } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/env";
import { getGigById } from "@/lib/services/gig-service";
import { gigSchema } from "@/lib/validations";
import Gig from "@/models/Gig";

interface RouteContext {
  params: {
    gigId: string;
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const gig = await getGigById(params.gigId);

  if (!gig) {
    return NextResponse.json({ message: "Gig not found." }, { status: 404 });
  }

  return NextResponse.json(gig);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { message: "Database is not configured yet. Demo mode only supports browsing." },
        { status: 503 },
      );
    }

    const user = await requireUser(["freelancer", "admin"]);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    if (!Types.ObjectId.isValid(params.gigId)) {
      return NextResponse.json({ message: "Invalid gig id." }, { status: 400 });
    }

    const body = await request.json();
    const parsed = gigSchema.parse(body);

    await connectToDatabase();
    const existingGig = await Gig.findById(params.gigId);

    if (!existingGig) {
      return NextResponse.json({ message: "Gig not found." }, { status: 404 });
    }

    if (
      user.role !== "admin" &&
      String(existingGig.freelancerId) !== String(user._id)
    ) {
      return NextResponse.json({ message: "Forbidden." }, { status: 403 });
    }

    existingGig.set(parsed);
    await existingGig.save();

    return NextResponse.json(existingGig);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unable to update gig.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Database is not configured yet. Demo mode only supports browsing." },
      { status: 503 },
    );
  }

  const user = await requireUser(["freelancer", "admin"]);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!Types.ObjectId.isValid(params.gigId)) {
    return NextResponse.json({ message: "Invalid gig id." }, { status: 400 });
  }

  await connectToDatabase();
  const gig = await Gig.findById(params.gigId);

  if (!gig) {
    return NextResponse.json({ message: "Gig not found." }, { status: 404 });
  }

  if (user.role !== "admin" && String(gig.freelancerId) !== String(user._id)) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  await gig.deleteOne();

  return NextResponse.json({ message: "Gig deleted." });
}
