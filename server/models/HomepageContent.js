const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true }
}, { _id: false });

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
}, { _id: false });

const benefitSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  text: { type: String, required: true },
  image: { type: String }
}, { _id: false });

const homepageContentSchema = new mongoose.Schema({
  // Hero Section
  heroTitle: { type: String, required: true },
  heroTitleAccent: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroBadge: { type: String, required: true },
  heroImage: { type: String, required: true },
  heroPrimaryCTA: { type: String, required: true },
  heroSecondaryCTA: { type: String, required: true },
  
  // Stats Bar
  stats: [statsSchema],
  
  // Vehicle Categories Section
  categoriesSectionTitle: { type: String, required: true },
  categoriesSectionSubtitle: { type: String, required: true },
  categoriesSectionBadge: { type: String, required: true },
  
  // Offers Section
  offersSectionTitle: { type: String, required: true },
  offersSectionSubtitle: { type: String, required: true },
  offersSectionBadge: { type: String, required: true },
  offers: [offerSchema],
  
  // Brands Section
  brandsSectionTitle: { type: String, required: true },
  brandsSectionSubtitle: { type: String, required: true },
  brands: [{ type: String }],
  
  // Featured Vehicles Section
  featuredSectionTitle: { type: String, required: true },
  featuredSectionSubtitle: { type: String, required: true },
  featuredSectionBadge: { type: String, required: true },
  
  // Testimonials Section
  testimonialsSectionTitle: { type: String, required: true },
  testimonialsSectionSubtitle: { type: String, required: true },
  testimonialsSectionBadge: { type: String, required: true },
  testimonials: [testimonialSchema],
  
  // Benefits Section
  benefitsSectionTitle: { type: String, required: true },
  benefitsSectionSubtitle: { type: String, required: true },
  benefitsSectionBadge: { type: String, required: true },
  benefits: [benefitSchema],
  
  // CTA Section
  ctaTitle: { type: String, required: true },
  ctaSubtitle: { type: String, required: true },
  ctaBadge: { type: String, required: true },
  ctaPrimaryButton: { type: String, required: true },
  ctaSecondaryButton: { type: String, required: true },
  ctaPhone: { type: String, required: true },
  ctaEmail: { type: String, required: true },
  ctaAddress: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('HomepageContent', homepageContentSchema);
