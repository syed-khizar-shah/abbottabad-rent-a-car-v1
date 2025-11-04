const mongoose = require('mongoose');

const businessHourSchema = new mongoose.Schema({
  day: { type: String, required: true },
  hours: { type: String, required: true },
}, { _id: false });

const landmarkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: String, required: true },
}, { _id: false });

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const locationContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroImage: { type: String, required: true },
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    coordinates: { type: coordinatesSchema, required: true },
    businessHours: [businessHourSchema],
    landmarks: [landmarkSchema],
    mapEmbedUrl: { type: String, required: true },
    ctaTitle: { type: String, required: true },
    ctaSubtitle: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.LocationContent || mongoose.model('LocationContent', locationContentSchema);

