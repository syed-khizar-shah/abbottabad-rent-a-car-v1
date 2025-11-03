const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'abbottabad-rent-a-car/categories',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage: storage });

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single category (public)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create category (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const categoryData = {
      ...req.body,
      slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, '-'),
      features: JSON.parse(req.body.features || '[]'),
      priceFrom: parseFloat(req.body.priceFrom),
      order: parseInt(req.body.order || 0)
    };

    if (req.file) {
      categoryData.image = req.file.path;
    }

    const category = new Category(categoryData);
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update category (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updateData = { ...req.body };
    
    if (req.body.name && !req.body.slug) {
      updateData.slug = req.body.name.toLowerCase().replace(/\s+/g, '-');
    }
    if (req.body.features) {
      updateData.features = JSON.parse(req.body.features);
    }
    if (req.body.priceFrom) {
      updateData.priceFrom = parseFloat(req.body.priceFrom);
    }
    if (req.body.order) {
      updateData.order = parseInt(req.body.order);
    }

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (category.image) {
        const publicId = category.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`abbottabad-rent-a-car/categories/${publicId}`);
      }
      updateData.image = req.file.path;
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete category (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if any cars are using this category
    const Car = require('../models/Car');
    const carsWithCategory = await Car.countDocuments({ category: category._id });
    if (carsWithCategory > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category. There are cars associated with this category.' 
      });
    }

    // Delete image from Cloudinary
    if (category.image) {
      const publicId = category.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(`abbottabad-rent-a-car/categories/${publicId}`);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

