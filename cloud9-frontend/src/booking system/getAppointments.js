import { getIdToken } from "firebase/auth";

const getAppointments = async (user, searchParams) => {
    if (user) {
      
      const idToken = await getIdToken(user);
      const queryParams = new URLSearchParams();

      // destructure search params
      const { day, time, booking, type, email } = searchParams;

      // add query params if they exist
      if (day) queryParams.append("day", day);
      if (time) queryParams.append("time", time);
      if (booking) queryParams.append("booking", booking);
      if (type) queryParams.append("type", JSON.stringify(type));
      if (email) queryParams.append("email", email);

      const response = await fetch(`your-API-endpoint/events?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const events = await response.json();
      console.log("EVENTS",events)
      return events;
    }
}

export default getAppointments;