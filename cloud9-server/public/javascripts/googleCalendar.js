const { google } = require('googleapis');

// secure service account for google calendar api
const serviceAccount = require('../serviceAccount.json');

// Create JWT client for service account
const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ["https://www.googleapis.com/auth/calendar"]
  );
  
  // Authorize JWT client  
  async function authorizeClient() {
    await jwtClient.authorize();
  }
  
  // Create calendar object
  const calendar = google.calendar({ version: "v3", auth: jwtClient });
  
  module.exports = { calendar, authorizeClient };