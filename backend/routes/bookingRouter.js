const express = require('express');
const router = express.Router();
const Booking = require('../model/book'); // Assuming you've created the Booking model
const Scan = require("../model/scan");

// POST route for booking a scan
router.post('/bookscan', async (req, res) => {
  try {
    const { userId, scanId, scanName, scanType, totalAmount, selectedDate } = req.body;

    // Create a new booking instance
    const newBooking = new Booking({
      userid: userId,
      scanid: scanId,
      scanname: scanName,
      scantype: scanType,
      totalamount: totalAmount,
      selectedDate: selectedDate,
      status: 'booked'
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Fetch the scan details based on scanId
    const scan = await Scan.findById(scanId);

    // Check if the scan exists
    if (scan) {
      // Push the entire booking object to the currentbookings array of the scan
      scan.currentbookings.push(savedBooking);
      // Save the updated scan details
      await scan.save();
    } else {
      // Handle case where scan is not found
      console.log('Scan not found');
    }

    // Respond with the saved booking data
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/allbookings', async (req, res) => {
    try {
      // Fetch all bookings from the database
      const allBookings = await Booking.find();
      
      // Respond with the array of bookings
      res.status(200).json(allBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
