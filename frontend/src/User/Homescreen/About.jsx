import React from 'react'
import Layout from '../components/Layout'
import { Box, Typography } from '@mui/material'
function About  ()  {
  return (
    <div>
      <Layout>
      <Box 
      sx={{my :15,
          textAlign:"center",
          p :2,
          "& h4":{
            fontWeight: "bold",
            my : 2,
            fontSize: "2rem",
          },
          "& p":{
            textAlign:"justify"
          }}}>
        <Typography variant='h4'>WELCOME TO PRIVATE SCANNING CENTRE</Typography>
        <p>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, accusamus aperiam,
           cum mollitia cumque nulla quod praesentium tenetur ducimus quae quaerat.
           Tempora atque ipsa totam dicta adipisci quasi delectus illum reiciendis minus perferendis obcaecati ducimus voluptates non,
           eaque aut! Doloremque distinctio molestias quos eos odio voluptas sequi sapiente,
           fugit est laboriosam magnam laborum optio accusamus, vero adipisci maxime ipsa similique ipsum?
           Recusandae suscipit reiciendis sequi sit quibusdam,
           tempore ad laboriosam consequatur! Assumenda corrupti id totam corporis,
           eius modi aliquam suscipit ipsa, animi, labore architecto veniam cupiditate quo numquam voluptas in.
           Numquam deserunt architecto illum, harum voluptatum dolore ratione! Quos, quam.
        </p>
        <br />
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, accusamus aperiam,
           cum mollitia cumque nulla quod praesentium tenetur ducimus quae quaerat.
           Tempora atque ipsa totam dicta adipisci quasi delectus illum reiciendis minus perferendis obcaecati ducimus voluptates non,
           eaque aut! Doloremque distinctio molestias quos eos odio voluptas sequi sapiente,
           fugit est laboriosam magnam laborum optio accusamus, vero adipisci maxime ipsa similique ipsum?
           Recusandae suscipit reiciendis sequi sit quibusdam,
           tempore ad laboriosam consequatur! Assumenda corrupti id totam corporis,
           eius modi aliquam suscipit ipsa, animi, labore architecto veniam cupiditate quo numquam voluptas in.
           Numquam deserunt architecto illum, harum voluptatum dolore ratione! Quos, quam.
        </p>
      </Box>
      </Layout>
      </div>
  )
}

export default About