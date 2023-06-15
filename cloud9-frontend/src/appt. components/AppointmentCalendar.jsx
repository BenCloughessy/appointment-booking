import { Row, Col } from "reactstrap"
import DateTime from "react-datetime"
import { useState, useEffect, useContext } from "react";

import getAppointments from "../booking system/getAppointments";
import UserContext from "../user auth/utils/userContext";
import ShowAvailability from "./ShowAvailability"

const AppointmentCalendar = ({ handleTimeSelectionChange, reset, isModal, servicePackage }) => {
    // Destructure user
    const {user} = useContext(UserContext);

    // Free Time
    const [freeTime, setFreeTime] = useState([])

    // Search Params
    const [searchParams, setSearchParams] = useState({
        day: null,
        time: null,
        booking: true,
        type: null,
        email: null
    })

    // Update type on servicePackage change
    useEffect(() => {
        if(servicePackage) {
            setSearchParams(prevState => ({
                ...prevState,
                type: servicePackage
            }));
        }
    }, [servicePackage]);
    
    // Function to handle date change
    const handleDateChange = (date) => {
        const isoDate = date.toISOString()

        setSearchParams((prevState) => ({
            ...prevState,
            day: isoDate,
        }))
      }

    // Fetch appointments on date or service change
    useEffect(() => {
        const fetchFreeTime = async () => {
            if (searchParams.day && searchParams.type) {
                try {
                    const freeTime = await getAppointments(user, searchParams)
                    setFreeTime(freeTime)
                } catch (error) {
                    console.error("Error fetching appointments:", error)
                }
            }
        } 
        fetchFreeTime()
    }, [searchParams, user])

    // Reset freeTime on reset
    useEffect(() => {
        if (reset) {
          setFreeTime([])
        }
      }, [reset]);

    return (
        <>
            {/* Appointment Calendar */}
            <Row> 
                <Col className="d-flex justify-content-center mt-3">
                        <DateTime 
                            timeFormat={false}
                            input={false}
                            onChange={(value) => {
                                handleDateChange(value)
                            }}
                        />
                </Col>
            </Row>

            {/* Show Availability  */}
            {(freeTime.length > 0) &&
                <ShowAvailability freeTime={freeTime} handleTimeSelectionChange={handleTimeSelectionChange} isModal={isModal} />
            }
        </>
        
    )
}

export default AppointmentCalendar
    
        
