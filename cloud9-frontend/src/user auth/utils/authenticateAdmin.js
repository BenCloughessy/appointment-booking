
// check if a user has a verified admin email
const authenticateAdmin = (firebaseUser) => {
    const ADMIN_EMAILS = [""]; // Replace this with the actual admin email addresses
    const email = firebaseUser.email;
    const emailVerified = firebaseUser.emailVerified;

    return (ADMIN_EMAILS.includes(email) && emailVerified)
}

export default authenticateAdmin

