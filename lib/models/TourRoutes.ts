import mongoose, { Schema, Model } from 'mongoose';

interface ITourRoute {
  destination: string;
  oneWay: string;
  twoWay: string;
}

interface ITourCategory {
  category: string;
  routes: ITourRoute[];
}

interface ITourRoutesContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  heroPrimaryCTA: string;
  heroSecondaryCTA: string;
  heroPhone: string;
  heroWhatsApp: string;
  popularDestinationsTitle: string;
  popularDestinations: string[];
  routes: ITourCategory[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryButton: string;
  ctaSecondaryButton: string;
  ctaPhone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const tourRouteSchema = new Schema<ITourRoute>({
  destination: { type: String, required: true },
  oneWay: { type: String, required: true },
  twoWay: { type: String, required: true },
}, { _id: false });

const tourCategorySchema = new Schema<ITourCategory>({
  category: { type: String, required: true },
  routes: [tourRouteSchema],
}, { _id: false });

const tourRoutesContentSchema = new Schema<ITourRoutesContent>(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroBadge: { type: String, required: true },
    heroImage: { type: String, required: true },
    heroPrimaryCTA: { type: String, required: true },
    heroSecondaryCTA: { type: String, required: true },
    heroPhone: { type: String, required: true },
    heroWhatsApp: { type: String, required: true },
    popularDestinationsTitle: { type: String, required: true },
    popularDestinations: [{ type: String }],
    routes: [tourCategorySchema],
    ctaTitle: { type: String, required: true },
    ctaSubtitle: { type: String, required: true },
    ctaPrimaryButton: { type: String, required: true },
    ctaSecondaryButton: { type: String, required: true },
    ctaPhone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TourRoutesContent: Model<ITourRoutesContent> = mongoose.models.TourRoutesContent || mongoose.model<ITourRoutesContent>('TourRoutesContent', tourRoutesContentSchema);

export default TourRoutesContent;

