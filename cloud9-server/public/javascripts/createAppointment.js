const { calendar, authorizeClient } = require("./googleCalendar")

async function createAppointment({ user, datetime, type, guestEmail }) {
    const calendarId = ""; // Replace with your calendar ID
    const startTime = datetime.start
    const endTime = datetime.end

    // Authorize client
    await authorizeClient()
  
    // Create the calendar event
    const event = {
      // Display type of service, conditionally display addons
      summary: `${type.service}${(type.addons.length > 0 ? ` - ${type.addons}` : '') + (type.facialWaxingOptions.length > 0 ? ` - ${type.facialWaxingOptions}` : '')}`,
      description: (guestEmail ? guestEmail : user.email),
      start: {
        dateTime: startTime,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/New_York',
      }
  };

  // Insert the event in the shared calendar
  return calendar.events.insert({
    calendarId,
    resource: event,
  }).then(response => response.data);
  }

  module.exports = { createAppointment }