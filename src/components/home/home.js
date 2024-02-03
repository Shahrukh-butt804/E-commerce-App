import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Card, Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fbconfig } from "../firebase/firebase.mjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone,faLocationDot,faComments, faSearch} from '@fortawesome/free-solid-svg-icons'




function Home() {

    let app = fbconfig;
    const db = getFirestore(app);

    const [myProduct, setMyProduct] = useState([])
    const [isLoading, setloader] = useState(true)
    const navigate = useNavigate();


    var array = [];
    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                console.log("user is here")
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log("this is user", uid);




                const querySnapshot = await getDocs(collection(db, "product"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    array.push(doc.data());
                });
                setMyProduct(array);
                setloader(false)







                // ...
            } else {
                // User is signed out
                console.log("user is out")
                navigate("/")


                // ...
            }
        });

    }, [])



    return (

        <>
            <div className="container-fluid border border-primary" id="homepic">
            <div className="container text-center mt-4 mb-4">
                <h1 className="mt-4"><b>Search Your Product Now</b></h1>
                <div className="container w-75 d-flex  align-items-center fs-3">
                    <Form.Control className="border border-success p-2" type="text" placeholder={"product"} />
                    <span><FontAwesomeIcon className="ms-2"  icon={faSearch} /></span>
                </div>
                
            </div>
            </div>


            <div className="container mt-4">
                {isLoading ?
                    <div className="container text-center mt-5" >
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    :
                    <>

                        <Container className="d-flex flex-wrap gap-3" id="cards">
                            <div className="container d-flex justify-content-between">
                                <h1><b>All product</b></h1>
                                <button className="btn btn-success" onClick={() => {
                                    navigate("/sale")
                                }}><b>Sale Product</b></button>
                            </div>


                            {myProduct.map((e, index) => {

                                return (
                                    <>
                                        <div className=" container m-0 card_container"  key={e.id} style={{ width: '19rem' }}>
                                            <Card className='mt-4 box card' style={{ height: '22rem' }}>
                                                <Card.Img variant="top" src={e.thumbnail_image_url} style={{ height: '13rem' }} />
                                                <Card.Body>
                                                    <Card.Title>$ {e.price}</Card.Title>
                                                    <Card.Text>
                                                        {e.productName}
                                                    </Card.Text>
                                                    {/* <Link to="/details" className="btn btn-primary">Details</Link> */}
                                                    <Button variant="primary" onClick={() =>
                                                        navigate(`/details/${e.id}`)
                                                    }>Details</Button>
                                                </Card.Body>
                                            </Card>

                                        </div>
                                    </>)
                            })
                            }
                        </Container>


                    </>

                }

            </div>

        </>










        //     <>
        //         {isLoading ?
        //             <div className="container text-center mt-5" >
        //             <Spinner animation="border" role="status">
        //                <span className="visually-hidden">Loading...</span>
        //            </Spinner> 
        //           </div>
        //             :
        //             <>

        //                 <div className="container mt-4">
        //                 <b className="mt-3 fs-2">All Items</b>

        //                 </div>
        //               <Container className="ms-6" id="cards">


        //             {  items.map((e,index) => {

        //                             return (
        //                                 <>
        //                                <div className="container ms-0" id="cardss" key={e.id} style={{ width: '20rem' }}>
        //                                     <Card className='mt-4 box' style={{ height: '22rem' }}>
        //                                         <Card.Img variant="top" src={e.thumbnail} style={{ height: '13rem' }} />
        //                                         <Card.Body>
        //                                             <Card.Title>$ {e.price}</Card.Title>
        //                                             <Card.Text>
        //                                                 {e.title}
        //                                             </Card.Text>
        //                                             {/* <Link to="/details" className="btn btn-primary">Details</Link> */}
        //                                             <Button variant="primary" onClick={()=>
        //                                                 navigate(`/details/${e.id}`)
        //                                             }>Details</Button>
        //                                         </Card.Body>
        //                                     </Card>

        //                                 </div>
        //                                 </>)
        //             })
        //         }
        //         </Container>

        //         <div className="container d-flex" style={{height : "30%"}}>
        //             <div className="container me-4">
        //             <img src={appPic} alt="" style={{height : "70%", width: "125%"}} />
        //             </div>
        //             <div className="container ms-5"><h1 className="mb-3">Try the OLX app</h1>
        //             <p className="fs-5">Buy, sell and find just about anything using the app on your mobile.</p>
        //             </div>
        //             <div className="me-0 ms-2" id="hr"></div>


        //             <div className="container ms-4 ">
        //             <h5><b>GET YOUR APP TODAY</b></h5>
        //             <img  src={p1} alt="" style={{height : "17%"}}/>
        //             <img className="ms-2 me-2"  src={p2} alt="" style={{height : "17%"}} />
        //             <img src={p3} alt="" style={{height : "17%"}}/>
        //             </div>
        //         </div>






        //     </>
        //         }
        // </>
    );
}
export default Home;
