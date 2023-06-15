const { calendar, authorizeClient } = require("./googleCalendar")

async function cancelAppointment(eventId) {
    const calendarId = ""; // Replace with your calendar ID

    // Authorize client
    await authorizeClient()
  
    // Delete event
    await calendar.events.delete({
        calendarId,
        eventId
      });

  }

  module.exports = { cancelAppointment }