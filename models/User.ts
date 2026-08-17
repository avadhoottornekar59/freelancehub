import { Model, Schema, model, models } from "mongoose";

import { USER_ROLES } from "@/lib/constants";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: (typeof USER_ROLES)[number];
  avatar?: string;
  bio?: string;
  skills: string[];
  isVerified: boolean;
  isBanned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, required: true },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
