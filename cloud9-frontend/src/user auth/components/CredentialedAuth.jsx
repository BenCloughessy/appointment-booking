import React, { useContext, useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import UserContext from '../utils/userContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// reactstrap components
import {
    Button,
    CardBody,
    Input,
    FormFeedback,
    Form,
    FormGroup,
  } from "reactstrap";

import AccountModal from './AccountModal';

// Login with credentials component
const CredentialedAuth = ({ accountModal, accountModalInfo, setAccountModalInfo, toggleAccountModal, emailValidation, setEmailValidation, validateEmail }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  //   count sign-in attempts
  const [signInAttempts, setSignInAttempts] = useState(0)

  //   pulling user info from context
  const { setUser } = useContext(UserContext)

  //   setting focus state for inputs
  const [emailFocus, setEmailFocus] = React.useState(false)
  const [passwordFocus, setPasswordFocus] = React.useState(false)

  const handleSubmit = async (e) => {
    console.log(signInAttempts)
    e.preventDefault()

    // Validate email format
    setEmailValidation(validateEmail(email))
    
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
        // User exists and is signed in successfully
        const user = userCredential.user
        console.log('User signed in:', user)
        setUser(user)
    })
    .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        // Increment sign-in attempts
        setSignInAttempts(signInAttempts + 1)

        // User not found, so create a new user
        if (errorCode === "auth/user-not-found") {
            setAccountModalInfo({
                title: 'Create Account',
                message: `We couldn't find ${email}. Would you like to create an account?`,
                buttonText: 'Create Account'
            })
            toggleAccountModal()
        }

        // Wrong password
        else if (errorCode === "auth/wrong-password" && signInAttempts <= 1) {
            console.error('Error signing in:', errorMessage);
            setPasswordError(errorMessage); // Store the error message
        } 

        // Too many attempts
        else if (errorCode === "auth/too-many-requests" || signInAttempts >= 2) {
            // Open reset password model
            console.log('Too many requests')
            setAccountModalInfo({
                passwordHelp: true,
                title: 'Password Help',
                message: `We're having trouble logging in. Please check your email for password assistance`,
                buttonText: 'Send me an email!'
            })
            toggleAccountModal()
            setSignInAttempts(0)
        }

        // 
    });
  };

    return (
        <>
            <CardBody>
                <Form>
                    <FormGroup
                        className={
                            "no-border input-lg" +
                            (emailFocus ? " input-group-focus" : "")  
                        }
                    >
                        <Input
                            placeholder="Email..."
                            type="text"
                            style={{ fontSize: '16px' }}
                            autoComplete="chrome-off"
                            onFocus={() => {
                                setEmailFocus(true)
                            }}
                            onBlur={() => {
                                setEmailFocus(false)
                                setEmailValidation(validateEmail(email))
                            }
                            }
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            valid={emailValidation}
                    ></Input>
                    </FormGroup>

                    <FormGroup
                        className={
                            "no-border input-lg" +
                            (passwordFocus ? " input-group-focus" : "") 
                        }
                    > 
                        <Input
                            placeholder="Password..."
                            type={showPassword ? "text" : "password"}
                            style={{ fontSize: '16px' }}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            onChange={(e) => setPassword(e.target.value)}
                            invalid={passwordError ? true : false}
                        ></Input>

                        {passwordError && 
                            <FontAwesomeIcon 
                                icon={faEye} 
                                onClick={() => setShowPassword(!showPassword)} 
                                size='xl' 
                                style={{cursor: 'pointer', position: 'absolute', right: '-10%', top: '12%'}}
                            />}

                        <FormFeedback invalid={passwordError} tooltip>
                            We're having trouble logging in. Could you double check your info?
                        </FormFeedback>
                    </FormGroup>
            </Form>
                
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}}> 
                <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => handleSubmit(e)}
                    size="lg"
                    style={{width: '80%', fontSize: '16px'}}
                >
                    Continue
                </Button>
            </div>
            </CardBody>

            {/* Account Modal */}
            <AccountModal 
                // props to format modal
                accountModal={accountModal} 
                toggleAccountModal={toggleAccountModal} 
                accountModalInfo={accountModalInfo} 
                // props to create account
                email={email} 
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                // props to validate email
                emailValidation={emailValidation}
                setEmailValidation={setEmailValidation}
            />
        </>
    )
}

export default CredentialedAuth
