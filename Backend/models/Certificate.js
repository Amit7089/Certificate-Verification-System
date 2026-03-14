const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  internshipDomain: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  collegeName: { type: String, default: 'Your College Name' },
  isVerified: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);