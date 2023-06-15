# cloud9-server
Web server for cloud9 React app

# Guide
Agents:
    Service Account:
        Handles GET/DELETE requests, i.e. searching and cancelling appointments. See googleCalendar.js

    OAuth 2 Google Calendar API CLient:
        Handles POST requests, i.e. booking an appointment. This has been a problematic solution, as I constantly need to
        re-authenticate. However, I couldn't find another way to book all appointments on the same shared, private
        calendar. See cloud9EmailAuth.js

Routes:
    auth:
        Used for OAuth 2 flow for Google Calendar API Client
    events:
        Handles all appointment routing

MiddleWare:
    authenticate.js:
        Uses an array of admin emails to authenticate a verified admin email with firebase


# Missing files
To run the project, you will need to replace some missing files and setup your oown Google Calendar, service account, and OAuth 2 API client.

This repo is missing:
    root:
        credentials.json - OAuth 2 credentials for the google API, used in cloud9EmailAuth.js
        cloud9_token.json - Token granted after OAuth 2 flow completion, created automatically

    public:
        serviceAccount.json - Credentials for the service account, used in firebaseAdmin.js
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