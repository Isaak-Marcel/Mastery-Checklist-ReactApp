import TaskRectangle from "./Components/TaskRectangle";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login.js";
import Logout from "./Components/Logout";
import Settings from "./Components/Settings";
import { React, useState } from "react";
import { auth } from "./Config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth'



function App() {
  const [showSignUp, setShowSignUp] = useState(false) 
  const [showLogin, setshowLogin] = useState(false) 
  const [user] = useAuthState(auth)
  console.log(user)
  
  const toggleSignUp = ()=>{
    setShowSignUp(!showSignUp)
  }

  const closeLog = ()=>{
    setshowLogin(false)
    setShowSignUp(false)
  }

  const toogleShowLogin = ()=>{
    setshowLogin(!showLogin)
    setShowSignUp(!showSignUp)
  }
  
  let background;


  return (
    <div className="App">
        
        
        {user ? (
          <Logout />
        ) : (
          <button className="LoginButtonTopp" onClick={toggleSignUp}>Login/SignUp</button>
        )}
        <TaskRectangle/>
        <h1>{user?.email} </h1>

        {showSignUp && !user && <SignUp toggleSignUp={toggleSignUp} toogleShowLogin={toogleShowLogin} />}
        {showLogin && !user &&  <Login closeLog={closeLog} toogleShowLogin={toogleShowLogin}/>}
        {user &&  <Settings user={user} background={background}/> } 
    </div>
    
  );
}





export default App;


