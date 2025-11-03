import mongoose, { Schema, Model } from 'mongoose';

interface IStat {
  label: string;
  value: string;
}

interface IValue {
  icon: string;
  title: string;
  description: string;
}

interface ITeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface IMilestone {
  year: string;
  title: string;
  description: string;
}

interface IAboutContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  stats: IStat[];
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  storyButtonText: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: IValue[];
  timelineTitle: string;
  timelineSubtitle: string;
  milestones: IMilestone[];
  teamTitle: string;
  teamSubtitle: string;
  team: ITeamMember[];
  certificationsTitle: string;
  certificationsSubtitle: string;
  certifications: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryButton: string;
  ctaSecondaryButton: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const statSchema = new Schema<IStat>({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const valueSchema = new Schema<IValue>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const teamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
}, { _id: false });

const milestoneSchema = new Schema<IMilestone>({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const aboutContentSchema = new Schema<IAboutContent>(
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

const AboutContent: Model<IAboutContent> = mongoose.models.AboutContent || mongoose.model<IAboutContent>('AboutContent', aboutContentSchema);

export default AboutContent;

