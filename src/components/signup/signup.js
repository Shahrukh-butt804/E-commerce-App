import { Button, Form } from 'react-bootstrap';
import { fbconfig } from "../firebase/firebase.mjs";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc,doc } from "firebase/firestore";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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



  function signUp(event) {
    event.preventDefault();
    // console.log(1,firstName)
    // console.log(2,lastName)
    // console.log(3,email)
    // console.log(4,pass)
    // console.log(5,cPass)


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("this is return",user.uid)
        try {
          await setDoc(doc(db, "users",user.uid), {
            firstName,
            lastName,
            email,
            address,
            number,
            uid : user.uid
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    navigate("/")
    setFirstName("");
    setLastName("");
    setEmail("");
    setPass("");
    setCpass("");

  }








  return (
    <>
      <div id='signBg' className="container-fluid w-50 p-2 border border-success  mt-5">
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

          <Button onClick={signUp} variant="success" type="submit">
            signup
          </Button>

          <Button className='ms-2' variant="success" type="submit">
            Login
          </Button>
        </Form>

      </div>
    </>
  );
}

export default Signup;
