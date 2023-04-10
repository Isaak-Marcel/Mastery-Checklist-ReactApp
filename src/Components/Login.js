import React, { useEffect, useState } from 'react'
import {signInWithEmailAndPassword   } from 'firebase/auth';
import {auth} from '../Config/firebase'

function Login({toogleShowLogin,closeLog }) {
    const [loginUser,setloginUser] = useState({
        email: '',
        password: ''
    })
    

    const submitSignIn = (e)=>{
      e.preventDefault()
        
        signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
        .then((userCredential) =>{

        })
        .catch((error) =>{
            // const errorCode = error.code;
            // const errorMessage = error.message;
        })

    }
    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "Escape") {
            closeLog()
          }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
          window.removeEventListener('keydown', handleKeyDown)
        }
    }, [closeLog,toogleShowLogin])
 
    return (
    <div style={signUpStyles}>
      <div className='sign-div'>
          
          <h2>Login</h2>      
          <form className='signForm'>
            <input style={signFromItems} type='email' placeholder="Email" onChange={(e)=> setloginUser( {...loginUser, email: e.target.value} )}/>
            <input style={signFromItems} type='password' placeholder="Password" onChange={(e)=> setloginUser( {...loginUser, password: e.target.value})}/>
            <button onClick={submitSignIn}>Login</button>
          </form>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}} className='buttons-under'>
            <button onClick={toogleShowLogin}>Don't have an account, Sign Up?</button>
            <button  className='close-button' onClick={closeLog}>Close</button>   
          </div> 
        </div>
    </div>
  ) 
}




const signFromItems = {
    marginBottom: '20px'
} 
const signUpStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}; 

export default Login