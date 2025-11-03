const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  '1-3': { type: Number, required: true },
  '4-9': { type: Number, required: true },
  '10-25': { type: Number, required: true },
  '26+': { type: Number, required: true }
}, { _id: false });

const specsSchema = new mongoose.Schema({
  passengers: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  power: { type: String },
  engine: { type: String },
  drive: { type: String },
  year: { type: Number },
  seats: { type: Number }
}, { _id: false });

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pricing: {
    type: pricingSchema,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  specs: {
    type: specsSchema,
    required: true
  },
  features: [{
    type: String
  }],
  description: {
    type: String
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);


