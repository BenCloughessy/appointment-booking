import { useEffect, useState } from 'react';

// reactstrap components
import {
    Container,
    Row,
    Col
  } from "reactstrap";

//   Custom Components
import AppointmentType from "./AppointmentType";
import AppointmentCalendar from './AppointmentCalendar';
import BookAppointment from './BookAppointment';

const SearchAppointments = ({ refreshAppointments, isModal, eventId, setRescheduleModal, setModalInitial, isAdminPage }) => {
    const [datetime, setDatetime] = useState(null)
    const [servicePackage, setServicePackage] = useState(null)

    // For admin booking guest over the phone
    const [guestEmail, setGuestEmail] = useState(null)

    // Control the state reset trigger
    const [reset, setReset] = useState(false);

    const handleReset = () => {
        setReset((prevReset) => !prevReset);
      };
        
    // Retrieve time selection from AppointmentCalendar > ShowAvailability
    const handleTimeSelectionChange = (timeSelection) => {
        setDatetime(timeSelection)
      };

      // Retrieve service package from AppointmentType
    const handleServicePackageChange = (servicePackage) => {
      setServicePackage(servicePackage)
    }

    return(
        <>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto ">

                {/* Input guest email if on admin page */}
                {isAdminPage && (
                  <Row>
                    <Col className="mt-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter guest email"
                        onChange={(e) => setGuestEmail(e.target.value)}
                      />
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col className="mt-4">
                    {/* return appointment type */}
                    <AppointmentType
                      // props to lift up appointment type state change
                      handleServicePackageChange={handleServicePackageChange}
                      // props to reset UI after booking
                      reset={reset}
                      // props to reschedule appointment
                      isModal={isModal} 
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {/* return appointment datetime */}
                    <AppointmentCalendar
                      // props to lift up time selection state change
                      handleTimeSelectionChange={handleTimeSelectionChange}
                      // props to reset UI after booking
                      reset={reset}
                      // props to reschedule appointment
                      isModal={isModal} 
                      // props to find correct free time slots
                      servicePackage={servicePackage}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex justify-content-center mt-3">
                    {/* consume datetime, type, and user */}
                    <BookAppointment
                      // props to book event
                      datetime={datetime} 
                      servicePackage={servicePackage}
                      guestEmail={guestEmail}
                      // props to reset UI after booking
                      handleReset={handleReset} 
                      // props  to refresh appointments list
                      refreshAppointments={refreshAppointments}
                      // props to reschedule appointment
                      setRescheduleModal={setRescheduleModal}  
                      isModal={isModal}
                      eventId={eventId}
                      setModalInitial={setModalInitial}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
    )
}

export default SearchAppointments
