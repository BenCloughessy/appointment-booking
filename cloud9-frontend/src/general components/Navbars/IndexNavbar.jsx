import React from "react";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import MediaQuery from 'react-responsive';

import logoText from "../../assets/img/logoText.png"
import lightLogo from "../../assets/img/lightLogo.png"


function IndexNavbar({ color }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // Change navbar color on scroll down
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
                  href="https://www.instagram.com/cloudnineskinbycat/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
              </NavItem>

              {/* Move the "Book an Appointment" button out of the NavItem */}
              <MediaQuery minWidth={992}>
              {(matches) =>
                matches && (
                  <NavItem>
                    <Button
                      className="nav-link btn-neutral"
                      color="info"
                      href="/login-page"
                    >
                      <p style={{ fontSize: 11 }}>Book an Appointment</p>
                    </Button>
                  </NavItem>
                )
              }
            </MediaQuery>

              {/* <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  href="/login-page"
                >
                  <p style={{ fontSize: 11}}>Book an Appointment</p>
                </Button>
              </NavItem> */}

              <NavItem>
                <NavLink href="/login-page">
                  <p style={{ fontSize: 11}}>Log In</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink>
                  <p href="tel:+15137609027" style={{ fontSize: 12}}>
                    (513) 760-9027
                  </p>
                </NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
