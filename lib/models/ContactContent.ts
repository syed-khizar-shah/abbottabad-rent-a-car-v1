import mongoose, { Schema, Model } from 'mongoose';

interface IContactMethod {
  icon: string;
  title: string;
  details: string[];
  description: string;
}

interface ISocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface IBusinessHour {
  day: string;
  hours: string;
}

interface IContactContent {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroImage: string;
  contactMethods: IContactMethod[];
  services: string[];
  formTitle: string;
  formSubtitle: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  whyChooseUs: string[];
  businessHours: IBusinessHour[];
  socialMedia: ISocialMedia;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactMethodSchema = new Schema<IContactMethod>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  details: [{ type: String, required: true }],
  description: { type: String, required: true },
}, { _id: false });

const mapCoordinatesSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const businessHourSchema = new Schema({
  day: { type: String, required: true },
  hours: { type: String, required: true },
}, { _id: false });

const socialMediaSchema = new Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
}, { _id: false });

const contactContentSchema = new Schema<IContactContent>(
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

const ContactContent: Model<IContactContent> = mongoose.models.ContactContent || mongoose.model<IContactContent>('ContactContent', contactContentSchema);

export default ContactContent;

