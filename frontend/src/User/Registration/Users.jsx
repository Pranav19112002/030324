import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Adnavbar from '../../components/Navbar/Adnavbar';
import Adsidebar from '../../components/Navbar/Adsidebar';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';

function Users () {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3500/user/getallusers');
          setUsers(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
          setError('Failed to fetch data');
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div>
    {loading && <Loader />}
    {error && <Error message={error} />}
    <Adnavbar/>
    <Box height={20}>
      <Box sx={{ display: 'flex' }}>
        <Adsidebar/>
        <Grid className='grid-container'>
          <Paper elevation={10} className='paperstyle'>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'black' }}> ScanTypes</Typography>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: 'green' }}>UserID</TableCell>
                      <TableCell style={{ color: 'green' }}>Username</TableCell>
                      <TableCell style={{ color: 'green' }}>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((value, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ color: 'black' }}>{value._id}</TableCell>
                        <TableCell style={{ color: 'black' }}>{value.name}</TableCell>
                        <TableCell style={{ color: 'black' }}>{value.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Box>
  </div>
  )
}

export default Users