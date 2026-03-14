import React, { useState, useEffect } from 'react';
import {
  Container, Card, CardContent, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Box, CircularProgress
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/certificates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCertificates(res.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('excel', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/certificates/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Excel uploaded successfully!');
      fetchCertificates();
    } catch (error) {
      alert('Error uploading file: ' + error.response?.data?.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Upload Student Data (Excel)</Typography>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading && <CircularProgress size={24} />}
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Certificate ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Downloads</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert._id}>
                <TableCell>{cert.certificateId}</TableCell>
                <TableCell>{cert.studentName}</TableCell>
                <TableCell>{cert.internshipDomain}</TableCell>
                <TableCell>
                  {new Date(cert.startDate).toLocaleDateString()} - {new Date(cert.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{cert.downloadCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;