import React from 'react'
import { signOut } from "firebase/auth";
import {auth} from '../Config/firebase';



function Logout({onLogout }) {

    const handleLogout = ()=>{
        signOut(auth).then(() => {
            onLogout();
          }).catch((error) => {
            // An error happened.
          });
    }
    
  return (
    <div>
        <button className='LoginButtonTopp log-something' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout