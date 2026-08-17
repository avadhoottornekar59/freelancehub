import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    await connectToDatabase();

    const existingUser = await User.findOne({ email: parsed.email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 },
      );
    }

    if (parsed.role === "admin") {
      if (!process.env.ADMIN_INVITE_CODE) {
        return NextResponse.json(
          { message: "ADMIN_INVITE_CODE is not configured for admin registration." },
          { status: 503 },
        );
      }

      if (parsed.inviteCode !== process.env.ADMIN_INVITE_CODE) {
        return NextResponse.json(
          { message: "A valid admin invite code is required." },
          { status: 403 },
        );
      }
    }

    const hashedPassword = await hashPassword(parsed.password);

    await User.create({
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      password: hashedPassword,
      role: parsed.role,
      skills: [],
      isVerified: parsed.role === "admin",
    });

    return NextResponse.json({
      message: "Registration successful. You can now sign in.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to register your account.",
      },
      { status: 400 },
    );
  }
}
