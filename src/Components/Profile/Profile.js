import { useEffect, useState } from "react";
import { isLogin, logOut } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import {baseURL} from "../../utils/constant";


export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        // console.log("user");
        // console.log(user);
      } else {
        toast.success("Please Login First");
        navigate("/login");
      }
    };
    authenticate();
  }, []);

  const handleLogout = () => {
    logOut();
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/login");
    window.location.reload();
    toast.success("Logout Successfully");
  };

  // ==================================
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const email = user.email;
      const response = await fetch(
        `${baseURL}/properties/${email}`
      );

      // console.log("api ", `${baseURL}/properties/${email}`);
      // console.log("response");
      // console.log(response.data);

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        // console.error("Error fetching data:", response.status);
      }
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePropertyDelete = async (propertyId) => {
    try {
      // console.log("Deleting property with ID:", propertyId);

      const response = await axios.delete(
        `${baseURL}/delete/${propertyId}`
      );

      if (response.status === 204) {
        // console.log("Property deleted successfully");
        toast.success("Property deleted successfully");
        window.location.reload();
        // fetchData();
      } else {
        // console.error("Error deleting property. Server response:", response);
        toast.error("Error deleting property");
      }
    } catch (error) {
      // console.error("Error deleting property:", error);
      toast.error("Error deleting property");
    }
  };

  const handlePropertyUpdate = (propertyId) => {
    // navigate(`/editproperty/${propertyId}`);
    navigate(`/editproperty`, { state: { id: propertyId } });
  };


  

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <p className="fw-bold py-1 m-1 text-center">Profile</p>
                <p className="card-title">Hi {user.fname}, Welcome </p>
                <p className="card-subtitle mb-2 text-muted">{user.email}</p>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}

      <hr />

      <div className="container">
        <h2 className="fw-bold py-2 m-2 text-center">Your Listing</h2>

        <div className="row">
          {data &&
            data.map((dt, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-lg">
                  <img
                    className="card-img-top"
                    style={{ width: "100%", height: "250px" }}
                    // src={`${baseURL}/images/${dt.image}`}
                    src={`${baseURL}/images/${dt.image}`}
                    alt="Property"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{dt.propertyType}</h5>
                    <p className="card-text">{dt.price}</p>
                    <p className="card-text">{dt.location}</p>
                    <p className="card-text">{dt.description}</p>
                    <div className="icons">
                      <BiEdit
                        className="icon"
                        onClick={() => handlePropertyUpdate(dt._id)}
                      />
                      {/* <BiEdit className="icon" onClick={handlePropertyUpdate} />  */}

                      <AiFillDelete
                        className="icon"
                        onClick={() => handlePropertyDelete(dt._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
