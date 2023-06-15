import React from "react";

// reactstrap components
import {
  Card,
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
} from "reactstrap";

import profilePhoto from "../assets/img/ArmsCrossedTransparent.png"

function Tabs() {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  return (
    <>
      <div id="tabs">
        <Container>
          <Row>
            <Col  lg="7" xs="12">
              <p className="category text-center">What We Offer:</p>
              <Card>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="blue"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        Lashes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        Customized Facials
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        Brows
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("4");
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
                    activeTab={"pills" + pills}
                  >
                    <TabPane tabId="pills1">
                      <p style={{fontSize: "18px", fontWeight: "450"}}>
                      Step into Cloud Nine Esthetics and experience a transformational lift. Our range of luxurious lash services is designed to enhance your natural beauty. Whether you choose our Lash Lift for a dramatic, root-enhanced appearance or our Lash Tint to lend depth and fullness to your lashes, each service is delivered with meticulous attention to detail by our skilled esthetician, Caity.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p style={{fontSize: "18px", fontWeight: "450"}}>
                      Every face tells a unique story, and at Cloud Nine Esthetics, we're devoted to nurturing your skin's individual journey. Our range of personalized facials targets specific needs—from sensitive, rosacea-prone skin to dry, dehydrated complexions. Our pigment-correcting and anti-aging treatments employ state-of-the-art techniques to reduce visible signs of stress, time, and environmental damage, all while promoting healthy, authentic aging.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p style={{fontSize: "18px", fontWeight: "450"}}>
                      Frame your eyes with our top-tier brow services. Opt for our Brow Lamination to achieve fuller, impeccably groomed brows or our Brow Tint for long-lasting, naturally filled-in brows. For those seeking the ultimate brow transformation, our Brow Lamination and Tint package delivers a flawless brow look that requires zero maintenance.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p style={{fontSize: "18px", fontWeight: "450"}}>
                      Enjoy the confidence that comes with smooth, beautifully waxed skin. Our full-body waxing services encompass a variety of treatments, from the classic 'Brazilly' to back, chest, and arm waxes. Each session is performed with utmost care to ensure a comfortable and satisfying experience, leaving your skin feeling refreshed and invigorated.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="5" className="mt-lg-5 d-flex justify-content-center">
                <img
                  alt="..."
                  className="rounded-circle img-raised"
                  src={profilePhoto}
                  style={{width: "80%", height: "80%", objectFit: "cover", marginTop: "2.5rem"}}
                ></img>
              </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
