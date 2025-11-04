const mongoose = require('mongoose');

const contactMethodSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  details: [{ type: String, required: true }],
  description: { type: String, required: true },
}, { _id: false });

const mapCoordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const businessHourSchema = new mongoose.Schema({
  day: { type: String, required: true },
  hours: { type: String, required: true },
}, { _id: false });

const socialMediaSchema = new mongoose.Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
}, { _id: false });

const contactContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, required: true },
    heroTitleAccent: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroImage: { type: String, required: true },
    contactMethods: [contactMethodSchema],
    services: [{ type: String, required: true }],
    formTitle: { type: String, required: true },
    formSubtitle: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    mapEmbedUrl: { type: String, required: true },
    mapCoordinates: { type: mapCoordinatesSchema, required: true },
    whyChooseUs: [{ type: String, required: true }],
    businessHours: [businessHourSchema],
    socialMedia: { type: socialMediaSchema, default: {} },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.ContactContent || mongoose.model('ContactContent', contactContentSchema);

