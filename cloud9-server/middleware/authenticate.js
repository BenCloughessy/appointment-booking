const { auth } = require('../public/javascripts/firebaseAdmin')

const ADMIN_EMAILS = [""]; // Replace this with the actual admin email addresses

async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the token
    const idToken = authHeader.split(" ")[1];

    // Verify the token exists
    if (!idToken) {
        return res.status(401).send("Unauthorized: No token provided");
      }

    try {
      //  Extract the user from the token
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;

      // Check if the user is an admin
      req.user.isAdmin = ADMIN_EMAILS.includes(decodedToken.email)

      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Unauthorized" });
    }
  }

  module.exports = { authenticate }
  