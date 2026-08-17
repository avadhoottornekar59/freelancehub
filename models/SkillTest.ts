import { Model, Schema, model, models } from "mongoose";

interface SkillQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ISkillTest {
  skill: string;
  questions: SkillQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

const skillQuestionSchema = new Schema<SkillQuestion>(
  {
    question: { type: String, required: true, trim: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const skillTestSchema = new Schema<ISkillTest>(
  {
    skill: { type: String, required: true, unique: true, trim: true },
    questions: {
      type: [skillQuestionSchema],
      default: [],
      validate: {
        validator: (questions: SkillQuestion[]) => questions.length > 0,
        message: "At least one question is required.",
      },
    },
  },
  {
    timestamps: true,
  },
);

const SkillTest =
  (models.SkillTest as Model<ISkillTest>) ||
  model<ISkillTest>("SkillTest", skillTestSchema);

export default SkillTest;
