import React, { useState } from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import MasksIcon from '@mui/icons-material/Masks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';

function Adlogin() {
const [inputs, setInputs] = useState({ "email": '', "password": '' });
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

const inputHandler = (event) => {
  const { name, value } = event.target;
  setInputs((inputs) => ({ ...inputs, [name]: value }));
  console.log("Input changed:", inputs); 
};

const navigate = useNavigate();

const checkData = async (event) => {
  event.preventDefault();

  try {
    setLoading(true);
    const response = await axios.post("http://localhost:3500/admin/login", {
      email: inputs.email,
      password: inputs.password,
    });
    setLoading(false);

    if (response.data.success) {
      setSuccess('Login successful');
      setError(false);
      localStorage.setItem('currentadmin', JSON.stringify(response.data));
      console.log("Login successful:", response.data); 
      navigate('/panel');
    } else {
      setError('Invalid email and Password. Please try again.');
      setSuccess(false);
      console.log("Invalid login:", response.data); 
    }
  } catch (err) {
    setError('Error occurred during login. Please try again.');
    setSuccess(false);
    localStorage.removeItem('currentadmin');
    console.error("Error during login:", err);
  }
};

  const btstyle1 = { margin: '8px 0', backgroundColor: 'black', color: 'green', fontFamily: 'cursive' };

  const paperStyle = { padding: 20, height: '60vh', width: 400, margin: '20px auto' };
  const avatar1Style = { backgroundColor: 'green' };
  const linkStyle = { color: '#663399', textDecoration: 'underline', marginRight: '4px' };
  const headingStyle = { color: 'black', fontFamily: 'cursive' };

  return (
    <div className="login-container">
      {loading && <Loader />}
      {error && <Error  />}
      {success && <Success />} 
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatar1Style}><MasksIcon /></Avatar>
              <h2 style={headingStyle}>Log in</h2>
            </Grid>

            <TextField  label="Email" name="email" value={inputs.email} onChange={inputHandler} fullWidth /><br /><br />
            <TextField  label="Password" type='password' name='password' value={inputs.password} onChange={inputHandler} fullWidth /><br /><br />
            <Button type='Submit' fullWidth variant='contained' style={btstyle1} onClick={checkData}>
              Login
            </Button>

            {error && (
              <Typography align='left' style={{ color: 'red' }}>
                Login failed. Invalid email or password.
              </Typography>
            )}

            <Typography align='left'>
              <Link href="#" style={linkStyle}>
                {'Forgot Password ?'}
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default Adlogin;
