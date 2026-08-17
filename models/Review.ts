import { Model, Schema, Types, model, models } from "mongoose";

export interface IReview {
  orderId: Types.ObjectId;
  clientId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const Review = (models.Review as Model<IReview>) || model<IReview>("Review", reviewSchema);

export default Review;
