import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const sendResetPasswordEmail = async (email, setError, setErrorMessage) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent to:', email);
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                console.error('No user found with this email.');
                setError(true);
                setErrorMessage('No user found with this email.');
            } else {
                console.error('Error sending password reset email:', error);
                setError(true);
                setErrorMessage('Error sending password reset email. Please try again later.');
            }
        });
}

export default sendResetPasswordEmail;
