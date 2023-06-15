import React from "react";
import { useContext } from "react";

import UserContext from "../user auth/utils/userContext";

// core components
import IndexNavbar from "../general components/Navbars/IndexNavbar";
import IndexHeader from "../general components/Headers/IndexHeader";

// sections for this page
import LoggedInNavbar from "../general components/Navbars/LoggedInNavbar"

function Index() {

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  // Destructure user
  const {user} = useContext(UserContext);
  
  return (
    <>
      {user ? <LoggedInNavbar /> : <IndexNavbar />}

      <div className="wrapper">
        <IndexHeader />
      </div>
      
    </>
  );
}

export default Index;
