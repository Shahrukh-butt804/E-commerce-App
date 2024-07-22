import './login.css';
import { Button, Form } from 'react-bootstrap';
import { fbconfig } from "../firebase/firebase.mjs";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';








function Login() {

  let app = fbconfig;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("user is here")
        navigate("/home")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // console.log("user is out")

        // ...
      }
    });

  }, [])


  function signIn(event) {
    event.preventDefault();
    setLoader(true)

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/home")
        // console.log(user)
        setEmail("")
        setPass("")
        setLoader(false)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoader(false)

      });

  }

  return (
    <>
      <div id='main' className='d-flex ms-5'>

        <div id='image'>
          <img src="https://img.freepik.com/premium-vector/e-commerce-design-white-background-vector-illustration_24908-48554.jpg"
          width={"100%"}
          alt="" />
        </div>


      <div id='loginDiv' className="container p-2 d-flex justify-content-center align-items-center mb-5">
        
        <div className="container border"  id='loginChildDiv'>
          <Form className='p-2' id='loginbg'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
              <a className='mt-4' href="">Forgot Password ?</a>
            </Form.Group>

            <div className="d-flex">
              <Button onClick={signIn} variant="dark" type="submit">
                Login
              </Button>
              <Button onClick={(event) => {
                event.preventDefault();
                navigate("/signup")
              }
              } className='ms-2' variant="dark" type="submit">
                signup
              </Button>
              {loader &&
                <div className=" ms-2" >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
            </div>
          </Form>
        </div>

      </div>
      </div>

    </>
  );
}

export default Login;
