const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);

