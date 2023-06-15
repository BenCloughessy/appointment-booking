import { useState, useEffect } from "react";
import clouds4 from "../assets/img/aiClouds4.png"

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Col
} from "reactstrap";

// core components
import IndexNavbar from "../general components/Navbars/IndexNavbar";
import GoogleAuth from "../user auth/components/GoogleAuth";
import CredentialedAuth from "../user auth/components/CredentialedAuth";
import AccountModal from "../user auth/components/AccountModal";
import validateEmail from "../user auth/utils/validateEmail";

function LoginPage() {

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  // setup modal for password reset or create account
  const [accountModal, setAccountModal] = useState(false)
  const [accountModalInfo, setAccountModalInfo] = useState({})

  const toggleAccountModal = () => {
      setAccountModal(!accountModal)
      setEmailValidation(null)
  
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // form validation
  const [emailValidation, setEmailValidation] = useState(null);

  return (
    <>
      <IndexNavbar color="dark" />

      <div className="page-header d-flex justify-content-center align-items-center" >
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${clouds4})`
          }}
        ></div>

        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto">
              <Card className="card-login card-plain">
                  <CardHeader className="text-center"></CardHeader>

                  <CredentialedAuth
                    // props to control modal
                    accountModal={accountModal} 
                    toggleAccountModal={toggleAccountModal} 
                    // props for modal content
                    accountModalInfo={accountModalInfo} 
                    setAccountModalInfo={setAccountModalInfo}
                    // state props for login/create account
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    // state props for email validation
                    emailValidation={emailValidation}
                    setEmailValidation={setEmailValidation}
                    validateEmail={validateEmail}
                  />

                  <CardFooter className="text-center">
                    <GoogleAuth />

                    <div >
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault()
                            setAccountModalInfo({
                              title: 'Create Account',
                              buttonText: 'Create Account'
                            })
                            setEmailValidation(false)
                            setEmail('')
                            setPassword('')
                            toggleAccountModal()
                          }}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>

                    {/* <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div> */}
                  </CardFooter>
              </Card>
            </Col>
          </Container>
        </div>
      </div>

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
  );
}

export default LoginPage;
