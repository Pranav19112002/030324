import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Loader from '../../components/Loader';
import Scans from './Scans';
import axios from 'axios';
import Layout from '../components/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; // Import Moment.js

function Homescreen() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [duplicatescans, setDuplicatescans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]); // New state for filtered scans
  const [searchkey, setSearchkey] = useState('');
  const [type, setType] = useState('all');
  const [scanTypes, setScanTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const user = JSON.parse(localStorage.getItem('currentuser'));

  if (!user) {
    window.location.href = '/userlog';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const scanData = (await axios.get('http://localhost:3500/scans/getallscans')).data;
        const typeData = (await axios.get('http://localhost:3500/stypes')).data;

        setScans(scanData);
        setDuplicatescans(scanData);
        setFilteredScans(scanData); // Initialize filteredScans with all scans
        setLoading(false);
        setScanTypes(typeData);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterBySearch() {
    console.log("Search key:", searchkey); // Log the value of searchkey

    const tempScans = duplicatescans.filter((scan) => {
      console.log("Scan name:", scan.sname); // Log the value of scan name
      return scan.sname.toLowerCase().includes(searchkey.toLowerCase());
    });
    
    console.log("Filtered scans:", tempScans); // Log the filtered scans

    setFilteredScans(tempScans); // Update filteredScans instead of scans
}


  function filterByType(selectedType) {
    setType(selectedType);
  
    if (selectedType.toLowerCase() !== 'all') {
      const tempScans = scans.filter((scan) => scan.stype.toLowerCase() === selectedType.toLowerCase());
      setFilteredScans(tempScans);
    } else {
      setFilteredScans(scans);
    }
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    // Perform filtering based on selected date
    // You can filter your scans here based on the selected date
  }

  function formatDate(date) {
    if (!date) return null;
    return moment(date).format('DD-MM-YYYY'); // Use Moment.js to format the date
  }

  return (
    <>
      <Layout>
        <div className='col-md-3'>
          <TextField
            fullWidth
            type='text'
            label='Search Rooms'
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className='col-md-2'>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => filterByType(e.target.value)}
              label='Type'
            >
              <MenuItem value='all'>All</MenuItem>
              {scanTypes.map((scanType) => (
                <MenuItem key={scanType._id} value={scanType.stype}>
                  {scanType.stype}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='col-md-3'>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='dd/MM/yyyy' // Customize date format as needed
            placeholderText='Select Date'
          />
        </div>

        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader />
          ) : (
            filteredScans.map((scan) => (
              <div className='col-md-9 mt-2' key={scan._id}>
                <Scans scan={scan} selectedDate={formatDate(selectedDate)} />
              </div>
            ))
          )}
        </div>
      </Layout>
    </>
  );
}

export default Homescreen;
