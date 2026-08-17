import { Model, Schema, Types, model, models } from "mongoose";

import { GIG_CATEGORIES } from "@/lib/constants";

export interface IGig {
  title: string;
  description: string;
  category: (typeof GIG_CATEGORIES)[number];
  price: number;
  deliveryTime: number;
  images: string[];
  freelancerId: Types.ObjectId;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const gigSchema = new Schema<IGig>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: GIG_CATEGORIES, required: true },
    price: { type: Number, required: true, min: 0 },
    deliveryTime: { type: Number, required: true, min: 1 },
    images: [{ type: String, required: true }],
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Gig = (models.Gig as Model<IGig>) || model<IGig>("Gig", gigSchema);

export default Gig;
