const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    scanid: {
        type: String,
        required: true
    },
    scanname: {
        type: String,
        required: true
    },
    scantype: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    selectedDate: { // New field for the selected date
        type: Date, // Assuming the selected date is a Date object
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
