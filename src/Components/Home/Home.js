import React from 'react'
import Propertys from './Propertys'
import Contacts from './Contacts'
import jwt_decode from 'jwt-decode';
// import Profile from '../Profile/Profile';
 


export default function Home() {

  return (
    <>
         {/* <Profile/>  */}
         <Propertys/>
         <Contacts/>
      
    </>
  )
}
