import { useState, useEffect } from "react";

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
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button
  } from "reactstrap";

  // Define addons
  const DisplayAddons = ({ iconPills, facialType, setAddons, addons, facialWaxingOptions, setFacialWaxingOptions }) => {

    // addon selection
    const [addonSelection, setAddonSelection] = useState({})

    const handleSelection = (e, selection) => {
        // Handle facial waxing options and all others differently
        if (iconPills === "Full-Body Waxing") {
            // If already selected, unselect it. Else add it to the array.
            if (facialWaxingOptions.includes(selection)) {
                setFacialWaxingOptions(facialWaxingOptions.filter(option => option !== selection))
            } else {
                setFacialWaxingOptions([...facialWaxingOptions, selection])
            }
            console.log(facialWaxingOptions)
        } else {
            
                // First, we create a new object and set all keys to false.
                const newAddons = Object.keys(addonSelection).reduce((acc, curr) => {
                    acc[curr] = false
                    return acc
                }, {})

                // Then we set the checkbox that was clicked to true.
                newAddons[selection] = e.target.checked

                // Finally, we update the state.
                setAddonSelection(newAddons)
                if (addons === selection) {
                    setAddons([])
                } else {
                    setAddons(selection)
                }
        }
        
    }

    // facial addons
    if (facialType === "Standard" ) {
        return (
            <FormGroup check className="facial-addons">
                <Label check >
                    <Input 
                        type="checkbox"
                        checked={addonSelection["Dermaplane"] || false}
                        onChange={(e) => handleSelection(e, "Dermaplane")}
                    ></Input>
                    <span className="form-check-sign mr-3">Dermaplane </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        checked={addonSelection["Microdermabrasion"] || false}
                        onChange={(e) => handleSelection(e, "Microdermabrasion")}
                    ></Input>
                    <span className="form-check-sign mr-3">Microdermabrasion </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        checked={addonSelection["LED Light Session"] || false}
                        onChange={(e) => handleSelection(e, "LED Light Session")}
                    ></Input>
                    <span className="form-check-sign mr-3">LED Light Session </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        checked={addonSelection["High Frequency"] || false}
                        onChange={(e) => handleSelection(e, "High Frequency")}
                    ></Input>
                    <span className="form-check-sign mr-3">High Frequency </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        checked={addonSelection["Carboxy Mask"] || false}
                        onChange={(e) => handleSelection(e, "Carboxy Mask")}
                    ></Input>
                    <span className="form-check-sign">Carboxy Mask</span>
                </Label>
            </FormGroup>
        )
    } 
    // Brow Addons
    else if (iconPills === "Brows") {
        return (
            <FormGroup check>
                <Label check >
                    <Input 
                        type="checkbox"
                        checked={addonSelection["Shape-Up + Brow-Mapping"] || false}
                        onChange={(e) => handleSelection(e, "Shape-Up + Brow-Mapping")}
                    ></Input>
                    <span className="form-check-sign">Shape-Up + Brow-Mapping </span>
                </Label>
            </FormGroup>
        )
    }
    // Waxing Addons
    else if (iconPills === "Full-Body Waxing") {
        return (
            <FormGroup check className="waxing-addons">
                <Label check >
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Eyebrow")}
                    ></Input>
                    <span className="form-check-sign mr-3">Eyebrow </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Upper Lip")}
                    ></Input>
                    <span className="form-check-sign mr-3">Upper Lip </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Lower Lip")}
                    ></Input>
                    <span className="form-check-sign mr-3">Lower Lip </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Cheeks")}
                    ></Input>
                    <span className="form-check-sign mr-3">Cheeks </span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Nose")}
                    ></Input>
                    <span className="form-check-sign mr-3">Nose</span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Ears")}
                    ></Input>
                    <span className="form-check-sign mr-3">Ears</span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Chin Strap")}
                    ></Input>
                    <span className="form-check-sign mr-3">Chin Strap</span>
                </Label>
                <Label check>
                    <Input 
                        type="checkbox"
                        onChange={(e) => handleSelection(e, "Sideburns")}
                    ></Input>
                    <span className="form-check-sign">Sideburns</span>
                </Label>
            </FormGroup>
        )
    }
  }

const AppointmentType = ({ handleServicePackageChange, reset, isModal }) => {
    const [iconPills, setIconPills] = useState("Lashes")

    // setup facials
    const [facialType, setfacialType] = useState("Standard")
    
    // Watch for service type
    const [service, setService] = useState('')

    const handleServiceSelection = (currentService) => {
        setDisplayAddons(false)
        setAddons([])

        if (currentService === service) {
            setService('')
        } else {
            setService(currentService)
        }
    }

    // Watch for addon selection
    const [addons, setAddons] = useState('')
    // facial waxing addon options
    const [facialWaxingOptions, setFacialWaxingOptions] = useState('')

    // Pull key data and lift state to SearchAppointments.js
    useEffect(() => {
        let servicePackage = ({
            service,
            addons,
            facialWaxingOptions
        })
        handleServicePackageChange(servicePackage)
    }, [service, addons, facialWaxingOptions])


    // Conditionally render addons
    const [displayAddons, setDisplayAddons] = useState(false)
    const toggleAddons = () => setDisplayAddons(!displayAddons)

    // Reset selection on reset
    useEffect(() => {
        if (reset) {
          setIconPills("Lashes")
        }
      }, [reset]);

    return (
        <>
            {/* Appointment Type */}
            <CardHeader>
                <Nav className="justify-content-center nav-tabs-outline" role="tablist" tabs>
                    <NavItem>
                        <NavLink
                            className={iconPills === "Lashes" ? "active" : ""}
                            href="#pablo"
                            onClick={(e) => {
                            e.preventDefault();
                            setIconPills("Lashes");
                            }}
                        >
                            Lashes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={iconPills === "Customized Facial" ? "active" : ""}
                            href="#pablo"
                            onClick={(e) => {
                            e.preventDefault();
                            setIconPills("Customized Facial");
                            }}
                        >
                            Customized Facials
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={iconPills === "Brows" ? "active" : ""}
                            href="#pablo"
                            onClick={(e) => {
                            e.preventDefault();
                            setIconPills("Brows");
                            }}
                        >
                            Brows
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={iconPills === "Full-Body Waxing" ? "active" : ""}
                            href="#pablo"
                            onClick={(e) => {
                            e.preventDefault();
                            setIconPills("Full-Body Waxing")
                            setDisplayAddons(false)
                            }}
                        >
                            Full-Body Waxing
                        </NavLink>
                    </NavItem>
                </Nav>
            </CardHeader>
        
        <CardBody>
            <TabContent
                className="text-center"
                activeTab={iconPills}
            >
                {/* Lashes with options */}
                <TabPane tabId="Lashes">
                    <Container className=" section-basic" id="basic-elements">
                        <Row className="justify-content-center">
                            <Col 
                                className= {`mb-4 ${isModal ? "modal-col" : ""}`} 
                                lg="11" sm="12"
                            >
                                <p className="category">Options</p>
                                {/* Lash Lift and Tint */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Lash Lift and Tint"}
                                            onChange={() => handleServiceSelection("Lash Lift and Tint")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Lash Lift and Tint - $90</p>
                                            <p className="text-left font-weight-normal ml-2">Lift lashes from the root.  A great alternative to lash extensions.</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Lash Lift */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Lash Lift"}
                                            onChange={() => handleServiceSelection("Lash Lift")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Lash Lift - $80</p>
                                            <p className="text-left font-weight-normal ml-2">Gives lashes a beautiful lift with the addition of a tint.</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Lash Tint */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Lash Tint"}
                                            onChange={() => handleServiceSelection("Lash Tint")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Lash Tint - $25</p>
                                            <p className="text-left font-weight-normal ml-2">Give your lashes rich color, making them appear fuller.</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </TabPane>

                {/* Facials with types and sub-options */}
                <TabPane tabId="Customized Facial">
                    <Container className=" section-basic" id="basic-elements">
                        <Row className="justify-content-center">
                            <Col 
                                className= {`mb-4 ${isModal ? "modal-col" : ""}`} 
                                sm="12" lg="11"
                            >
                                <p className="category">Types</p>

                                <Nav className="justify-content-center nav-tabs-outline" role="tablist" tabs>
                                    <NavItem>
                                        <NavLink
                                            className={facialType === "Standard" ? "active" : ""}
                                            href="#pablo"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            setfacialType("Standard")
                                            }}
                                        >
                                            <span>Standard (60min + Addons)</span>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={facialType === "Express" ? "active" : ""}
                                            href="#pablo"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            setfacialType("Express")
                                            }}
                                        >
                                            <span>Express (30 min)</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent
                                    className="text-center"
                                    activeTab={facialType}
                                >
                                    {/* Standard Facials */}
                                    <TabPane tabId="Standard">
                                        {/* Welcome Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                        <Label check>
                                            <Input 
                                                type="checkbox"
                                                checked={service === "Welcome Facial"}
                                                onChange={() => handleServiceSelection("Welcome Facial")}
                                            ></Input>
                                            <span className="form-check-sign"></span>
                                            <div>
                                            <p className="text-left font-weight-bold ml-2">Welcome Facial - $79</p>
                                            <p className="text-left font-weight-normal ml-2">Get to know our LIRA line with this $169 valued facial. (This is only for your first visit)</p>
                                            </div>
                                        </Label>
                                        </FormGroup>
                                        {/* Consultation */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Consultation"}
                                                    onChange={() => handleServiceSelection("Consultation")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <p className="text-left font-weight-bold ml-2">Consultation: $50</p>
                                                <p className="text-left font-weight-normal ml-2">If you just want to chat and decide the best direction for you, this is a great way to lead you in the proper journey for total skin health.  We have the time to build what is necessary.</p>
                                            </Label>
                                        </FormGroup>
                                        {/* Sensitive/ Rosacea Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Sensitive/ Rosacea Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Sensitive/ Rosacea Facial")
                                                    }}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Sensitive/ Rosacea Facial - $95</p>
                                                <p className="text-left font-weight-normal ml-2">Strengthen the skin barrier function through nourishing botanicals, potent anti-inflammatories and skin friendly hydrators. We get to know your triggers and teach you how to manage this condition.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Sensitive/ Rosacea Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    color="info"
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Sensitive/ Rosacea Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons} 
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                        {/* Pigment/ Brightening Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Pigment/ Brightening Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Pigment/ Brightening Facial")
                                                    }}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Pigment/ Brightening Facial - $95</p>
                                                <p className="text-left font-weight-normal ml-2">Treat unwanted pigmentation as a result of sun exposure acne and other environmental stressors.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Pigment/ Brightening Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    color="info"
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Pigment/ Brightening Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons} 
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                        {/* Anti-Aging Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Anti-Aging Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Anti-Aging Facial")
                                                    }}
                                                    color="info"
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Anti-Aging Facial - $105.</p>
                                                <p className="text-left font-weight-normal ml-2">We focus on authentic aging!</p>
                                                <p className="text-left font-weight-normal ml-2">Continues care with a firming/collagen and elastin stimulating facial is necessary for true authentic aging. We exfoliate to minimize fine lines and wrinkles, even out skintone while firming and toning the skin.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Anti-Aging Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Anti-Aging Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons}
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                        {/* Dry/Dehydrated Condition Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Dry/Dehydrated Condition Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Dry/Dehydrated Condition Facial")
                                                    }}
                                                    color="info"
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Dry/Dehydrated Condition Facial - $105</p>
                                                <p className="text-left font-weight-normal ml-2">This healthy barrier promoting, hydra tingly moisture driven facial gets rid of surface dehydration that allows that new  glowing skin to come forward.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Dry/Dehydrated Condition Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Dry/Dehydrated Condition Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons}
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                        {/* Acneic Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Acneic Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Acneic Facial")
                                                    }}
                                                    color="info"
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Acneic Facial - $95</p>
                                                <p className="text-left font-weight-normal ml-2">Whether your skin is environmentally stressed or experiencing regular breakouts, we will begin that healing process to correct acne and redness.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Acneic Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Acneic Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons}
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                        {/* Maintenance + Balancing Facial */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Maintenance + Balancing Facial"}
                                                    onChange={() => {
                                                        handleServiceSelection("Maintenance + Balancing Facial")
                                                    }}
                                                    color="info"
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                
                                                <p className="text-left font-weight-bold ml-2">Maintenance + Balancing Facial - $95</p>
                                                <p className="text-left font-weight-normal ml-2">Maintain that healthy skin barrier and glow with this power punched peptide, vitamin C and plant stem cell containing facial.</p>
                                                {/* Toggle addon display for selected service */}
                                                {service === "Maintenance + Balancing Facial" && 
                                                    <Button 
                                                    className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                                    onClick={() => toggleAddons()}
                                                    >addons -
                                                    </Button>   
                                                }
                                                {displayAddons && service === "Maintenance + Balancing Facial" &&
                                                    <DisplayAddons 
                                                        facialType={facialType} 
                                                        service={service} 
                                                        setAddons={setAddons}
                                                        addons={addons} 
                                                    />
                                                }
                                            </Label>
                                        </FormGroup>
                                    </TabPane>

                                    {/* Express Facials */}
                                    <TabPane tabId="Express">
                                        {/* Dermaplane */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Dermaplane"}
                                                    onChange={() => handleServiceSelection("Dermaplane")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <div>
                                                    <p className="text-left font-weight-bold ml-2">Dermaplane - $55 (optional oil plane with CBD oil for less trauma - $65)</p>
                                                    <p className="text-left font-weight-normal ml-2">Dermaplane can exfoliate skin by getting rid of the dry surface layer of the epidermis and vellus hair</p>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                        {/* Microdermabrasion */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Microdermabrasion"}
                                                    onChange={() => handleServiceSelection("Microdermabrasion")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <div>
                                                    <p className="text-left font-weight-bold ml-2">Microdermabrasion - $65</p>
                                                    <p className="text-left font-weight-normal ml-2">Diamondhead crystal tips gently sand the skin, removing the thicker, uneven outer layer.</p>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                        {/* LED Light Session */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "LED Light Session"}
                                                    onChange={() => handleServiceSelection("LED Light Session")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <div>
                                                    <p className="text-left font-weight-bold ml-2">LED Light Session - $55</p>
                                                    <p className="text-left font-weight-normal ml-2">Add Red, Blue or Amber light for ant-aging/inflammation, acne management and/or collagen and elastin building.</p>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                        {/* High Frequency */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "High Frequency"}
                                                    onChange={() => handleServiceSelection("High Frequency")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <div>
                                                    <p className="text-left font-weight-bold ml-2">High Frequency - $55</p>
                                                    <p className="text-left font-weight-normal ml-2">Treats and prevents stubborn acne and encourages inner skin health - enriched oxygen molecules are produced that create anti-bacterial action and a "natural" thermal effect.</p>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                        {/* Carboxy Mask */}
                                        <FormGroup check className=" d-flex justify-content-start mb-5">
                                            <Label check>
                                                <Input 
                                                    type="checkbox"
                                                    checked={service === "Carboxy Mask"}
                                                    onChange={() => handleServiceSelection("Carboxy Mask")}
                                                ></Input>
                                                <span className="form-check-sign"></span>
                                                <div>
                                                    <p className="text-left font-weight-bold ml-2">Carboxy Mask - $65</p>
                                                    <p className="text-left font-weight-normal ml-2">The BOHR effect, CO2 dehydration increases bloodflow, providing nutrients and oxygen to deeper layers.</p>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                    </TabPane>
                                </TabContent>      
                            </Col>
                        </Row>
                    </Container>
                </TabPane>

                {/* Brows with options */}
                <TabPane tabId="Brows">
                    <Container className=" section-basic" id="basic-elements">
                        <Row className="justify-content-center">
                            <Col 
                                className= {`mb-4 ${isModal ? "modal-col" : ""}`} 
                                lg="11" sm="12"
                            >
                                <p className="category">Options</p>
                                {/* Brow Lamination */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Brow Lamination"}
                                            onChange={() => handleServiceSelection("Brow Lamination")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Brow Lamination - $60</p>
                                            <p className="text-left font-weight-normal ml-2">Lashes are carefully brushed to appear fuller and then laminated for that kept brow appearance.</p>
                                        </div>
                                        {/* Toggle addon display for selected service */}
                                        {service === "Brow Lamination" && 
                                            <Button 
                                            className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                            onClick={() => toggleAddons()}
                                            color="info"
                                            >addons
                                            </Button>   
                                        }
                                        {displayAddons && service === "Brow Lamination" &&
                                            <DisplayAddons 
                                                iconPills={iconPills}
                                                service={service} 
                                                setAddons={setAddons}
                                                addons={addons} 
                                            />
                                        }
                                    </Label>
                                </FormGroup>
                                {/* Brow Tint */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Brow Tint"}
                                            onChange={() => handleServiceSelection("Brow Tint")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Brow Tint - $25</p>
                                            <p className="text-left font-weight-normal ml-2">No more needing to pencil in you brow.  Henna color gives you that freedom for several weeks.</p>
                                        </div>
                                        {/* Toggle addon display for selected service */}
                                        {service === "Brow Tint" && 
                                            <Button 
                                            className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                            onClick={() => toggleAddons()}
                                            color="info"
                                            >addons
                                            </Button>   
                                        }
                                        {displayAddons && service === "Brow Tint" &&
                                            <DisplayAddons 
                                                iconPills={iconPills}
                                                service={service} 
                                                setAddons={setAddons}
                                                addons={addons} 
                                            />
                                        }
                                    </Label>
                                </FormGroup>
                                {/* Brow Lamination and Tint */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Brow Lamination and Tint"}
                                            onChange={() => handleServiceSelection("Brow Lamination and Tint")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Brow Lamination and Tint - $75</p>
                                            <p className="text-left font-weight-normal ml-2">This is the perfect pair. Get the complete package to add henna and lamination for that brow of perfection!</p>
                                        </div>
                                        {/* Toggle addon display for selected service */}
                                        {service === "Brow Lamination and Tint" && 
                                            <Button 
                                            className="d-flex justify-content-start font-weight-normal ml-2 btn-inverse"
                                            onClick={() => toggleAddons()}
                                            color="info"
                                            >addons
                                            </Button>   
                                        }
                                        {displayAddons && service === "Brow Lamination and Tint" &&
                                            <DisplayAddons 
                                                iconPills={iconPills}
                                                service={service} 
                                                setAddons={setAddons}
                                                addons={addons}
                                                className="d-flex justify-content-center"
                                            />
                                        }
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </TabPane>

                <TabPane tabId="Full-Body Waxing">
                    <Container className=" section-basic" id="basic-elements">
                        <Row className="justify-content-center">
                            <Col 
                                className= {`mb-4 ${isModal ? "modal-col" : ""}`} 
                                lg="11" sm="12"
                            >
                                <p className="category">Options</p>
                                {/* Full Back */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Full Back"}
                                            onChange={() => handleServiceSelection("Full Back")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Full Back - $70</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Partial Back */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Partial Back"}
                                            onChange={() => handleServiceSelection("Partial Back")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Partial Back - $35</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Full Chest */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Full Chest"}
                                            onChange={() => handleServiceSelection("Full Chest")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Full Chest - $40</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Chest Strip */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Chest Strip"}
                                            onChange={() => handleServiceSelection("Chest Strip")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Chest Strip - $20</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Full Arm */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Full Arm"}
                                            onChange={() => handleServiceSelection("Full Arm")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Full Arm - $50</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Underarms */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Underarms"}
                                            onChange={() => handleServiceSelection("Underarms")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Underarms - $25</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Full "BRAZILLY" */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === 'Full "BRAZILLY"'}
                                            onChange={() => handleServiceSelection('Full "BRAZILLY"')}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Full "BRAZILLY" - $60</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Total "BRAZILLY and BOOTIE STRIP" */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === 'Total "BRAZILLY and BOOTIE STRIP"'}
                                            onChange={() => handleServiceSelection('Total "BRAZILLY and BOOTIE STRIP"')}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Total "BRAZILLY and BOOTIE STRIP" - $75</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Bootie Strip */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Bootie Strip"}
                                            onChange={() => handleServiceSelection("Bootie Strip")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Bootie Strip - $25</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Just Bikini */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Just Bikini"}
                                            onChange={() => handleServiceSelection("Just Bikini")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Just Bikini - $35</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Stomach Strip */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Stomach Strip"}
                                            onChange={() => handleServiceSelection("Stomach Strip")}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <div>
                                            <p className="text-left font-weight-bold ml-2">Stomach Strip - $15</p>
                                        </div>
                                    </Label>
                                </FormGroup>
                                {/* Facial Strips */}
                                <FormGroup check className=" d-flex justify-content-start">
                                    <Label check>
                                        <Input 
                                            type="checkbox"
                                            checked={service === "Facial Strips"}
                                            onChange={() => {
                                                handleServiceSelection("Facial Strips")
                                                toggleAddons()
                                            }}
                                        ></Input>
                                        <span className="form-check-sign"></span>
                                        <p className="text-left font-weight-bold ml-2">Facial Strips - $20 per area</p>
                                        {iconPills === "Full-Body Waxing" && displayAddons &&
                                            <DisplayAddons 
                                                iconPills={iconPills}
                                                service={service} 
                                                setAddons={setAddons}
                                                facialWaxingOptions={facialWaxingOptions}
                                                setFacialWaxingOptions={setFacialWaxingOptions}
                                                className="d-flex justify-content-center"
                                            />
                                        }
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </TabPane>
            </TabContent>
        </CardBody>
    </>
    )
}

export default AppointmentType