const express = require('express');
const router = express.Router();
const { oauth2Client, getPersonalAccessToken } = require("../public/javascripts/cloud9EmailAuth");

router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  if (code) {
    try {
      await getPersonalAccessToken(oauth2Client, code);
      res.status(200).send('<h1>Authorization successful. You can close this window.</h1>');
    } catch (err) {
      res.status(400).send('<h1>Authorization failed. Please try again.</h1>');
    }
  } else {
    res.status(400).send('<h1>Authorization failed. Please try again.</h1>');
  }
});

module.exports = router;
