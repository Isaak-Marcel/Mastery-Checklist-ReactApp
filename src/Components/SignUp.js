import React, { useEffect, useState } from 'react'
import {createUserWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../Config/firebase'


function SignUp({ toggleSignUp, toogleShowLogin, closeLog}) {

  
    const [newUser,setNewUser] = useState({
        email: '',
        password: ''
    })

    const submitSignUp = (e)=>{
      e.preventDefault()
      
      console.log('Made Account')
        
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then((userCredential) =>{
            // const user = userCredential.user
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
    }, [closeLog])
 
    return (
    <div style={signUpStyles}>
       <div className='sign-div'>
          <h2>Sign Up</h2>
          <form className='signForm'>
            <input style={signFromItems} type='email' placeholder="Email" onChange={(e)=> setNewUser( {...newUser, email: e.target.value} )}/>
            <input style={signFromItems} type='password' placeholder="Password" onChange={(e)=> setNewUser( {...newUser, password: e.target.value})}/>
            <button style={signFromItems} onClick={(e) => submitSignUp(e)}>Sign Up</button>
          </form>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}} className='buttons-under'>
            <button onClick={toogleShowLogin}>Have an account, Login in?</button>
            <button  className='close-button' style={signFromItems} onClick={toggleSignUp}>Close</button>
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


export default SignUp
