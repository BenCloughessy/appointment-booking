import React, { useContext } from "react";
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

import { useLocation } from "react-router-dom";

import UserContext from "../../user auth/utils/userContext"
import logoText from "../../assets/img/logoText.png"
import lightLogo from "../../assets/img/lightLogo.png"


function AdminNavbar({ color, setIconPills }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // Pulling sign-out function from context
  const { handleSignOut } = useContext(UserContext)

  // Get current path
  const location = useLocation()

  // handle custom navigation
  const handleNav = (e, icon, currentPath) => {
    
    if (currentPath === "/admin") {
      e.preventDefault()
      setIconPills(icon)
      document
        .getElementById("admin-card-start")
        .scrollIntoView({behavior: "smooth", block: "start"})
    }
  }

  // Disappear navabr on scroll down
  React.useEffect(() => {
    const updateNavbarColor = () => {

      if (
        document.documentElement.scrollTop > 279 ||
        document.body.scrollTop > 279
      ) {
        setNavbarColor("invisible");
      } else if (
        document.documentElement.scrollTop < 280 ||
        document.body.scrollTop < 280
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

      {!(navbarColor === "invisible") &&
        <Navbar className={"admin-navbar fixed-top " + navbarColor} expand="lg" color="primary" >
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
                  href="/admin"
                  onClick={(e) => handleNav(e, "Book An Appointment", location.pathname)}
                >
                  <p style={{ fontSize: 11}}>Book Appointment</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                  href="/admin"
                  onClick={(e) => handleNav(e, "My Appointments", location.pathname)}
                >
                  <p style={{ fontSize: 11}}>Search Appointments</p>
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
      </Navbar>}
    </>
  );
}

export default AdminNavbar;
