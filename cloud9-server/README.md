# cloud9-server
Web server for cloud9 React app

# Guide
Agents:
    Service Account:
        Handles GET/DELETE?POST requests, i.e. searching and cancelling appointments. See googleCalendar.js

Routes:
    events:
        Handles all appointment routing

MiddleWare:
    authenticate.js:
        Uses an array of admin emails to authenticate a verified admin email with firebase


# Missing files
To run the project, you will need to replace some missing files and setup your oown Google Calendar and service account

This repo is missing:

    public:
        serviceAccount.json - Credentials for the service account, used in firebaseAdmin.js and googleCalendar.js
        javascripts:
            cancelAppointment.js:
                const calendarId = ""; // Replace with your calendar ID
            createAppointment.js:
                const calendarId = ""; // Replace with your calendar ID
            searchAppointments.js:
                const calendarId = ""; // Replace with your calendar ID

    middleware:
        authenticate.js:
            const ADMIN_EMAILS = [""]; // Replace this with the actual admin email addresses you wish to verify