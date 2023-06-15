import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// styles for this kit
import "./assets/css/bootstrap.min.css"
import "./assets/scss/now-ui-kit.scss"

// pages for this kit
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AppointmentPage from "./pages/AppointmentPage";

// context provider
import UserContext from "./user auth/utils/userContext";
import AdminPage from "./pages/AdminPage";
import authenticateAdmin from "./user auth/utils/authenticateAdmin";

const App = () => {
    const  [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);


    // Re-authenticate on page refresh
    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in.
            const isAdmin = authenticateAdmin(user);
            setIsAdmin(isAdmin);
            setUser(user);
          } else {
            // User is signed out.
            setIsAdmin(false);
            setUser(null);
          }
        });
    
        // Clean up the observer on component unmount.
        return () => unsubscribe();
      }, []);

      const handleSignOut = async () => {
        const auth = getAuth();
        try {
          console.log('signing out')
          await signOut(auth);
          setUser(null); // Reset the user state to null after signing out.
          console.log('signed out', user, isAdmin)
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      };

    return (
        <UserContext.Provider value={{ user, setUser, handleSignOut }}>
            <BrowserRouter>
              <Switch>
                  <Route 
                      path="/index" 
                      render={(props) => <Index {...props} />} 
                  />
                  <Route 
                    path="/appointment-page"
                    render={(props) => {
                      // The condition depends on how you manage user authentication and roles
                      if (user) { 
                        return <AppointmentPage {...props} />
                      } else {
                        return <Redirect to="/login-page" />
                      }
                    }}
                  />
                  <Route 
                    path="/admin"
                    render={(props) => {
                      // The condition depends on how you manage user authentication and roles
                      if (isAdmin) { 
                        return <AdminPage {...props} />
                      } else {
                        return <Redirect to="/login-page" />
                      }
                    }}
                  />
                  <Route
                      path="/login-page"
                      render={(props) => {
                        // The condition depends on how you manage user authentication and roles
                        if (user && !isAdmin) { 
                          return <Redirect to="/appointment-page" />;
                        } else if(isAdmin) {
                          return <Redirect to="/admin" />;
                        } else {
                          return <LoginPage {...props} />;
                        }
                      }}
                  />
                  <Route
                      path="/auth/oauth2callback"
                      render={(props) => {
                        // Handle the access code here or display a component to show the access code
                        const searchParams = new URLSearchParams(props.location.search);
                        const code = searchParams.get('code');
                        console.log('Access Code:', code);
                        return <div>Access Code: {code}</div>;
                      }}
                  />
          
                  <Redirect to="/index" />
                  <Redirect from="/" to="/index" />            
              </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App