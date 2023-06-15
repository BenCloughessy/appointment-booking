import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';

import formatDate from "../booking system/formatDate"
import RescheduleAppointment from "../appt. components/RescheduleAppointment"

// Adjust fonts and sizing for calendar
function renderEventContent(eventInfo) {
  return (
    <>
      <div style={{ fontSize: '1.1em' }}>{eventInfo.timeText}</div>
      <div style={{ fontSize: '1.1em' }}>{eventInfo.event.title}</div>
    </>
  );
}

const AdminCalendar = ({ refresh, refreshAppointments, events }) => {

  // Setup Modals and selected event
  const [modalInitial, setModalInitial] = useState(false)
  const [event, setEvent] = useState(null);

  const openEvent = async ({ event }) => {
    // format datetime
    const datetime = {
      start: event.startStr,
      end: event.endStr
    }
  
    // Pull event info from event object
    const eventInfo = {
      type: event._def.title,
      attendee: event._def.extendedProps.description,
      start: formatDate(datetime).startTime,
      end: formatDate(datetime).endTime,
      date: formatDate(datetime).date,
      id: event.id,
      details: event._def.extendedProps.details
    }
  
    setEvent(eventInfo)
    setModalInitial(true)
  }

  return (
    <>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the three
        }}
        weekends={false}
        slotMinTime="09:00:00" // 9am
        slotMaxTime="17:30:00" // 5pm
        height={"100%"}
        eventBackgroundColor="#009688"
        allDaySlot={false}
        eventContent={renderEventContent} // custom event rendering for styles
        events={events}
        eventClick={openEvent} // trigger modal chain
      />

      {/* Modal */}
      {event &&
        <RescheduleAppointment event={event} modalInitial={modalInitial} setModalInitial={setModalInitial} refresh={refresh} refreshAppointments={refreshAppointments} />
      }
    </>
  )
}

export default AdminCalendar;
