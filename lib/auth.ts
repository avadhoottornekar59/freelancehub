import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { comparePassword } from "@/lib/password";
import { connectToDatabase } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/env";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        if (!isDatabaseConfigured()) {
          throw new Error("Login is disabled in demo mode until MongoDB is configured.");
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email.toLowerCase() })
          .select("+password")
          .lean();

        if (!user?.password) {
          throw new Error("Invalid email or password.");
        }

        if (user.isBanned) {
          throw new Error("This account has been banned.");
        }

        const isPasswordValid = await comparePassword(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: user.isVerified,
          isBanned: user.isBanned,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.isBanned = user.isBanned;
        token.avatar = user.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "client" | "freelancer" | "admin";
        session.user.isVerified = Boolean(token.isVerified);
        session.user.isBanned = Boolean(token.isBanned);
        session.user.avatar = token.avatar as string | undefined;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const auth = () => getServerSession(authOptions);
