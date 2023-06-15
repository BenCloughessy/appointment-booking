import { getIdToken } from "firebase/auth";

async function bookAppointment(bookingRequest) {
    const idToken = await getIdToken(bookingRequest.user);

    try {
      const response = await fetch('your-API-endpoint/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({bookingRequest}),
      })
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Appointment booked successfully:', data.event);
        return true
      } else {
        console.error('Error booking appointment:', data.message);
        return false
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      return false
    }
  }

  export default bookAppointment