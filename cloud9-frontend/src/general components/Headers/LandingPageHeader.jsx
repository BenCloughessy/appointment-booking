import React from "react";
import waveBG from "../../assets/img/wave-bg.png"

function LandingPageHeader() {

  /**
 * This listener applies a parallax effect to the pageHeader element, but only if the window's width is greater than 991px.
 */
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${waveBG})`
          }}
          ref={pageHeader}
        ></div>
      </div>
    </>
  );
}

export default LandingPageHeader;
