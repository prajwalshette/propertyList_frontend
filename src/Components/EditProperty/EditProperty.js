import React, { useState, useEffect } from "react";
import { isLogin } from "../../utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {baseURL} from "../../utils/constant";



export default function EditProperty() {
  let location = useLocation();
  // console.log("std");
  // console.log(location.state.id);
  let id = location.state.id;

  const [user, setUser] = useState({ name: "", email: "" });

  const [data, setData] = useState({
    propertyType: "",
    location: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
      } else {
        toast.success("Please Login First");
        navigate("/login");
      }
    };
    authenticate();
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);

      if (response.status === 200) {
        const propertyData = response.data;
        setData({
          propertyType: propertyData.propertyType,
          location: propertyData.location,
          price: propertyData.price,
          description: propertyData.description,
        });
        let img = propertyData.image;
        setImage(propertyData.image);
        // console.log("image");
        // console.log(propertyData.image);
      } else {
        console.error("Error fetching property data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newImage) {
      const imageData = new FormData();
      const filename = Date.now() + newImage.name;
      imageData.append("img", filename);
      imageData.append("image", newImage);

      try {
        // "http://localhost:5000/api/upload"
        const imgUpload = await axios.post(
          `${baseURL}/upload`,
          imageData
        );
        // console.log(imgUpload.data);
        data.image = filename;
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const updateResponse = await axios.put(
        `${baseURL}/update/${id}`,
        data
      );

      if (updateResponse.status === 200) {
        toast.success("Property updated successfully");
        navigate("/profile");
      } else {
        // console.error("Error updating property:", updateResponse.status);
        toast.error("Error updating property");
      }
    } catch (error) {
      // console.error("Error updating property:", error);
      toast.error("Error updating property");
    }
  };

  return (
    <>
      <div className="container_Listing">
        <h2 className="fw-bold py-2 m-2 text-center">Edit Property</h2>
        <form onSubmit={handleUpdate}>
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
            <label htmlFor="image">Old Image:</label>
            {image && (
              <img
                src={`${baseURL}/images/${image}`}
                alt="Current Property"
                className="img-fluid"
              />
            )}
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              value={data.image}
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary rmdbut rounded-3 grnbtn shadow"
            onChange={handleUpdate}
          >
            Update Property
          </button>
        </form>
      </div>
    </>
  );
}
