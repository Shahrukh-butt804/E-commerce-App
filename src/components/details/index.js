import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone,faLocationDot,faComments} from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";


function Details() {

    const [items, setitem] = useState()
    const [isLoading, setloader] = useState(true)

    let{id}=useParams();
    console.log(id)
    useEffect(()=>{
            if(id) getProduct(id)
    },[id])



 const getProduct= async (id) =>{

     // setloader(true);
     fetch("https://dummyjson.com/products")
     .then((result) => result.json())
     .then((data) => {
         console.log(data)
         console.log("im in")
         setitem(data.products);
         console.log(items)
         setloader(false);
        })
    }








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

                    <div className="container d-flex" id="main-div" >

                        {/* <div className="container" id="first">
                        <img className='d-block ' width={1300} height={200}
                            src="https://tpc.googlesyndication.com/simgad/5775987906584165236"
                            alt="" text="First slide" />
                    </div> */}

                        <div className="container w-75 ms-0 mt-3" id="forimages" >

                            <div className="container w-75" id="curosel">
                                <Carousel>
                                    <Carousel.Item interval={500}>
                                        <img className='d-block ' width={750} height={600}
                                            src={items[id-1].images[0]}
                                            alt="" text="First slide" />
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img className='d-block' width={750} height={600}
                                            src={items[id-1].images[1]} alt="" text="Second slide" />
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img className='d-block' width={750} height={600}
                                            src={items[id-1].images[2]} alt="" text="Second slide" />
                                    </Carousel.Item>
                                </Carousel>


                                <div className="container text-center mt-3">
                                    <h2> {items[id-1].title}</h2>
                                </div>

                                <div className="container mt-4 me-4 border border-secondary p-3">
                                    <h2>Details</h2>
                                    <div className="container mt-3 me-3">
                                        <div className="row">
                                            <div className="col">price</div>
                                            <div className="col"><b>$ {items[id-1].price}</b></div>
                                            <div className="col">Category</div>
                                            <div className="col"><b>{items[id-1].category}</b></div>
                                        </div>
                                        <div className="row">
                                            <div className="col">Brand</div>
                                            <div className="col"><b>{items[id-1].brand}</b></div>
                                            <div className="col">Rating</div>
                                            <div className="col"><b>{items[id-1].rating}</b></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container mt-4 me-4 border border-secondary p-3">
                                    <h2 className="me-2">Description</h2>
                                    <p>{items[id-1].description}</p>
                                </div>

                            </div>
                        </div>

                        <div className="container mt-5" id="second">
                            <div className="container mt-5 d-flex">
                                <img src="https://1000logos.net/wp-content/uploads/2020/09/OLX-logo.jpg" alt="" style={{ width: '23%', borderRadius: "20px solid black" }} />
                                <div className="container ms-4">
                                    <b>OLX</b>
                                    <p>Owner</p>
                                    <b>See profile </b>
                                </div>
                            </div>
                            <button className="container btn btn-success mt-4"><FontAwesomeIcon className="me-2" icon={faPhone} /> Show Phone Number</button>
                            <button className="container btn btn-success mt-4"><FontAwesomeIcon className="me-2"  icon={faComments} />Chat</button>
                        <div className="container mt-4">
                            <h3 className="mt-4"><FontAwesomeIcon icon={faLocationDot} /> Location</h3>
                            <h5>LDA City, Lahore</h5>
                        </div>
                        </div>


                    </div>







                </>


            }
        </>

    );

}
export default Details;