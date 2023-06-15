import { useContext, useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Modal,
    ModalBody
  } from "reactstrap";

  import createAccount from "../utils/createAccount"
  import validateEmail from "../utils/validateEmail";
  import UserContext from "../utils/userContext";
import sendResetPasswordEmail from "../utils/sendPasswordEmail";


const AccountModal = ({ accountModal, toggleAccountModal, accountModalInfo, email, setEmail, password, setPassword, emailValidation, setEmailValidation }) => {

    //   pulling user info from context
  const { setUser } = useContext(UserContext)

    //  Store error and error message
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false) 

  //   resetting email and password
  useEffect(() => {
    setEmailValidation(false)
  }, [])

    return (
        <Modal
            modalClassName="modal-mini modal-info"
            toggle={() => toggleAccountModal()}
            isOpen={accountModal}
        >
            <div className="modal-header justify-content-center">
                <h5>{accountModalInfo.title}</h5>
            </div>

        {/* Modal body for creating account vs password help */}
        {accountModalInfo.passwordHelp ? 
            <ModalBody>
            {accountModalInfo.message && <p>{accountModalInfo.message}</p>}
                <Form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                        <p>{`Email: ${email ? email : ""}`} 
                            <Input
                                type="text"
                                style={{fontSize: "16px"}}
                                autoComplete="chrome-off"
                                onBlur={() => {
                                    setEmailValidation(validateEmail(email))
                                }}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailValidation(validateEmail(email))
                                }}
                                valid={emailValidation}
                                invalid={(email) ? !emailValidation : emailValidation}
                            ></Input>
                        </p>
                    </FormGroup>
                </Form>
            </ModalBody>
            :
            <ModalBody>
            {accountModalInfo.message && <p>{accountModalInfo.message}</p>}
                <Form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                        <p>{`Email: ${email ? email : ""}`} 
                            <Input
                                type="text"
                                style={{fontSize: "16px"}}
                                autoComplete="chrome-off"
                                onBlur={() => {
                                    setEmailValidation(validateEmail(email))
                                }}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailValidation(validateEmail(email))
                                }}
                                valid={emailValidation}
                                invalid={(email) ? !emailValidation : emailValidation}
                            ></Input>
                        </p>

                        <FormFeedback invalid={errorMessage} tooltip>
                            {errorMessage}
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <p>{`Password: ${password ? password : ""}`} 
                            <Input
                                type="password"
                                style={{fontSize: "16px"}}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>
                        </p>
                    </FormGroup>
                </Form>
            </ModalBody>
    }
            

            <div className="modal-footer">
                <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={() => {
                        toggleAccountModal()
                    }}
                >
                    Cancel
                </Button>

                <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={() => {
                        accountModalInfo.passwordHelp ?
                        sendResetPasswordEmail(email, setError, setErrorMessage):
                        createAccount(email, password, setUser, setError, setErrorMessage);

                        toggleAccountModal()
                    }}
                >
                    {accountModalInfo.buttonText}
                </Button>
            </div>
        </Modal>
    )
}

export default AccountModal