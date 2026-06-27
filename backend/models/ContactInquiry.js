import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied'],
    default: 'New',
  }
}, { timestamps: true });

const ContactInquiry = mongoose.model('ContactInquiry', contactInquirySchema);

export default ContactInquiry;
