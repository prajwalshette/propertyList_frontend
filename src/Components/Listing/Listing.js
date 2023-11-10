// import React from 'react';
import React, { useState, useEffect} from "react";
import { isLogin} from '../../utils/auth';
import "../CSS/Listing.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {baseURL} from "../../utils/constant";



export default function Listing() {
  const [user, setUser] = useState({ name: "", email: "" });
  

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        // console.log("user");
        // console.log(user);

        setData({ ...data, propertyadder: loggedIn.data.email });
         
      } else {
        toast.success("Please Login First");
        navigate("/login");
      }
    };
    authenticate();
  }, []);

  const [data, setData] = useState({
    propertyType: "",
    location: "",
    price: "",
    description: "",
    propertyadder: user.email,
    image: "",
  }); 

  // console.log(data.propertyadder);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleImageChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.image) {
      const imageData = new FormData();
      const filename = Date.now() + data.image.name;
      imageData.append("img", filename);
      imageData.append("image", data.image);

      try {
        // "http://localhost:5000/api/upload"
        const imgUpload = await axios.post(
          `${baseURL}/upload`,
          //firebase url
          // "https://console.firebase.google.com/project/propertylisting-ace88/storage/propertylisting-ace88.appspot.com/files/images/upload",
          imageData
        );
        // console.log(imgUpload.data);

        data.image = filename;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      // console.log("Hola",data.propertyadder);
      // const url = "http://localhost:5000/api/create";
      const url = `${baseURL}/create`;
      const { data: res } = await axios.post(url, data);
      toast.success("Property Added successful!");
      navigate("/");
      console.log(res.message);
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        // console.log(data.propertyadder);
        toast.error(`Registration failed: ${error.response.data.message} ${data.propertyadder} `);
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="container_Listing">
        <h2 className="fw-bold py-2 m-2 text-center">Add Property Listing</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="propertyType">Property Type:</label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={data.propertyType}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={data.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary rmdbut rounded-3 grnbtn shadow"
            onChange={handleSubmit}
          >
            Submit Listing
          </button>
        </form>
      </div>
    </>
  );
}
