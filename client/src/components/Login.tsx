import {
  Avatar,
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [locality, setLocality] = useState('');
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState<string | null>(null); // To manage errors

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(`http://localhost:8080/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile, locality, username }),
      });

      if (response.status === 422) {
        const error = await response.json()
        setError(error.message)
      }
      else if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      else {
         setName('');
         setUserName('');
         setMobile('');
         setLocality('');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={'xs'}>
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <>
          <Avatar
            sx={{
              mt: 4,
              mx: 'auto',
              bgcolor: 'primary.main',
              textAlign: 'center',
            }}
          >
            <HowToRegOutlinedIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', pt: 2 }}
          >
            REGISTER
          </Typography>

          {error && (
            <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
              {error}
            </Typography>
          )}

          <Grid2 alignItems={'center'} justifyItems={'center'}>
            <Box
              component="form"
              onSubmit={(e) => handleSubmit(e)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                placeholder="Enter Full Name"
                value={name}
                fullWidth
                required
                autoFocus
                sx={{ my: 2 }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                placeholder="Pick a username"
                value={username}
                fullWidth
                required
                sx={{ mb: 2 }}
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                placeholder="Enter Mobile Number"
                value={mobile}
                fullWidth
                required
                sx={{ mb: 2 }}
                onChange={(e) => setMobile(e.target.value)}
              />
              <TextField
                placeholder="Enter Your Locality"
                value={locality}
                fullWidth
                required
                onChange={(e) => setLocality(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Box>
            <Grid2 display={'flex'}>
              <Typography>Already Registered?</Typography>
              <Typography sx={{ cursor: 'pointer', marginLeft:0.5}} color="#3700CC">
                Login
              </Typography>
            </Grid2>
          </Grid2>
        </>
      </Paper>
    </Container>
  );
};

export default Login;
