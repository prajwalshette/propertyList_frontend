import { useState, useEffect } from "react";
import img from "../Images/house1.jpg";
import axios from "axios";
import img1 from "../Images/Home Image.png";
import img2 from "../Images/Home Image 2.png";
import { getCookie } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {baseURL} from "../../utils/constant";


export default function Propertys() {


  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // "http://localhost:5000/api/"
      const response = await fetch(`${baseURL}/`);
      const result = await response.json();
      setData(result);


      
      // // Fetch image URLs from Firebase Storage
      // const imageData = await Promise.all(
      //   result.map(async (dt) => {
      //     const imageResponse = await fetch(`${baseURL}/get-image-url/${dt.image}`);
      //     const imageUrlData = await imageResponse.json();
      //     return { ...dt, imageUrl: imageUrlData.imageUrl };
      //   })
      // );

      // setData(imageData);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <img
                  src={img2}
                  alt="Responsive Image"
                  className="img-fluid m-5 rounded"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div className="m-5">
                  <h3>Home Real Estate</h3>
                  <p>
                    Welcome to Home Real Estate - Your Gateway to Dream Homes.
                    <br />
                    Find Your Ideal Home with Home Real Estate - Where Dreams
                    Become Reality.
                  </p>


                  {getCookie("token") ?(
                    <>
                      <button className="mx-auto my-2 " style={{ backgroundColor: "#800080" }} onClick={() => navigate("/listing")} >Explore </button>
                    </>
                  ) : (
                    <>
                      <button className="mx-auto my-2 " style={{ backgroundColor: "#800080" }} onClick={() => navigate("/login")} >Login </button>
                    </>
                  )}



                </div>
                <img
                  src={img1}
                  alt="Responsive Image"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="container ">
        <h3 className="py-2 m-2 text-center">CHOOSE YOUR FLAVOUR</h3>

        <div className="row">
          {data &&
            data.map((dt, index) => (
              
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-lg ">
                  <img
                    className="card-img-top"
                    style={{ width: "100%", height: "250px" }}
                    src={`${baseURL}/images/${dt.image}`}

                    //firebase url
                    // src={`https://storage.googleapis.com/propertylisting-ace88.appspot.com/images/${dt.image}`}
                    // src={dt.imageUrl}

                    alt="Property"
                  />
                  <div className="card-body bg-light">
                    <p className="card-text">453 sq.ft. (42.09 sq.m.)<br/>Super Built-up Area | 1 BHK</p>
                    <h4 className="card-text ">
                      {dt.location} <span>|</span>{" "}
                      <span className="fw-bold">{dt.propertyType}</span>
                    </h4>
                    <p className="card-text">
                      <span>&#8377;</span>{" "}
                      <span className="fw-bold">{dt.price} L</span>
                    </p>
                    <p className="card-text">{dt.description}</p>
                     
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
