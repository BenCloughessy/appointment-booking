import { useContext, useState } from "react";

import UserContext from "../user auth/utils/userContext";
import bookAppointment from "../booking system/bookAppointment";
import formatDate from "../booking system/formatDate";
import cancelAppointment from "../booking system/cancelAppointment";

// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
    Row,
    Col,
  } from "reactstrap";

const BookAppointment = ({ datetime, servicePackage, handleReset, refreshAppointments, isModal, eventId, setRescheduleModal, setModalInitial, guestEmail }) => {
    // Destructure user
    const {user} = useContext(UserContext);

    // Setup Modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const openModalAndRefresh = () => {
      toggleModal()
      refreshAppointments()
      handleReset()
  }
  
    const bookingRequest = {
        user,
        datetime,
        type: servicePackage,
        guestEmail
    }

    // Send booking request
    const sendBookingRequest = async () => {
        // Check that all options have been selected
        if(datetime && servicePackage) {
            bookAppointment(bookingRequest)
            .then((bookingRes) => {
              // If booking successful
              if(bookingRes) {
                // if isModal == true, we are rescheduling an appointment, so we need to cancel the old appointment
                if(isModal) {
                  setRescheduleModal(false)
                  setModalInitial(false)
                  cancelAppointment(user, eventId)
                  .then((cancelRes) => {
                    // if cancellation successful, open confirmation modal with new appointment data
                    if(cancelRes) {
                      openModalAndRefresh()
                    } 
                  }) 
                } 
                // if isModal == false, we are booking an appointment, so we need to open confirmation modal with new appointment data
                else {
                  openModalAndRefresh()
                }
              }
            })
        } else {
            alert("Please select all options")
            return
        }
    }
    
        return (
            <>
              {/* Render close modal button if component is rendered in a modal */}
              {isModal &&
                <Button
                  color="info"
                  onClick={() => setRescheduleModal(false)}
                  className="btn-round btn-lg"
                >
                  Cancel
                </Button>
              }

              <Button
                  color="info"
                  onClick={sendBookingRequest}
                  className="btn-round btn-lg"
              >
                  {isModal ? "Reschedule" : "Book Appointment"}
              </Button>

              {/* Modal */}
              {servicePackage && 
                <Row id="modals">
                  <Col md="6">
                    <Modal isOpen={modal} toggle={toggleModal}>
                      <div className="modal-header justify-content-center">
                        <button
                          className="close"
                          type="button"
                          onClick={() => toggleModal()}
                        >
                          <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button>
                        <h4 className="title title-up">
                          {user.displayName ?  
                            `Thanks, ${user.displayName.split(' ')[0]}. You're Booked!` : 
                            "You're Booked!"
                          }
                        </h4>
                      </div>

                      <ModalBody>
                        <div style={{textAlign: "center"}}>
                            <h5>{servicePackage.service}</h5>

                            {servicePackage.addons &&
                              <h5>{servicePackage.addons}</h5>
                            }

                            <h5>
                              Date:{" "}
                              {datetime ? formatDate(datetime).date : "Not specified"}
                            </h5>

                            <h5>
                              Time:{" "}
                              {datetime ? `${formatDate(datetime).startTime} - ${formatDate(datetime).endTime}` : "Not specified"}
                            </h5>
                          </div>
                      </ModalBody>
                      <div className="modal-footer justify-content-end">
                        
                        <Button
                          color="info"
                          type="button"
                          onClick={() => toggleModal()}
                        >
                          See You Soon!
                        </Button>
                      </div>
                    </Modal>
                  </Col>
                </Row>
              }
              
            </>
        )
    }

export default BookAppointment