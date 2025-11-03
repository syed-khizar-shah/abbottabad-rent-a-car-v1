const express = require('express');
const Car = require('../models/Car');
const Category = require('../models/Category');
const HomepageContent = require('../models/HomepageContent');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get dashboard stats (admin only)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalCategories = await Category.countDocuments();
    const featuredCars = await Car.countDocuments({ isFeatured: true });
    const availableCars = await Car.countDocuments({ isAvailable: true });
    
    res.json({
      totalCars,
      totalCategories,
      featuredCars,
      availableCars
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

