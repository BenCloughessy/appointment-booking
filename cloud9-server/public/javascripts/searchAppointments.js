const { calendar, authorizeClient } = require("./googleCalendar")
const { appointmentLength } = require("./appointmentLength")
const { DateTime, IANAZone } = require('luxon');

async function searchAppointments(user, day, time, booking, type, email) {
    const calendarId = ""; // Replace with your calendar ID
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    // Authorize client
    await authorizeClient()
  
    // Get all events for next month
    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: nextMonth.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
  
    const allEvents = eventsResponse.data.items;
    // console.log("USER:",user)

    let filteredEvents = [];

    // Handle admin logic
    if(user.isAdmin) {
        // if booking, return free time blocks for day
        if (booking && type) {
          // Calc appt duration
          const duration = appointmentLength(type)
          if (duration > 0) {
              filteredEvents = filterFreeTime(day, calendar, calendarId, duration)
              return filteredEvents
          }
      }
        
        // if searching by query, return all events matching query, else return all events
        if (day || time || type || email) {
            console.log("filtering events by query")
            filteredEvents = filterEventsByQuery(allEvents, user, day, time, type, email)
            return filteredEvents
        } else {
            console.log("returning all events")
            return allEvents
        }
    }
  
    // Handle non-admin logic
    else {
        console.log("in else")
        // if booking, do something
        if (booking && type) {
            // Calc appt duration
            const duration = appointmentLength(type)
            if (duration > 0) {
                filteredEvents = filterFreeTime(day, calendar, calendarId, duration)
                return filteredEvents
            }
        }
        
        // else return all events for user
        else {
            filteredEvents = filterEventsByUserInfo(allEvents, user);
        }
    }

    return filteredEvents;
  }
  
  /**
 * Returns all free time blocks for a specific day between 9 AM and 5 PM,
 * broken up into 30-minute blocks.
 *
 * @param {Object} calendar - The Google Calendar API object.
 * @param {string} day - The day to find free time blocks, in ISO format.
 * @param {Number} duration - The length of each appointment in minutes.
 * @return {Promise<Array>} - A promise that resolves to an array of free time blocks.
 */
  async function filterFreeTime(day, calendar, calendarId, duration) {

    // Set up the start and end of the day (9 AM and 5 PM) in New York time
    const luxonDayStart = DateTime.fromISO(day, { zone: 'America/New_York' }).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
    const luxonDayEnd = DateTime.fromISO(day, { zone: 'America/New_York' }).set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
  
    // Convert Luxon DateTime objects to JavaScript Date objects
    const dayStart = luxonDayStart.toJSDate();
    const dayEnd = luxonDayEnd.toJSDate();

    // Array to store the resulting free time blocks
    const freeTimeBlocks = [];
  
    // Fetch events from the Google Calendar API
    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
  
    const events = eventsResponse.data.items;
  
    // Initialize the current time to the start of the day
    let currentTime = dayStart;
  
    // Iterate through events and find free time blocks between them
    events.forEach((event) => {
      const eventStart = new Date(event.start.dateTime || event.start.date);
      const eventEnd = new Date(event.end.dateTime || event.end.date);
  
      // Check for free time between the current time and the event start time
      while (currentTime < eventStart) {
        const nextBlock = new Date(currentTime);
        nextBlock.setMinutes(currentTime.getMinutes() + duration);
  
        // If the next block is before the event start time, add it as a free time block
        if (nextBlock <= eventStart) {
          freeTimeBlocks.push({
            start: new Date(currentTime),
            end: new Date(nextBlock),
          });
        }
  
        // Update the current time to the start of the next block
        currentTime = nextBlock;
      }
  
      // Update the current time to the end of the event
      if (currentTime < eventEnd) {
        currentTime = eventEnd;
      }
    });
  
    // Check for any remaining free time blocks after the last event
    while (currentTime < dayEnd) {
      const nextBlock = new Date(currentTime);
      nextBlock.setMinutes(currentTime.getMinutes() + duration);
  
      // If the next block is before the end of the day, add it as a free time block
      if (nextBlock <= dayEnd) {
        freeTimeBlocks.push({
          start: new Date(currentTime),
          end: new Date(nextBlock),
        });
      }
  
      // Update the current time to the start of the next block
      currentTime = nextBlock;
    }
  
    // Return the array of free time blocks
    return freeTimeBlocks;
  }
  
  /**
 * Filters an array of events based on the specified query parameters: day, time, type, and email.
 *
 * @param {Array} events - An array of Google Calendar event objects.
 * @param {Object} user - The user object (unused in the current implementation).
 * @param {string} day - The day to filter events, in ISO format. If specified, only events on this day will be returned.
 * @param {string} time - The time to filter events, in ISO format. If specified, only events starting at this time will be returned.
 * @param {string} type - The type to filter events by. If specified, only events with descriptions that include this type will be returned.
 * @param {string} email - The email to filter events by. If specified, only events with attendees that have this email will be returned.
 * @return {Array} - An array of Google Calendar event objects that match the specified query parameters.
 */
  function filterEventsByQuery(events, user, day, time, type, email) {
    
    // output all events matching query day
    if (day) {
        const targetDate = new Date(day);
        return events.filter((event) => {
          const eventStartDate = new Date(event.start.dateTime || event.start.date);
          return (
            eventStartDate.getDate() === targetDate.getDate() &&
            eventStartDate.getMonth() === targetDate.getMonth() &&
            eventStartDate.getFullYear() === targetDate.getFullYear()
          );
        });
    }

    // output all events matching query type in description
    if (type) {
        return events.filter((event) => event.description && event.description.includes(type));
    }

    // output all events matching query time
    if (time) {
        const targetTime = new Date(time);
        return events.filter((event) => {
            const eventStartTime = new Date(event.start.dateTime || event.start.date);
            return (
            eventStartTime.getHours() === targetTime.getHours() &&
            eventStartTime.getMinutes() === targetTime.getMinutes()
            );
        });
    }

    // output all events matching user email
    if (email) {
        return events.filter((event) => {
            const { attendees } = event;
        
            if (!attendees || attendees.length === 0) {
              return false;
            }
        
            return attendees.some((attendee) => attendee.email === email);
        });
    }
  }
  
  /**
 * Filters an array of events based on the specified user's information.
 * If the user is an admin, all events are returned.
 * If the user is not an admin, only events with attendees matching the user's email are returned.
 *
 * @param {Array} events - An array of Google Calendar event objects.
 * @param {Object} user - The user object, which should contain the 'isAdmin' and 'email' properties.
 * @return {Array} - An array of Google Calendar event objects that match the specified user's information.
 * @throws {Error} - Throws an error if the user's email is not found in the user object.
 */
  function filterEventsByUserInfo(events, user) {
    // If user is admin, return all events, else return only events for user
    if (user.isAdmin) {
        return events;
    } else {
        const userEmail = user.email;

        if (!userEmail) {
            throw new Error("User email not found in user object.");
        }

        const filteredEvents = events.filter((event) => {
            const { attendees } = event;

            if (!attendees || attendees.length === 0) {
            return false;
            }

            return attendees.some((attendee) => attendee.email === userEmail);
        });

        return filteredEvents;
    }
  }

  module.exports = { searchAppointments };
  