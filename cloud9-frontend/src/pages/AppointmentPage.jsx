import React, { useState, useEffect } from "react";

// reactstrap components
import {
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Card
} from "reactstrap";

// core components
import LandingPageHeader from "../general components/Headers/LandingPageHeader"
import Tabs from "../general components/Tabs"
import LoggedInNavbar from "../general components/Navbars/LoggedInNavbar"
import SearchAppointments from "../appt. components/SearchAppointments"
import UserAppointments from "../appt. components/UserAppointments"


function AppointmentPage() {
  
  // State Variables
  const [iconPills, setIconPills] = useState("Book An Appointment")
  const [refresh, setRefresh] = useState(false)

  // Search Params
  const [searchParams, setSearchParams] = useState({
    day: null,
    time: null,
    booking: null,
    type: null,
    email: null
  })

  // Function to update search params
  const updateSearchParams = (key, value) => {
    setSearchParams({
      ...searchParams,
      [key]: value
    })
  }

  // Function to refresh appointments
  const refreshAppointments = () => {
    console.log("Refreshing Appointments")
    setRefresh(!refresh)
  }


  useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

     return (
      <>
        <LoggedInNavbar color="dark" iconPills={iconPills} setIconPills={setIconPills} />
        <div className="wrapper">
          <LandingPageHeader />
          <div className="section section-about-us">
            <Container >
              <Tabs />
              {/* View or Book Appointment */}
              <div id="appointment-header-tabs">     
              <Card >
                <CardHeader >
                  <Nav className="justify-content-center nav-tabs-neutral hover" role="tablist" tabs data-background-color="blue">
                      <NavItem id="book-appointment">
                          <NavLink
                              className={iconPills === "Book An Appointment" ? "active" : ""}
                              href="#pablo"
                              onClick={(e) => {
                              e.preventDefault();
                              setIconPills("Book An Appointment");
                              }}
                          >
                              <i className="now-ui-icons ui-1_calendar-60"></i>
                              Book An Appointment
                          </NavLink>
                      </NavItem>

                      <NavItem id="my-appointments">
                          <NavLink
                              className= {iconPills === "My Appointments" ? "active" : ""}
                              href="#pablo"
                              onClick={(e) => {
                              e.preventDefault();
                              setIconPills("My Appointments");
                              }}
                          >
                              <i className="now-ui-icons users_single-02"></i>
                              My Appointments
                          </NavLink>
                      </NavItem>
                  </Nav>
                </CardHeader>
          
                <CardBody className="lg">
                  <TabContent
                    className="text-center"
                    activeTab={iconPills}
                  >
                    <TabPane tabId="My Appointments">
                      <UserAppointments refreshAppointments={refreshAppointments} refresh={refresh} />
                    </TabPane>

                    <TabPane tabId="Book An Appointment">       
                      <SearchAppointments refreshAppointments={refreshAppointments} refresh={refresh} />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }


export default AppointmentPage;
