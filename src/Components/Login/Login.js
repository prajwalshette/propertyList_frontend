import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import login from '../Images/login.png'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setAuthentication} from "../../utils/auth";
import {baseURL} from "../../utils/constant";


export default function Login() {

    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleClick = async (e) => {
		e.preventDefault();
		try {
            // const url = "http://localhost:5000/api/login";
			const url = `${baseURL}/login`;
			const { data: res } = await axios.post(url, data);
            // console.log(res.data);
			localStorage.setItem("token", res.token);
            setAuthentication(res.token);
            toast.success("Login successful!");
			navigate("/");
            window.location.reload();
		} catch (error) {
			if (error.response) {
				setError(error.response.data.message);
                toast.error("Login failed: " + error.response.data.message);
			}else {
                setError("An unexpected error occurred.");
                toast.error("An unexpected error occurred.");
              }
		}
	};


  return (
     <>
    
            <div className="container">

                <div className="row  py-5 m-2 justify-content-md-center ">
                    <div className="col-sm-8">
                        <div className="row bxshdow rounded-3">
                            <div className="col-sm-6 p-5">
                                <img className="img-fluid" src={login} alt="" />

                            </div>
                            <div className="col-sm-6  d-flex flex-column justify-content-center ">

                                <div className="justify-content-center align-items-center">
                                    <h2 className="fw-bold py-2 m-2 text-center">Login </h2>
                                    <form role="form">
                                        <div className="form-group m-3">
                                            <input 
                                                type="email" 
                                                name="email"
                                                className="form-control input-lg" 
                                                placeholder="email"
                                                onChange={handleChange}
                                                value={data.email}
                                                required

                                                />
                                        </div>

                                        <div className="form-group m-3">
                                            <input 
                                                type="password" 
                                                name="password" 
                                                id="password"
                                                className="form-control input-lg" 
                                                placeholder="Password" 
                                                onChange={handleChange}
                                                value={data.password}
                                                required   
                                                />
                                        </div>

                                        <div className="d-flex justify-content-center m-3">
                                            <button type="button" className="btn btn-primary rmdbut rounded-3 grnbtn shadow"  onClick={handleClick}> Login </button>
                                        </div>

                                        <div className="text-center">
                                            <p> <a className="blulink">Forget Password</a></p>
                                        </div>

                                        <div className="text-center">
                                            <p>New User ? <a className="blulink" onClick={() => navigate("/register")}>Sign Up</a></p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>


            </div>

         
     </>
  )
}
