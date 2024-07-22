import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Card, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fbconfig } from "../firebase/firebase.mjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Home() {

    let app = fbconfig;
    const db = getFirestore(app);

    const [myProduct, setMyProduct] = useState([])
    const [isLoading, setloader] = useState(true)
    const navigate = useNavigate();


    useEffect(() => {
        
        let array = [];
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // console.log("this is user", uid);



                const querySnapshot = await getDocs(collection(db, "product"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots

                    // console.log(doc.id, "doc id", doc.data());

                    // doc.data().push(doc.id)
                    let obj = doc.data()
                    obj.product_id = doc.id
                    array.push(obj);
                    // console.log("this is array with id", array);

                });
                setMyProduct(array);
                setloader(false)
                array=[]
                // console.log("this is array",array)
                // ...
            } else {
                // User is signed out
                // console.log("user is out")
                navigate("/")


                // ...
            }
        });

    }, [])




    let searching =  (searchItem) => {
        let array=[]
        setTimeout(async()=>{
            const q = query(collection(db, "product"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());

                if (doc.data().productName.toLowerCase().includes(searchItem)) {
                // console.log(doc.id, " => ", doc.data().productName);
                let obj = doc.data()
                obj.product_id = doc.id
                array.push(obj);
                setMyProduct(array)
    
                }
            });
        },1000)
    }



    return (

        <>
            <div className="container-fluid border border-primary" id="homepic">
                <div className="container text-center mt-4 mb-4">
                    <h1 className="mt-4"><b>Search Your Product Now</b></h1>
                    <div className="container w-75 d-flex  align-items-center fs-3">
                        <Form.Control className="border border-success p-2" type="text" placeholder={"product"}
                        onChange={(e)=>{searching(e.target.value)}}
                        />
                        <span
                        ><FontAwesomeIcon
                                className="ms-2" icon={faSearch} /></span>
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
                                        <div className=" container m-0 card_container p-2 pt-1" key={e.product_id} style={{ width: '19rem' }}>
                                            <Card className='mt-4 box card' style={{ height: '22rem' }}>
                                                <Card.Img variant="top" src={e.thumbnail_image_url} style={{ height: '13rem' }} />
                                                <Card.Body>
                                                <Card.Title><b>{e.productName}</b></Card.Title>
                                                <Card.Text className="fs-5">
                                                    $ {e.price}
                                                </Card.Text>
                                                    <Button variant="primary" onClick={() =>
                                                        navigate(`/details/${e.product_id}`)
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
    );
}
export default Home;
