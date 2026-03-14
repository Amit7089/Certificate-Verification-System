import React, { useState } from 'react';
import { Container, TextField, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ setUser }) => {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/certificates/search/${certificateId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCertificate(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Certificate not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    window.open(`http://localhost:5000/api/certificates/download/${certificate.certificateId}`, '_blank');
  };

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user) setUser(user);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Verify Your Certificate
          </Typography>
          
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              label="Enter Certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={loading || !certificateId}
            >
              {loading ? <CircularProgress size={24} /> : 'Search Certificate'}
            </Button>
          </form>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {certificate && (
            <Card sx={{ mt: 3, p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                ✅ Certificate Verified!
              </Typography>
              <Typography variant="h6">{certificate.studentName}</Typography>
              <Typography>{certificate.internshipDomain}</Typography>
              <Typography>
                Period: {new Date(certificate.startDate).toLocaleDateString()} - {new Date(certificate.endDate).toLocaleDateString()}
              </Typography>
              <Typography>Certificate ID: {certificate.certificateId}</Typography>
              <Typography variant="body2" color="textSecondary">
                Downloads: {certificate.downloadCount}
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleDownload}
                sx={{ mt: 2 }}
              >
                Download PDF Certificate
              </Button>
            </Card>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;