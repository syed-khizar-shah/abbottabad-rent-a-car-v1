import mongoose, { Schema, Model } from 'mongoose';

interface ICategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  priceFrom: number;
  image: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'Car',
    },
    features: [{
      type: String,
    }],
    priceFrom: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;

