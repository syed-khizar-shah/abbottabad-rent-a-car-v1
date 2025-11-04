import mongoose, { Schema, Model } from 'mongoose';

interface IBusinessHour {
  day: string;
  hours: string;
}

interface ILandmark {
  name: string;
  distance: string;
}

interface ILocationContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  businessName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  businessHours: IBusinessHour[];
  landmarks: ILandmark[];
  mapEmbedUrl: string;
  ctaTitle: string;
  ctaSubtitle: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const businessHourSchema = new Schema<IBusinessHour>({
  day: { type: String, required: true },
  hours: { type: String, required: true },
}, { _id: false });

const landmarkSchema = new Schema<ILandmark>({
  name: { type: String, required: true },
  distance: { type: String, required: true },
}, { _id: false });

const coordinatesSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const locationContentSchema = new Schema<ILocationContent>(
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

const LocationContent: Model<ILocationContent> = mongoose.models.LocationContent || mongoose.model<ILocationContent>('LocationContent', locationContentSchema);

export default LocationContent;

