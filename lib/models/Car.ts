import mongoose, { Schema, Model, Types } from 'mongoose';

interface IPricing {
  '1-3': number;
  '4-9': number;
  '10-25': number;
  '26+': number;
}

interface ISpecs {
  passengers: number;
  transmission: string;
  fuel: string;
  power?: string;
  engine?: string;
  drive?: string;
  year?: number;
  seats?: number;
}

interface ICar {
  name: string;
  slug: string;
  category: Types.ObjectId;
  categoryName: string;
  price: number;
  pricing: IPricing;
  image: string;
  images: string[];
  specs: ISpecs;
  features: string[];
  description?: string;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const pricingSchema = new Schema<IPricing>({
  '1-3': { type: Number, required: true },
  '4-9': { type: Number, required: true },
  '10-25': { type: Number, required: true },
  '26+': { type: Number, required: true },
}, { _id: false });

const specsSchema = new Schema<ISpecs>({
  passengers: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  power: { type: String },
  engine: { type: String },
  drive: { type: String },
  year: { type: Number },
  seats: { type: Number },
}, { _id: false });

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pricing: {
      type: pricingSchema,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    specs: {
      type: specsSchema,
      required: true,
    },
    features: [{
      type: String,
    }],
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);

export default Car;

