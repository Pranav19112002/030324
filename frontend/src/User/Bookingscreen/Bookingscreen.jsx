import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import Layout from '../components/Layout';
import Success from '../../components/Success';

const Bookingscreen = () => {
  const { id, date } = useParams(); // Extract the date parameter from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scan, setScan] = useState(null);
  const [totalamount, setTotalamount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3500/scans/getscanbyid/${id}`);
        const updatedScan = {
          ...response.data,
          imageUrl: response.data.scanImageURL
            ? `data:${response.data.scanImageURL.contentType};base64,${response.data.scanImageURL.data}`
            : null,
        };
        setScan(updatedScan);
        setTotalamount(updatedScan.samount);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  async function onBookNow() {
    try {
      setLoading(true);
      // Assuming you have an API endpoint to handle booking scans
      const result = await axios.post('http://localhost:3500/book/bookscan', {
        userId: JSON.parse(localStorage.getItem('currentuser'))._id,
        scanId: id,
        scanName: scan.sname, // Pass the scan name
        scanType: scan.stype, // Pass the scan type
        totalAmount: totalamount,
        selectedDate: date, // Pass the selected date
        // Add additional booking details here if needed
      });

      setLoading(false);
      setSuccess("Successfully booked");
      setError(false);
    } catch (error) {
      setSuccess(false);
      setError("Error occurred")
      setLoading(false);
    }
  }

  return (
    <div>
      {error && <Error />}
      {success && <Success />}
      <Layout>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {loading && <Loader />}
          {error && <Error />}
          {scan && (
            <Card sx={{ width: "700px", margin: 2 }}>
              <CardActionArea>
                <CardMedia
                  sx={{ width: "100%", height: "300px" }}
                  component="img"
                  src={scan.imageUrl || ''}
                  alt={scan.sname}
                />
                <CardContent>
                  <Typography variant="h4" sx={{fontFamily:"cursive",color:"green",fontWeight:"bold"}}>Booking Details</Typography>
                  <hr />
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}>User: {JSON.parse(localStorage.getItem('currentuser')).email}</Typography>
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}>Scan Name: {scan.sname}</Typography>
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}> Scan Type: {scan.stype}</Typography>
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}>Amount: {scan.samount}</Typography>
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}>Date: {date}</Typography> {/* Display the selected date */}
                  <hr />
                  <Typography sx={{fontFamily:"cursive",fontWeight:"bold"}}>Total Amount: {totalamount}</Typography>
                  <Button variant="contained" sx={{backgroundColor:"black",color:"green"}} onClick={onBookNow}>Book Now</Button>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Box>
      </Layout>
    </div>
  );
};

export default Bookingscreen;
