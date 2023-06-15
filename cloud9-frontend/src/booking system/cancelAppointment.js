import { getIdToken } from "firebase/auth";

async function cancelAppointment(user, eventId) {

    const idToken = await getIdToken(user);

    try {
      const response = await fetch('your-API-endpoint/events', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel the appointment');
      }
  
      const data = await response.json();
      console.log('Appointment cancelled:', data);
      return true
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return false
    }
  }

  export default cancelAppointment;