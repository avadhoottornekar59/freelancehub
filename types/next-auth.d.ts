import type { DefaultSession } from "next-auth";

import type { UserRole } from "@/lib/constants";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      isVerified: boolean;
      isBanned: boolean;
      avatar?: string;
    };
  }

  interface User {
    role: UserRole;
    isVerified: boolean;
    isBanned: boolean;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    isVerified?: boolean;
    isBanned?: boolean;
    avatar?: string;
  }
}
