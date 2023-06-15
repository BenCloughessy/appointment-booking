const { authenticate } = require('../middleware/authenticate');
const { searchAppointments } = require("../public/javascripts/searchAppointments")
const { createAppointment } = require("../public/javascripts/createAppointment")
const { cancelAppointment } = require("../public/javascripts/cancelAppointment")

var express = require('express');
var router = express.Router();

// Get calendar events
router.get('/', authenticate, async function(req, res, next) {
  // Extract parameters from request
  const user = req.user
  const {day, time, booking, type, email} = req.query
  
  // Handle appointment searching
  const appointments = await searchAppointments(user, day, time, booking, type, email)
  
  // Respond with appointments or booking confirmation
  res.send(appointments);
});

// Book Calendar Events
router.post('/', authenticate, async function(req, res, next) {
  // Extract parameters from request
  const {bookingRequest} = req.body

  try {
    // Your logic for creating an appointment using Google Calendar API will go here
    const event = await createAppointment(bookingRequest);

    // Return the created event
    res.status(200).json({message: 'Appointment booked successfully', event});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error booking appointment'});
  }
})

// Cancel Calendar Events
router.delete('/', authenticate, async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: 'Missing event ID' });
    }

    cancelAppointment(eventId)
    .then(() => {
      res.status(200).json({ message: 'Appointment cancelled' });
    })
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Failed to cancel the appointment' });
  }
});

module.exports = router;
