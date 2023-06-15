const { calendar } = require("./cloud9EmailAuth")

async function createAppointment({ user, datetime, type, guestEmail }) {
    const calendarId = ""; // Replace with your calendar ID
    const startTime = datetime.start
    const endTime = datetime.end
  
    // Create the calendar event
    const event = {
        summary: type.service,
        description: 
                 (type.addons.length > 0 ? `${type.addons}` : '') + 
                 (type.facialWaxingOptions.length > 0 ? `${type.facialWaxingOptions}` : ''),
        start: {
        dateTime: startTime,
        timeZone: 'America/New_York', // Set your timezone
        },
        end: {
        dateTime: endTime,
        timeZone: 'America/New_York', // Set your timezone
        },
        attendees: [
        // Add attendees (including the user who wants to book an appointment)
        {email: guestEmail ? guestEmail : user.email},
        // Add more attendees if needed
        ],
    };

  // Insert the event in the shared calendar
  return calendar.events.insert({
    calendarId,
    resource: event,
  }).then(response => response.data);
  }

  module.exports = { createAppointment }