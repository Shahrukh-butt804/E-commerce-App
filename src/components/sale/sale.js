import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from 'react-bootstrap';
import { fbconfig } from "../firebase/firebase.mjs";
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";




function Sale() {

  let app = fbconfig;
  const db = getFirestore(app);
  const storage = getStorage();

  const navigate=useNavigate();


  const [productName, setProductName] = useState()
  const [price, setPrice] = useState()
  const [thumbnail_image, setPic] = useState()
  const [thumbnail_image_url, setthumbnail_image_url] = useState()
  const [category, setCategory] = useState()
  const [brand, setBrand] = useState()
  const [discription, setDiscription] = useState()
  const [loader, setloader] = useState(false)

  let validation = (event) => {
    event.preventDefault();

    if (productName) {
      if (price) {
          if (discription) {
            if (thumbnail_image) {
              submit()
            } else {
              alert("Please Enter The picture of Your product")

            }
          } else {
            alert("Please Enter The description")

          }
      
      } else {
        alert("Please Enter The Price of product")

      }

    } else {
      alert("Please Enter The product Name")
    }
  }


  function submit() {

    // event.preventDefault();
    setloader(true)


    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user is here")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("this is user", uid);



        // setIsLoading(true);
        const productData = {
          user_id: uid,
          productName,
          price,
          discription,
          category,
          brand,
          thumbnail_image_url: "",
          // more_images_urls: [],
          created_at: new Date(),
        };

        try {
          const productRef = await addDoc(
            collection(db, "product"),
            productData
          );


          console.log(thumbnail_image, "file");
          const thumbnailRef = await ref(storage, `product_images/${productRef.id}/thumbnail_image`);
          const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnail_image);
          const thumbnailImageUrl = await getDownloadURL(thumbnailSnapshot.ref);
          productData.thumbnail_image_url = thumbnailImageUrl;
          console.log(thumbnailImageUrl, "url");
          setthumbnail_image_url(thumbnailImageUrl);


          await updateDoc(doc(db, "product", productRef.id), {
            thumbnail_image_url: productData.thumbnail_image_url
          });
          setloader(false)
          navigate("/")


          // const thumbnailRef = await ref(storage, `test/thumbnail_image`);
          // const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnail_image);



          // const thumbnailRef = await ref(
          //   storage,
          //   `${productRef.id}/thumbnail_image`
          //   );
          //   const thumbnailSnapshot = await uploadBytes(
          //     thumbnailRef,
          //     thumbnail_image
          //     );
          //     const thumbnailImageUrl = await getDownloadURL(thumbnailSnapshot.ref);
          //     // productData.thumbnail_image_url = thumbnailImageUrl;
          //     console.log(thumbnailImageUrl, "url");

          // await updateDoc(doc(db, "products", productRef.id), {
          //   thumbnail_image_url: productData.thumbnail_image_url
          // });

          // setIsProductDrawer(false);
          // setIsLoading(false);
          // toast.success("Product Added Sucessfully");
          // formik.resetForm();
          // document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
          //   fileInput.value = ""; // Resets the file input fields
          // });
        } catch (error) {
          // setIsProductDrawer(false);
          // setIsLoading(false);
          // toast.error("Some thing went wrong, team is fixing this");
          setloader(false)
          console.log(error, "error");
        }
        ;
        // ...
      } else {
        // User is signed out
        console.log("user is out")


        // ...
      }
    });
    setProductName("")
    setPrice("")
    setPic("")
    setthumbnail_image_url("")
    setCategory("")
    setBrand("")
    setDiscription("")

  }










  return (
    <>
      <div className="container w-75 mt-2 mb-4 p-4 border border-success">

        <div className="container d-flex justify-content-between">
          <h1 className="text center m-4">Enter The Details of Your Product</h1>
        </div>










        <Form >



          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Product Name</Form.Label>
            <Form.Control value={productName} onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Iphone11" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter The Price Of Your Product</Form.Label>
            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="$" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter The Category Of Your Product</Form.Label>
            <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="SmartPhone" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter The Brand Name Of Your Product</Form.Label>
            <Form.Control value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Apple" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Describe Your Product Here</Form.Label>
            <Form.Control value={discription} onChange={(e) => setDiscription(e.target.value)} as="textarea" rows={3} />
          </Form.Group>












          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload Picture Of Your Product</Form.Label>
            <Form.Control onChange={(e) => setPic(e.target.files[0])} type="file" multiple />
          </Form.Group>





          <div className="container d-flex">
            <Button onClick={validation} variant="primary" type="submit">
              Submit
            </Button>
            {loader && (
              <div className="container mt-1" >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        </Form>
      </div>
    </>
  )
}

export default Sale;