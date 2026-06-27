import ContactInquiry from '../models/ContactInquiry.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
