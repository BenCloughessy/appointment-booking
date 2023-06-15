/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer footer-transparent">
      <Container className="copyright">
          <div>
          Built by{" "}
          <a href="https://www.linkedin.com/in/benjamincloughessy" target="_blank"> Benjamin Cloughessy </a>
          {" "}
          </div>
          
          <div>
          <a href="/admin"> Admin </a>
          </div> 
      </Container>
    </footer>
  );
}

export default TransparentFooter;
