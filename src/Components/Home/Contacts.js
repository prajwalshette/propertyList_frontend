import React from 'react'
import '../CSS/Contacts.css';
import { SocialIcon } from 'react-social-icons';

export default function Contacts() {
  return (
     <>
         
      <div className="landingfirstbox px-4 mt-5">
        <div className="row row-cols-1 row-cols-md-4 g-4 " style={{ "backgroundColor": "#e1e1e1" }}>
          <div className="col">
            <h5>CONTACT INFO</h5>
            <p> Address : HO: 135, Empress Mill Society, Shree Nagar, Nagpur- 441 206. <br />
              Phone Number: 078 - 2785505
            </p>
          </div>
          <div className="col">
            <h5>Github Repo</h5>
            <div className="col"><SocialIcon url="https://github.com/prajwalshette" /></div>
            <a className="twitter-timeline" target="_blank" href="https://github.com/prajwalshette">Real Estate</a>
          </div>
          <div className="col">
            <h5>GET IN TOUCH</h5>
            <p>
              Join our mailing list to stay up to date and get notices about our new releases! <br />
              Email: <a href="mailto:info@realestate.in">info@realestate.in</a>
            </p>
          </div>

          <div className="col">
            <h5>FOLLOW US</h5>
            <div className="row row-cols-2 row-cols-md-4 g-4 mt-0.5">
            <div className="col"><SocialIcon url="https://github.com/prajwalshette" /></div>
              <div className="col"><SocialIcon url="https://instagram.com" /></div>
              <div className="col"><SocialIcon url="https://facebook.com/" /></div>
              <div className="col"><SocialIcon url="https://twitter.com/jaketrent" /></div>
            </div>
          </div>

        </div>
      </div>


     </>
  )
}
