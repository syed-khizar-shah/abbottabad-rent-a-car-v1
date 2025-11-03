const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Car = require('../models/Car');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'abbottabad-rent-a-car/cars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage: storage });

// Get all cars (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { isAvailable: true };
    
    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const cars = await Car.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single car (public)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('category', 'name slug');
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create car (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const carData = {
      ...req.body,
      category: category._id,
      categoryName: category.name,
      price: parseFloat(req.body.price),
      pricing: JSON.parse(req.body.pricing),
      specs: JSON.parse(req.body.specs),
      features: JSON.parse(req.body.features || '[]'),
      rating: parseFloat(req.body.rating || 4.5),
      reviews: parseInt(req.body.reviews || 0),
      isFeatured: req.body.isFeatured === 'true',
      isAvailable: req.body.isAvailable !== 'false'
    };

    if (req.file) {
      carData.image = req.file.path;
    }

    const car = new Car(carData);
    await car.save();
    
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update car (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updateData = { ...req.body };
    
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      updateData.category = category._id;
      updateData.categoryName = category.name;
    }

    if (req.body.pricing) {
      updateData.pricing = JSON.parse(req.body.pricing);
    }
    if (req.body.specs) {
      updateData.specs = JSON.parse(req.body.specs);
    }
    if (req.body.features) {
      updateData.features = JSON.parse(req.body.features);
    }
    if (req.body.price) {
      updateData.price = parseFloat(req.body.price);
    }
    if (req.body.rating) {
      updateData.rating = parseFloat(req.body.rating);
    }
    if (req.body.reviews) {
      updateData.reviews = parseInt(req.body.reviews);
    }
    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured = req.body.isFeatured === 'true';
    }
    if (req.body.isAvailable !== undefined) {
      updateData.isAvailable = req.body.isAvailable !== 'true';
    }

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (car.image) {
        const publicId = car.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`abbottabad-rent-a-car/cars/${publicId}`);
      }
      updateData.image = req.file.path;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete car (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Delete image from Cloudinary
    if (car.image) {
      const publicId = car.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(`abbottabad-rent-a-car/cars/${publicId}`);
    }

    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

