import React, { useState ,useEffect} from "react";
import {Container,Navbar, Nav,NavDropdown } from "react-bootstrap";
import { getAuth,signOut,onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';



function Navbarr(){

  const navigate= useNavigate();

  const [isUser,setUser]=useState(false);

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is here")
        setUser(true)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        console.log("user is out")
        navigate("/")


        // ...
      }
    });

  }, [])


  const handleClick = ()=>{
    const auth = getAuth();
    signOut(auth).then (() => {
  // Sign-out successful.
  console.log("sign out");
  setUser(false)
  navigate("/")

}).catch((error) => {
  // An error happened.
  console.error(error);
});

  }

    return(
      // bg-body-tertiary
        <>
        {!isUser ?
        <Navbar collapseOnSelect expand="lg" className=" navbar navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="#home">BNS Store</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
        
        :




    <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">BNS Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={()=>{navigate("/myprofile")}}>MY PROFILE</Nav.Link>
            <Nav.Link href="#home" onClick={()=>{navigate("/Home")}}>HOME</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#contact">CONTACT</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#" onClick={handleClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      }
        
        </>
    )

}

export default Navbarr;