import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

const createAccount = async (email, password, setUser) => {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        // New user created and signed in
        const user = userCredential.user
        console.log('User created and signed in:', user)

        // Send email verification
        sendEmailVerification(user).then(() => {
            console.log('Verification email sent.')
            });

        setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code

            if (errorCode === 'auth/email-already-in-use') {
                signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // User exists and is signed in successfully
                    const user = userCredential.user;
                    console.log('User signed in:', user);
                    setUser(user);
                })
            }
        })
  }

  export default createAccount