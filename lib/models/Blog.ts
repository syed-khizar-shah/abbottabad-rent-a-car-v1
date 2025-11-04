import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content from rich text editor
  featuredImage: string;
  category: string;
  author: string;
  authorBio?: string;
  date: string; // ISO date string
  readTime: string; // e.g., "8 min read"
  featured: boolean;
  published: boolean;
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  // Additional fields
  tags?: string[];
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // HTML content
    featuredImage: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorBio: { type: String },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ published: 1, featured: 1 });
blogSchema.index({ createdAt: -1 });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;

