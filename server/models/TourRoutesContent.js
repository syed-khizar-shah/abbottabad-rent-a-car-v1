const mongoose = require('mongoose');

const tourRouteSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  oneWay: { type: String, required: true },
  twoWay: { type: String, required: true },
}, { _id: false });

const tourCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  routes: [tourRouteSchema],
}, { _id: false });

const tourRoutesContentSchema = new mongoose.Schema(
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

module.exports = mongoose.models.TourRoutesContent || mongoose.model('TourRoutesContent', tourRoutesContentSchema);
