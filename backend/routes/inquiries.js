const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new inquiry
router.post('/', async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
