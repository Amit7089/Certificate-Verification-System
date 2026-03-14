const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateCertificatePDF = (certificate, res) => {
  const doc = new PDFDocument({ margin: 50 });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${certificate.certificateId}_certificate.pdf`);
  
  doc.pipe(res);
  
  // Certificate Header
  doc.fontSize(24).text('INTERNSHIP CERTIFICATE', 250, 100, { align: 'center' });
  doc.fontSize(12).text('This is to certify that', 250, 150, { align: 'center' });
  
  // Student Name
  doc.fontSize(20).fillColor('#2c3e50').text(certificate.studentName, 250, 200, { align: 'center' });
  doc.fontSize(12).text('has successfully completed', 250, 240, { align: 'center' });
  
  // Domain
  doc.fontSize(16).fillColor('#34495e').text(certificate.internshipDomain, 250, 270, { align: 'center' });
  
  // Dates
  doc.fontSize(12).text(`Internship Period: ${new Date(certificate.startDate).toLocaleDateString()} to ${new Date(certificate.endDate).toLocaleDateString()}`, 250, 320, { align: 'center' });
  
  // Footer
  doc.fontSize(10).text('Certificate ID: ' + certificate.certificateId, 50, 550);
  doc.text('Generated on: ' + new Date().toLocaleDateString(), 450, 550, { align: 'right' });
  
  doc.end();
};

module.exports = generateCertificatePDF;