import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Spinner, Card, Button, Container } from 'react-bootstrap';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fbconfig } from "../firebase/firebase.mjs";





function MyProfile() {


    let app = fbconfig;
    const db = getFirestore(app);

    var array = [];

    const [myProduct, setMyProduct] = useState([])
    const [myProfile, setMyProfile] = useState()
    const [isLoading, setloader] = useState(true)

    useEffect(() => {
        setMyProduct([]);
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log("this is user", uid);

                const q = query(collection(db, "product"), where("user_id", "==", uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    array.push(doc.data());

                });
                setMyProduct(array);

                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("users data:", docSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such user!");
                }



                setMyProfile(docSnap.data());



                setloader(false)



            } else {
                // User is signed out
                console.log("user is out")


                // ...
            }
        });

    }, [])












    return (
        <>
            {isLoading ?

                <div className="container text-center mt-5" >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                :



                <>



                    <div className="container-fluid" id="profile_bg">



                        <div className="d-flex container  mb-4" >
                            <div className="mt-4 mb-4" >
                                <img style={{ width: "180px", height: '150px', borderRadius: "100px" }}
                                    src={!myProfile.avatar_url ?
                                        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
                                        :
                                        myProfile.avatar_url

                                    }
                                    alt="" />

                            </div>
                            <div className="container ms-4 mt-4">
                                <div className=" ">
                                    <div className="container mt-4 ">
                                        <h2>{myProfile.firstName.toUpperCase() + " " + myProfile.lastName.toUpperCase()}</h2>
                                    </div>
                                    <div className="container mt-2">
                                        <h2>{myProfile.email}</h2>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <Container className="d-flex flex-wrap gap-3" id="cards">
                        <div className="container d-flex justify-content-between">
                            <h1><b>My Products</b></h1>
                        </div>


                        {myProduct.map((e, index) => {

                            return (
                                <>
                                    <div className=" container m-0" key={e.id} style={{ width: '19rem' }}>
                                        <Card className='mt-4 box card' style={{ height: '22rem' }}>
                                            <Card.Img variant="top" src={e.thumbnail_image_url} style={{ height: '13rem' }} />
                                            <Card.Body>
                                                <Card.Title><b>{e.productName}</b></Card.Title>
                                                <Card.Text>
                                                    $ {e.price}
                                                </Card.Text>
                                                {/* <Link to="/details" className="btn btn-primary">Details</Link> */}
                                                <Button variant="primary">Details</Button>
                                            </Card.Body>
                                        </Card>

                                    </div>
                                </>)
                        })
                        }
                    </Container>

                </>

            }


        </>
    )
}

export default MyProfile;