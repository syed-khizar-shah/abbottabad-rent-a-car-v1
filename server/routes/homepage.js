const express = require('express');
const HomepageContent = require('../models/HomepageContent');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get homepage content (public)
router.get('/', async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    
    // If no content exists, return default structure
    if (!content) {
      return res.json({ message: 'No homepage content found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update homepage content (admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    
    if (!content) {
      // Create new content if it doesn't exist
      content = new HomepageContent(req.body);
      await content.save();
      return res.json(content);
    }
    
    // Parse JSON strings if needed
    const updateData = { ...req.body };
    if (req.body.stats) {
      updateData.stats = typeof req.body.stats === 'string' ? JSON.parse(req.body.stats) : req.body.stats;
    }
    if (req.body.offers) {
      updateData.offers = typeof req.body.offers === 'string' ? JSON.parse(req.body.offers) : req.body.offers;
    }
    if (req.body.benefits) {
      updateData.benefits = typeof req.body.benefits === 'string' ? JSON.parse(req.body.benefits) : req.body.benefits;
    }
    if (req.body.testimonials) {
      updateData.testimonials = typeof req.body.testimonials === 'string' ? JSON.parse(req.body.testimonials) : req.body.testimonials;
    }
    if (req.body.brands) {
      updateData.brands = typeof req.body.brands === 'string' ? JSON.parse(req.body.brands) : req.body.brands;
    }
    
    const updatedContent = await HomepageContent.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );
    
    res.json(updatedContent);
  } catch (error) {
    console.error('Error updating homepage content:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

