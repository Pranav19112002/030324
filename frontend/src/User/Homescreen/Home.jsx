import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import UserImage1 from '../../components/Images/userhome1.jpeg'
import "./Home.css"


const Home = () => {
  return (     
    <Layout>
    <div className="home" style={{ backgroundImage :`url(${UserImage1})`}}>
    <div className="headerContainer">
    <h1>Scanning Website</h1>
    <p>Book Your Scan Now</p>
    <Link to={"/userlog"}>
      <button>
      BOOK NOW
      </button>
    </Link>
    </div>
    </div>
    </Layout>
    
  )
}

export default Home