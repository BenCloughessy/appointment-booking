# cloud9-frontend
UI for cloud9 with React and Vite

### Guide
Setting up the front-end involves setting your API endpoints, firebase config, and admin emails.

### Credits
I built this react app on top of a beautiful template by creative tim. While all of the logic and most of the components are mine, I would be remiss to not include him here. The template came with an incredible base of SCSS, fonts, and component-templates that I made use of to facilitate front-end development. Basically all content in the assets folder is his, I only added/tweaked some SCSS and images to fit my needs.

 =========================================================
 * Now UI Kit React - v1.5.1 based on Now UI Kit - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit-react
 * Copyright 2022 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

### Missing Files
There are some pieces of missing data you will have to fill in to get the app running.

This repo is missing:

    root:
        firebase.jsx:
            const firebaseConfig = {}; // Replace this with yoour firebase app info

    src:
        booking system:
            bookAppointment.js:
                const response = await fetch('your-API-endpoint/events')
            cancelAppointment.js:
                const response = await fetch('your-API-endpoint/events')
            getAppointments.js:
                const response = await fetch(your-API-endpoint/events?${queryParams})
        user auth:
            utils:
                authenticateAdmin.js:
                    const ADMIN_EMAILS = [""]; // Replace this with the actual admin email addresses

# cloud9-server
Web server for cloud9 React app

### Guide
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


### Missing files
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
    