import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../src/Components/Home/Navbar';
import Copywrite from './Components/Home/Copywrite';
// import Contacts from './Components/Home/Contacts';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Listing from './Components/Listing/Listing';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Profile/Profile';
import EditProperty from './Components/EditProperty/EditProperty';
// import Register from './Components/Register/Register';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <ToastContainer />
          <Routes>
             
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/listing" element={<Listing/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/editproperty" element={<EditProperty/>}/>
          </Routes>
           
          {/* <Contacts/> */}
          <Copywrite/>

        </div>
     </Router>
    </>
  );
}

export default App;
