import { useState } from "react";
import signup from "../Images/signup.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {baseURL} from "../../utils/constant";


export default function Register() {


    const [data, setData] = useState({
		fname: "",
		email: "",
		password: "",
	});
    
    const [error, setError] = useState("");
	const navigate = useNavigate();
      
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleClick = async (e) => {
		e.preventDefault();
		try {
			// const url = "http://localhost:5000/api/signup";
            const url = `${baseURL}/signup`;
			const { data: res } = await axios.post(url, data);
			navigate("/login");
            toast.success("Registration successful!");
			// console.log(res.message);
		} catch (error) {
			if (error.response) {
				setError(error.response.data.message);
                toast.error(`Registration failed: ${error.response.data.message}`);
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
                            <img className="img-fluid" src={signup} alt="" />

                        </div>
                        <div className="col-sm-6  d-flex flex-column justify-content-center ">

                            <div className="justify-content-center align-items-center">
                                <h2 className="fw-bold py-2 m-2 text-center">Create Account</h2>
                                <form role="form">
                                <div className="form-group m-3">
                                    <input 
                                        type="text" name="fname"
                                        className="form-control input-lg" 
                                        placeholder=" Name " 
                                        onChange={handleChange}
							            value={data.fname} 
                                        required
                                        />
                                </div>

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
                                    <button className="btn btn-primary rmdbut rounded-2 grnbtn shadow" onClick={handleClick} > SIGN UP </button>
                                </div>

                                {error && ( <div className="text-center text-danger"> <p>{error}</p> </div> )}

                                <div className="text-center">
                                    <p>Already User ? <a className="blulink" onClick={() => navigate("/login")} >Sign In</a>  </p>
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
