import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, CardText } from 'reactstrap'

import UserContext from "../user auth/utils/userContext";
import getAppointments from '../booking system/getAppointments';
import formatDate from '../booking system/formatDate';
import RescheduleAppointment from './RescheduleAppointment';
import SearchBar from "../admin components/SearchBar"

const UserAppointments = ({ refresh, refreshAppointments, events, eventMap }) => {

    // Destructure user
    const {user} = useContext(UserContext);

    // Search Params
    const [searchParams, setSearchParams] = useState({
        day: null,
        time: null,
        booking: null,
        type: null,
        email: null
    })

     // Setup Modals and selected event
    const [modalInitial, setModalInitial] = useState(false)
    const [mappedEvent, setMappedEvent] = useState(null)
    
    // User Appointments
    const [userAppointments, setUserAppointments] = useState([]);

    // Track when searching on SearchBar to display no results message
    const [searching, setSearching] = useState(false)

    // Fetch appointments on page load or pre-determined refresh points if not being passed events
    useEffect(() => {
        if (events) {
            setUserAppointments(events)
        } else {
            getAppointments(user, searchParams)
            .then(res => setUserAppointments(res))
            .catch(err => console.log(err))
        }
      }, [user, refresh, events])

      useEffect(() => {
        console.log(userAppointments)
      }, [userAppointments])

    //   Map user appointments to display
    const userAppointmentsMap = () => (
        userAppointments.map((appointment) => {
        // create datetime object
        const datetime = {
            start: appointment.start.dateTime,
            end: appointment.end.dateTime
        }

        // format datetime
        const startTime = formatDate(datetime).startTime
        const endTime = formatDate(datetime).endTime
        const date = formatDate(datetime).date

        // Map event for RescheduleEvent
        const mappedEvent = {
            type: appointment.summary,
            date,
            start: startTime,
            end: endTime,
            attendee: appointment.attendees[0].email,
            id: appointment.id,
            details: appointment.description
            }

        return(
            <Col key={appointment.id} xs="12">
                <Card 
                    className='hover'
                    onClick={() => {
                        setMappedEvent(mappedEvent)
                        setModalInitial(true)
                    }}
                >
                    <CardHeader className=' lg-font'>{appointment.summary}</CardHeader>
                    <hr style={{width: '60%', margin: 'auto'}}/>
                    <CardBody>
                        <CardText className='lg-font'>{`${date}`}</CardText>
                        <CardText className='lg-font'>{ `${startTime} - ${endTime}` }</CardText>
                    </CardBody>
                </Card>  
            </Col>
        )
        })
    )

    if (userAppointments.length === 0 && !searching) {
        return (
            <>
                <p>No appointments right now. Head over to the "Book an Appointment" tab to book one!</p>
            </>
        )  
    }
    
    else {
        return (
            <>
            {events &&
                <SearchBar eventMap={eventMap} events={events} setUserAppointments={setUserAppointments} setSearching={setSearching} />
            }
                <Container>
                    <Row>
                        {userAppointments.length > 0 ? userAppointmentsMap() : <p>No appointments found</p>}  
                    </Row>
                </Container>

                {/* Modal */}
                {mappedEvent &&
                    <RescheduleAppointment event={mappedEvent} modalInitial={modalInitial} setModalInitial={setModalInitial} refresh={refresh} refreshAppointments={refreshAppointments} />
                }
            </>
        )
    }

    
}

export default UserAppointments
