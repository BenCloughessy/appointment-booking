import { Button, Row, Col } from "reactstrap"
import { useState, useEffect } from "react"

const ShowAvailability = ({ freeTime, handleTimeSelectionChange, isModal }) => {
    const [timeSelection, setTimeSelection] = useState(null)
    const [selectedButton, setSelectedButton] = useState(null)

    // Set time selection to be used in booking page
    const handleTimeSelection = (index) => {
        setTimeSelection(freeTime[index])
        setSelectedButton(index)
    }

    // Lift up timeSelection state to AppointmentCalendar > SearchAppointments
    useEffect(() => {
        const sendTimeSelection = async () => {
            if (timeSelection) {
                try {
                    handleTimeSelectionChange(timeSelection)
                } catch (error) {
                    console.error("Error setting timeSelection:", error)
                }
            }
        }
        
        sendTimeSelection()
    }, [timeSelection, handleTimeSelectionChange])
    
    return (
        <Row style={{padding: "20px"}}>
            {freeTime.map((slot, index) => (
                <Col 
                    xs="12" sm="6" md="4" lg="3" 
                    key={index} 
                    className= {`d-flex justify-content-center align-items-center ${isModal ? ' modal-col' : ''}`}
                >
                    <Button 
                    className={`btn-neumorphism ${selectedButton === index ? 'selected' : ''}`}
                    onClick={() => handleTimeSelection(index)}
                    >
                        {new Date(slot.start).toLocaleTimeString()} <br /> - to - <br /> {new Date(slot.end).toLocaleTimeString()}
                        <br />
                    </Button>
                </Col>
            ))}
            
        </Row>
    )
}

export default ShowAvailability