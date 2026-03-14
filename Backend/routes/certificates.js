const express = require('express');
const multer = require('multer');
const parseExcelData = require('../utils/excelParser');
const Certificate = require('../models/Certificate');
const generateCertificatePDF = require('../utils/generateCertificatePDF');
const auth = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Search certificate
router.get('/search/:certificateId', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      certificateId: req.params.certificateId,
      isVerified: true 
    });
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or not verified' });
    }
    
    certificate.downloadCount += 1;
    await certificate.save();
    
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Upload Excel
router.post('/upload-excel', auth(['admin']), upload.single('excel'), async (req, res) => {
  try {
    const certificates = parseExcelData(req.file.path);
    
    // Validate and save certificates
    const results = [];
    for (const certData of certificates) {
      const existing = await Certificate.findOne({ certificateId: certData.certificateId });
      if (!existing) {
        const certificate = new Certificate(certData);
        await certificate.save();
        results.push({ status: 'created', certificateId: certData.certificateId });
      } else {
        results.push({ status: 'exists', certificateId: certData.certificateId });
      }
    }
    
    res.json({ message: 'Excel uploaded successfully', results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all certificates
router.get('/', auth(['admin']), async (req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  res.json(certificates);
});

module.exports = router;