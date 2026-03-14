const XLSX = require('xlsx');

const parseExcelData = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  return data.map(row => ({
    certificateId: row['Certificate ID'] || row['certificateId'],
    studentName: row['Student Name'] || row['studentName'],
    internshipDomain: row['Internship Domain'] || row['internshipDomain'],
    startDate: new Date(row['Start Date'] || row['startDate']),
    endDate: new Date(row['End Date'] || row['endDate']),
    collegeName: row['College Name'] || row['collegeName']
  }));
};

module.exports = parseExcelData;