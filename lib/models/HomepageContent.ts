import mongoose, { Schema, Model } from 'mongoose';

interface IStats {
  value: string;
  label: string;
  icon: string;
}

interface IOffer {
  title: string;
  description: string;
  discount: string;
  icon: string;
  color: string;
}

interface IBenefit {
  icon: string;
  title: string;
  description: string;
}

interface ITestimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  image?: string;
}

interface IFAQ {
  question: string;
  answer: string;
}

interface IHomepageContent {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  heroPrimaryCTA: string;
  heroSecondaryCTA: string;
  stats: IStats[];
  categoriesSectionTitle: string;
  categoriesSectionSubtitle: string;
  categoriesSectionBadge: string;
  offersSectionTitle: string;
  offersSectionSubtitle: string;
  offersSectionBadge: string;
  offers: IOffer[];
  brandsSectionTitle: string;
  brandsSectionSubtitle: string;
  brands: string[];
  featuredSectionTitle: string;
  featuredSectionSubtitle: string;
  featuredSectionBadge: string;
  testimonialsSectionTitle: string;
  testimonialsSectionSubtitle: string;
  testimonialsSectionBadge: string;
  testimonials: ITestimonial[];
  benefitsSectionTitle: string;
  benefitsSectionSubtitle: string;
  benefitsSectionBadge: string;
  benefits: IBenefit[];
  faqSectionTitle: string;
  faqSectionSubtitle: string;
  faqSectionBadge: string;
  faqs: IFAQ[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBadge: string;
  ctaPrimaryButton: string;
  ctaSecondaryButton: string;
  ctaPhone: string;
  ctaEmail: string;
  ctaAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const statsSchema = new Schema<IStats>({
  value: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
}, { _id: false });

const offerSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
}, { _id: false });

const benefitSchema = new Schema<IBenefit>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const faqSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const testimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  text: { type: String, required: true },
  image: { type: String },
}, { _id: false });

const homepageContentSchema = new Schema<IHomepageContent>(
  {
    heroTitle: { type: String, required: true },
    heroTitleAccent: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroBadge: { type: String, required: true },
    heroImage: { type: String, required: true },
    heroPrimaryCTA: { type: String, required: true },
    heroSecondaryCTA: { type: String, required: true },
    stats: [statsSchema],
    categoriesSectionTitle: { type: String, required: true },
    categoriesSectionSubtitle: { type: String, required: true },
    categoriesSectionBadge: { type: String, required: true },
    offersSectionTitle: { type: String, required: true },
    offersSectionSubtitle: { type: String, required: true },
    offersSectionBadge: { type: String, required: true },
    offers: [offerSchema],
    brandsSectionTitle: { type: String, required: true },
    brandsSectionSubtitle: { type: String, default: '' },
    brands: [{ type: String }],
    featuredSectionTitle: { type: String, required: true },
    featuredSectionSubtitle: { type: String, required: true },
    featuredSectionBadge: { type: String, required: true },
    testimonialsSectionTitle: { type: String, required: true },
    testimonialsSectionSubtitle: { type: String, required: true },
    testimonialsSectionBadge: { type: String, required: true },
    testimonials: [testimonialSchema],
    benefitsSectionTitle: { type: String, required: true },
    benefitsSectionSubtitle: { type: String, required: true },
    benefitsSectionBadge: { type: String, required: true },
    benefits: [benefitSchema],
    faqSectionTitle: { type: String, required: true },
    faqSectionSubtitle: { type: String, required: true },
    faqSectionBadge: { type: String, required: true },
    faqs: [faqSchema],
    ctaTitle: { type: String, required: true },
    ctaSubtitle: { type: String, required: true },
    ctaBadge: { type: String, required: true },
    ctaPrimaryButton: { type: String, required: true },
    ctaSecondaryButton: { type: String, required: true },
    ctaPhone: { type: String, required: true },
    ctaEmail: { type: String, required: true },
    ctaAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const HomepageContent: Model<IHomepageContent> = mongoose.models.HomepageContent || mongoose.model<IHomepageContent>('HomepageContent', homepageContentSchema);

export default HomepageContent;

