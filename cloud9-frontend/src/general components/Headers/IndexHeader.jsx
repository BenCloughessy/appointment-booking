/*eslint-disable*/
import TransparentFooter from "../Footers/TransparentFooter"
import React from "react";
import MediaQuery from 'react-responsive';
import { Button } from "reactstrap";
import cloudMountain from "../../assets/img/cloud-mountain.png"

function IndexHeader() {
  /**
 * Create a new ref instance called pageHeader.
 * This is used to create a reference to a DOM element, which can be used to interact with or get the value of the element.
 */
let pageHeader = React.createRef();

/**
 * The event listener updates the transform property of the pageHeader element based on the window's scroll position.
 * If the window width is larger than 991px, the scroll event is used to create a parallax effect.
 */
React.useEffect(() => {
    if (window.innerWidth > 991) {
        /**
         * A function that updates the transform property of the pageHeader element based on the window's scroll position.
         * This creates a parallax effect.
         */
        const updateScroll = () => {
            let windowScrollTop = window.pageYOffset / 3;
            pageHeader.current.style.transform =
                "translate3d(0," + windowScrollTop + "px,0)";
        };

        window.addEventListener("scroll", updateScroll);

        /**
         * A cleanup function that removes the updateScroll event listener from the window scroll event.
         */
        return function cleanup() {
            window.removeEventListener("scroll", updateScroll);
        };
    }
});


  return (
    <>
      <div className="page-header clear-filter d-flex align-items-center justify-content-center" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${cloudMountain})`
          }}
          ref={pageHeader}
        ></div>

      <MediaQuery maxWidth={992}>
        {(matches) =>
          matches && (
            <div 
            className="d-flex flex-column align-items-center"
            style={{backgroundColor: 'transparent'}}
            >
              {/* Add your animation class to the h2 and Button tags */}
              <h2 className="animated" style={{backgroundColor: 'transparent', marginTop: '-200px'}}>Welcome!</h2>
              <Button
                className="animated"
                color="info"
                href="/login-page"
              >
                <p style={{ fontSize: 11, marginTop: '.25rem', marginBottom: '.25rem' }}>Book an Appointment</p>
              </Button>
            </div>
          )
        }
      </MediaQuery>
        <TransparentFooter />
      </div>
    </>
  );
}

export default IndexHeader;
