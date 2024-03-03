const express = require("express");
const router = express.Router();
const adminmodel = require("../model/admin");



router.post('/login', async (request, response) => {
    const { email, password } = request.body;


    try {
        const admin = await adminmodel.findOne({ email, password });

        if (admin) { response.json({ success: true, message: 'Login Successfully' }); }

        else { response.json({ success: false, message: 'Invalid Username and email' }); }
    }

    catch (error) { response.status(500).json({ sucess: false, message: 'Error' }) }
})



router.post('/register',(request,response)=>{
    new adminmodel(request.body).save();
    response.send("Admin added Sucessfully")
})
module.exports = router;


// http://localhost:3500/admin/login