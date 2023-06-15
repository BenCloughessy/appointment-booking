import React, { useEffect, useContext, useState } from 'react'
import { Row, Col, Modal, ModalBody, Button } from 'reactstrap'

import UserContext from "../user auth/utils/userContext";
import cancelAppointment from '../booking system/cancelAppointment';
import SearchAppointments from "./SearchAppointments"

const RescheduleAppointment = ({ event, modalInitial, setModalInitial, refresh, refreshAppointments }) => {

    // Destructure user
    const {user} = useContext(UserContext);

    // Setup Modal, mini-modal, reschedule modal
    const [modal, setModal] = useState(false);
    const [miniModal, setMiniModal] = useState(false);
    const [rescheduleModal, setRescheduleModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
        setModalInitial(false)
    }

    // Reset modals after closing
    useEffect(() => {
        if(modalInitial) {
            setModal(modalInitial)
        } 
    }, [modalInitial])

    return (
        <>
            <Row id="modals">
                <Col md="6">
                    <Modal isOpen={modal} toggle={toggleModal} >
                        <div className="modal-header justify-content-center">
                            <button
                                className="close position-unset"
                                type="button"
                                onClick={() => {
                                    console.log("Closing modal")
                                    toggleModal()
                                }}
                            >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                        </div>

                        <ModalBody>
                            <h5>{event.type}</h5>

                            {event.details &&<h5>{event.details}</h5>}

                            <h5>
                                Date:{" "}
                                {event.date}
                            </h5>
                            <h5>
                                Time:{" "}
                                {`${event.start} - ${event.end}`}
                            </h5>
                            <h5>
                                Email:{" "}
                                {event.attendee}
                            </h5>
                        </ModalBody>

                        <div className="modal-footer">
                            <Button 
                                color="danger" 
                                type="button"
                                onClick={() => {
                                    toggleModal()
                                    setMiniModal(true)
                                }}
                            >
                                Cancel Appointment
                            </Button>

                            <Button
                                color="success"
                                type="button"
                                onClick={() => {
                                    toggleModal()
                                    setRescheduleModal(true)
                                }}
                            >
                                Reschedule Appointment
                            </Button>
                        </div>
                    </Modal>
                </Col>
            </Row>
            
            {/* Mini-Modal */}
            <Modal
                modalClassName="modal-mini modal-info"
                toggle={() => setMiniModal(false)}
                isOpen={miniModal}
            >
                <ModalBody>
                    <p>Are you sure you want to cancel this appointment?</p>
                </ModalBody>

                <div className="modal-footer">
                    <Button
                        className="btn-neutral"
                        color="link"
                        type="button"
                        onClick={() => {
                            setMiniModal(false)
                            setModalInitial(false)
                        }}
                    >
                        Nevermind!
                    </Button>
                    <Button
                        className="btn-neutral"
                        color="link"
                        type="button"
                        onClick={() => {
                            setMiniModal(false)
                            setModalInitial(false)
                            cancelAppointment(user, event.id)
                            .then((res) => {
                                // refresh list if cancel was successful 
                                if(res) {
                                    refreshAppointments()
                                } else {
                                    // display error message?
                                }
                            })   
                        }}
                    >
                        Cancel Appointment
                    </Button>
                </div>
            </Modal>

            {/* Reschedule Appointment Modal */}
            <Row id="modals">
                <Col md="6">
                    <Modal isOpen={rescheduleModal} toggle={() => setRescheduleModal(false)}>
                        <div className="modal-header justify-content-center">
                            <button
                                className="close"
                                type="button"
                                onClick={() => {
                                    setRescheduleModal(false)
                                    setModalInitial(false)
                                }}
                            >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <div style={{textAlign: "center", marginTop: "10px"}}>
                                <h4 className="title title-up">Previous Appointment:</h4>
                                <h4 className="title-up">{event.type}</h4>
                                <h5>
                                    Date:{" "}
                                    {event.date}
                                </h5>
                                <h5>
                                    Time:{" "}
                                    {`${event.start} - ${event.end}`}
                                </h5>
                            </div>
                        </div>

                        <ModalBody>
                            <SearchAppointments
                                // props to refresh appointment list
                                refreshAppointments={refreshAppointments} 
                                refresh={refresh}
                                // props to reschedule appointment
                                isModal={true}
                                eventId={event.id}
                                setRescheduleModal={setRescheduleModal}
                                // props to close modal
                                setModalInitial={setModalInitial}
                            />
                        </ModalBody>
                    </Modal>
                </Col>
            </Row>
        </>
    )
}

export default RescheduleAppointment