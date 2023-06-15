// Import required modules
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Define the path to the token file and read credentials from a JSON file
const TOKEN_PATH = 'cloud9_token.json';
const credentials = JSON.parse(fs.readFileSync('credentials.json'));

// Extract the required fields from the credentials
const { client_secret, client_id, redirect_uris } = credentials.installed;

// Initialize the OAuth2 client
const oauth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
      if (err) return console.error('Error saving token', err);
      console.log('Token stored in', TOKEN_PATH);
    });
  }
});

// Read the token file and set credentials for the OAuth2 client
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    console.error('Token file could not be read', err);
    getPersonalAccessToken(oauth2Client);
  } else {
    const parsedToken = JSON.parse(token);
    if (parsedToken.refresh_token) {
      oauth2Client.setCredentials(parsedToken);
    } else {
      console.log('Refresh token not found, getting a new one');
      getPersonalAccessToken(oauth2Client);
    }
  }
});

// Function to get a new access token for your personal account
async function getPersonalAccessToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent'
  });

  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();

    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }

      oauth2Client.setCredentials(token);

      fs.readFile(TOKEN_PATH, (readErr, existingToken) => {
        let mergedToken;
        if (readErr) {
          console.error('Could not read existing token, will overwrite', readErr);
          mergedToken = token;
        } else {
          mergedToken = {...JSON.parse(existingToken), ...token};
        }

        fs.writeFile(TOKEN_PATH, JSON.stringify(mergedToken), (writeErr) => {
          if (writeErr) {
            console.error('Error storing token', writeErr);
          } else {
            console.log('Token stored in', TOKEN_PATH);
          }
        });
      });
    });
  });
}

// Create a Google Calendar API client using the OAuth2 client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Export the calendar object
module.exports = { calendar, oauth2Client, getPersonalAccessToken };
