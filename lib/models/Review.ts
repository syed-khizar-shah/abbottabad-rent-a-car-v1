import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  location: string;
  rating: number;
  date: string;
  vehicle: string;
  image?: string;
  review: string;
  helpful: number;
  verified: boolean;
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, required: true },
    vehicle: { type: String, required: true },
    image: { type: String },
    review: { type: String, required: true },
    helpful: { type: Number, default: 0 },
    verified: { type: Boolean, default: true },
    category: { type: String, default: 'general' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default Review;

