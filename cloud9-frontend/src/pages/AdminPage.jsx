import { useContext, useState, useEffect } from 'react';

import LandingPageHeader from "../general components/Headers/LandingPageHeader"
import AdminNavbar from "../general components/Navbars/AdminNavbar"
import UserContext from "../user auth/utils/userContext";
import AdminCalendar from "../admin components/AdminCalendar"
import UserAppointments from "../appt. components/UserAppointments"
import SearchAppointments from "../appt. components/SearchAppointments"
import getAppointments from "../booking system/getAppointments";

// reactstrap components
import {
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Card
  } from "reactstrap";

    //  load appointments 
    const loadEvents = async ( user, searchParams ) => {
        const events = await getAppointments(user, searchParams);

        const eventMap = events.map(event => ({
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        description: event.attendees[0].email,
        id: event.id,
        details: event.description
        }))

        // Admin calendar and UserAppointments expect different event formats, due to lack of foresight. eventMap => AdminCalendar, events => UserAppointments
        return {
            events,
            eventMap
        }
    }

const AdminPage = () => {

    // Destructure User
  const {user} = useContext(UserContext)

  // isAdminPage for children components
  const isAdminPage = true
  
  // State Variables
  const [iconPills, setIconPills] = useState("My Calendar")
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

    // Watch for events load or refresh
    const [events, setEvents] = useState([])
    const [eventMap, setEventMap] = useState([])

    useEffect(() => {
        if(user) {
        loadEvents(user, searchParams)
        .then(events => {
            setEvents(events.events)
            setEventMap(events.eventMap)
        })
        }
    }, [user, refresh])

        return (
            <>
                <AdminNavbar setIconPills={setIconPills} />

                <LandingPageHeader />

                    {/* View, Book, or Search Appointments */}
                    <Card className="admin-card" id='admin-card-start'>
                        <CardHeader>
                        <Nav className="justify-content-center nav-tabs-neutral hover" role="tablist" tabs data-background-color="blue">
                        <NavItem>
                                <NavLink
                                    className={iconPills === "My Calendar" ? "active" : ""}
                                    href="#pablo"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    setIconPills("My Calendar");
                                    }}
                                >
                                    <i className="now-ui-icons shopping_cart-simple"></i>
                                    My Calendar
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={iconPills === "Book An Appointment" ? "active" : ""}
                                    href="#pablo"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    setIconPills("Book An Appointment");
                                    }}
                                >
                                    <i className="now-ui-icons shopping_cart-simple"></i>
                                    Book An Appointment
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className= {iconPills === "My Appointments" ? "active" : ""}
                                    href="#pablo"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    setIconPills("My Appointments");
                                    }}
                                >
                                    <i className="now-ui-icons objects_umbrella-13"></i>
                                    Search Appointments
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </CardHeader>
                
                        <CardBody>
                        <TabContent
                            className="text-center"
                            activeTab={iconPills}
                        >
                            <TabPane tabId="My Calendar">
                                <div className="section section-admin-calendar">
                                    <AdminCalendar refreshAppointments={refreshAppointments} refresh={refresh} events={eventMap} />
                                </div>
                            </TabPane>

                            <TabPane tabId="My Appointments">
                                <UserAppointments refreshAppointments={refreshAppointments} refresh={refresh} events={events} eventMap={eventMap} />
                            </TabPane>

                            <TabPane tabId="Book An Appointment">       
                                <SearchAppointments refreshAppointments={refreshAppointments} refresh={refresh} isAdminPage={isAdminPage} />
                            </TabPane>
                        </TabContent>
                        </CardBody>
                    </Card>
            </>
        )
    
}

export default AdminPage