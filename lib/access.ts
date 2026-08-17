import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import type { UserRole } from "@/lib/constants";
import { isDatabaseConfigured } from "@/lib/env";
import User from "@/models/User";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id || !isDatabaseConfigured()) {
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(session.user.id).select("-password").lean();

  if (!user || user.isBanned) {
    return null;
  }

  return user;
}

export async function requireUser(roles?: UserRole[]) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  if (roles && !roles.includes(user.role)) {
    return null;
  }

  return user;
}
