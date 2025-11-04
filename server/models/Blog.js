const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
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

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

