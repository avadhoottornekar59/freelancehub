import { Model, Schema, Types, model, models } from "mongoose";

export interface IAvailability {
  freelancerId: Types.ObjectId;
  availableDates: Date[];
  createdAt?: Date;
  updatedAt?: Date;
}

const availabilitySchema = new Schema<IAvailability>(
  {
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    availableDates: [{ type: Date }],
  },
  {
    timestamps: true,
  },
);

const Availability =
  (models.Availability as Model<IAvailability>) ||
  model<IAvailability>("Availability", availabilitySchema);

export default Availability;
