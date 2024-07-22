import { Button, Form } from 'react-bootstrap';
import { fbconfig } from "../firebase/firebase.mjs";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import "../login/login.css"

import { useNavigate } from 'react-router-dom';
import { set } from 'firebase/database';


function Signup() {

  let app = fbconfig;
  const db = getFirestore(app);
  const navigate = useNavigate();


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCpass] = useState('');

  const [loader, setLoader] = useState(false);



  // validation

  function validate(event) {
    event.preventDefault();
    setLoader(true)


   if (firstName == "" || firstName.length <3) {
      alert("firstName must  contain 3 characters")
      setLoader(false)
   }
   else if (lastName == "" || lastName.length <3) {
      alert("lastName must  contain 3 characters")
      setLoader(false)
   }
   else if (email == "") {
      alert("email must not be empty")
      setLoader(false)
   }
   else if (!email.includes("@")) {
      alert("Please enter the valid email")
      setLoader(false)
   }
   else if (address == "" ) {
      alert("address must not be empty")
      setLoader(false)
   }
   else if (number == "" ) {
      alert("Phone must not be empty")
      setLoader(false)
   }
   else if (pass == "" ) {
      alert("password field must not be empty")
      setLoader(false)
   }
   else if (pass.length <8 ) {
      alert("Your password must be 8 characters long")
      setLoader(false)
   }
   else if (pass != cPass) {
      alert("Your password and confirm password must be same")
      setLoader(false)
   }
 
   else {
      signUp(event)
   }

  }


  function signUp(event) {
    // event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;

        // console.log("this is return", user.uid)
        try {
          await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            address,
            number,
            uid: user.uid
          });
          setLoader(false)
          navigate("/")
          setFirstName("");
          setLastName("");
          setEmail("");
          setPass("");
          setCpass("");


        } catch (e) {
          console.error("Error adding document: ", e);
          setLoader(false)

        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("error", errorMessage)
        setLoader(false)

        // ..
      });


  }








  return (
    <>
    <div className='p-2 mb-3' >
      <div  className="container p-2 border border-success  mt-4" id='signup'>
        <div className="container text-center"></div>
        <Form className='p-2'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your First Name</Form.Label>
            <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="FirstName" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your Last Name</Form.Label>
            <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="LastName" />
          </Form.Group>






          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Address</Form.Label>
            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="email" placeholder="address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Phone Number</Form.Label>
            <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} type="email" placeholder="021-xxx" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control value={cPass} onChange={(e) => setCpass(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <div className="container d-flex">
            <Button onClick={validate} variant="dark" type="submit">
              Submit
            </Button>

            <Button className='ms-2' variant="dark" type="submit">
              Back To Login
            </Button>
            {loader && (
              <div className=" ms-2" >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        </Form>

      </div>
      </div>
    </>
  );
}

export default Signup;
