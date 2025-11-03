const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const valueSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
}, { _id: false });

const milestoneSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const aboutContentSchema = new mongoose.Schema(
  {
    heroBadge: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroImage: { type: String, required: true },
    stats: [statSchema],
    storyTitle: { type: String, required: true },
    storyParagraphs: [{ type: String }],
    storyImage: { type: String, required: true },
    storyButtonText: { type: String, required: true },
    valuesTitle: { type: String, required: true },
    valuesSubtitle: { type: String, required: true },
    values: [valueSchema],
    timelineTitle: { type: String, required: true },
    timelineSubtitle: { type: String, required: true },
    milestones: [milestoneSchema],
    teamTitle: { type: String, required: true },
    teamSubtitle: { type: String, required: true },
    team: [teamMemberSchema],
    certificationsTitle: { type: String, required: true },
    certificationsSubtitle: { type: String, required: true },
    certifications: [{ type: String }],
    ctaTitle: { type: String, required: true },
    ctaSubtitle: { type: String, required: true },
    ctaPrimaryButton: { type: String, required: true },
    ctaSecondaryButton: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.AboutContent || mongoose.model('AboutContent', aboutContentSchema);
