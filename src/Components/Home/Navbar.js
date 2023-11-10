import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../Images/logo_2.png";
import "../CSS/Navbar.css";
import { getCookie } from "../../utils/auth";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // useEffect(() => {
  //     window.location.reload();
  // }, [localStorage.getItem("token")]);

  const navigate = useNavigate();

  <ToastContainer />;

  return (
    <>
      <nav className="Navbar navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand">
            <img src={img1} alt="" />
          </Link>

          <a className="navbar-brand fw-bold fs-3" style={{ letterSpacing: 2 }} onClick={() => navigate("/")}> <span
            style={{ color: "#4B0082" }}>Real</span>Estate</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  About
                </Link>
              </li>


              {/* <li className="nav-item">
                <Link className="nav-link" to="/editproperty">
                  Edit Property
                </Link>
              </li> */}

              {console.log("Navbar", getCookie("token"))}
              {/* {window.location.reload()} */}
              {getCookie("token") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/listing">
                      Add Property
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                     Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
