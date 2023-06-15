import React, { useContext, useState } from "react";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

import { useLocation } from "react-router-dom";

import UserContext from "../../user auth/utils/userContext";
import logoText from "../../assets/img/logoText.png"
import lightLogo from "../../assets/img/lightLogo.png"


function LoggedInNavbar({ color, setIconPills }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // Setup copy email function
  const [copySuccess, setCopySuccess] = useState('')

  const email = "cloudnineskinbycat@yahoo.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopySuccess('Copied!')
      // Hide success message after 3 seconds
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Pulling sign-out function from context
  const { handleSignOut } = useContext(UserContext)

  // Get current path
  const location = useLocation()

  // handle custom navigation
  const handleNav = (e, icon, currentPath) => {
    
    if (currentPath === "/appointment-page") {
      e.preventDefault()
      setIconPills(icon)
      document
        .getElementById("appointment-header-tabs")
        .scrollIntoView({behavior: "smooth", block: "start"})
    }
  }


  // change navbar color on scroll down
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    }

    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}

      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="primary">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/index"
            >
              {/* Render lighter text for dark background */}
              {color === "dark" ? (
                <img 
                alt="Cloud 9"
                src={lightLogo}
                style={{ height: 45}}
                /> )
                :( 
                <img 
                alt="Cloud 9"
                src={logoText}
                style={{ height: 45}}
                /> )}

            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              
              <NavItem>
                <NavLink
                  onClick={() => handleCopyEmail()}
                >
                  <p style={{ fontSize: 11}}>
                    {email} {copySuccess && <span style={{color: 'green'}}>{copySuccess}</span>}
                  </p>
                </NavLink>
              </NavItem>
                    
              <NavItem>
                <NavLink>
                  <p style={{ fontSize: 12}}>
                    (513) 760-9027
                  </p>
                </NavLink>
              </NavItem>
                  
                    
                  

              <NavItem>
              <NavLink 
                href="/appointment-page"
                onClick={(e) => handleNav(e, "Book An Appointment", location.pathname)}
              >
                  <p style={{ fontSize: 11}}>Book Appointment</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                href="/appointment-page"
                onClick={(e) => handleNav(e, "My Appointments", location.pathname)}
                >
                  <p style={{ fontSize: 11}}>My Appointments</p>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  onClick={() => {handleSignOut()}}
                >
                  <p style={{ fontSize: 11}}>Sign Out</p>
                </Button>
              </NavItem>

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default LoggedInNavbar;
