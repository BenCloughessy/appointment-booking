# cloud9-frontend
UI for cloud9 with React and Vite

# Guide
Setting up the front-end involves setting your API endpoints, firebase config, and admin emails.

# Credits
I built this react app on top of a beautiful template by creative tim. While all of the logic and most of the components are mine, I would be remiss to not include him here. The template came with an incredible base of SCSS, fonts, and component-templates that I made use of to facilitate front-end development. Basically all content in the assets folder is his, I only added/tweaked some SCSS and images to fit my needs.

 =========================================================
 * Now UI Kit React - v1.5.1 based on Now UI Kit - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit-react
 * Copyright 2022 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

# Missing Files
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
    