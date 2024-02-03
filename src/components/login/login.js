import './login.css';
import { Button, Form } from 'react-bootstrap';
import { fbconfig } from "../firebase/firebase.mjs";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged ,signOut} from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';







function Login() {

  let app = fbconfig;
  const navigate= useNavigate();


  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is here")
        navigate("/home")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        console.log("user is out")

        // ...
      }
    });

  }, [])





  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');



  function signIn(event) {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/home")
        console.log(user)
        setEmail("")
        setPass("")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }







  return (
    <>
      <div id='loginBg' className="container-fluid w-50 p-2 border border-success  mt-5">
        <div className="container" id='loginbg'>
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
              <a className='mt-3' href="">Forgot Password ?</a>
            </Form.Group>
         
            <div className="">
            <Button onClick={signIn} variant="success" type="submit">
              Login
            </Button>
            <Button onClick={(event)=>{
              event.preventDefault();
              navigate("/signup")
            }
              } className='ms-2' variant="success" type="submit">
              signup
            </Button>
            </div>
          </Form>
        </div>

      </div>
    </>
  );
}

export default Login;
