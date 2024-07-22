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
        // console.log("user is here")
        setUser(true)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // console.log("user is out")
        navigate("/")


        // ...
      }
    });

  }, [])


  const handleClick = ()=>{
    const auth = getAuth();
    signOut(auth).then (() => {
  // Sign-out successful.
  // console.log("sign out");
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
        </Container>
      </Navbar>
        
        :




    <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand className="navbar-brand" href="#home">BNS Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={()=>{navigate("/myprofile")}}>My Profile</Nav.Link>
            <Nav.Link href="#home" onClick={()=>{navigate("/Home")}}>Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
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