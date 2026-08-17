import { Model, Schema, Types, model, models } from "mongoose";

import { ORDER_STATUSES } from "@/lib/constants";

export interface IOrder {
  gigId: Types.ObjectId;
  clientId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  status: (typeof ORDER_STATUSES)[number];
  paymentId: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    gigId: { type: Schema.Types.ObjectId, ref: "Gig", required: true, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending",
    },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

const Order = (models.Order as Model<IOrder>) || model<IOrder>("Order", orderSchema);

export default Order;
