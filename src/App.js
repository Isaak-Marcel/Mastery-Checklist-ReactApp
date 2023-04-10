import TaskRectangle from "./Components/TaskRectangle";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login.js";
import Logout from "./Components/Logout";
// import Settings from "./Components/Settings";
import { React, useState } from "react";
import { auth } from "./Config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import Switch from "./Components/Switch";
import PomodoroTimer from "./Components/Timer/PomodoroTimer";



function App() {
  const [showSignUp, setShowSignUp] = useState(false) 
  const [showLogin, setshowLogin] = useState(false) 
  const [user] = useAuthState(auth)
  const [checked,setChecked] =  useState(true)
  
 
  const toggleSignUp = ()=>{
    setShowSignUp(!showSignUp)
    if(showLogin){
      setshowLogin(false)
    }
  }

  const closeLog = ()=>{
    setshowLogin(false)
    setShowSignUp(false)
  }

  const toogleShowLogin = ()=>{
    setshowLogin(!showLogin)
    setShowSignUp(!showSignUp)
  }

  const toogleTimer = ()=>{
    setChecked(!checked)
  }

  
  // let background;


  return (
    <div className="App">
        
        
        {user ? (
          <Logout />
        ) : (
          <button className="LoginButtonTopp log-something"  onClick={toggleSignUp}>Login/SignUp</button>
        )}
        <Switch checked={checked} handleChange={toogleTimer} />
        
        <TaskRectangle> </TaskRectangle>
        
        { checked && < PomodoroTimer/> }
        

        {showSignUp && !user && <SignUp style={{zIndex: '1'}} toggleSignUp={toggleSignUp} closeLog={closeLog} toogleShowLogin={toogleShowLogin} />}
        {showLogin && !user &&  <Login style={{zIndex: '1'}} closeLog={closeLog} toogleShowLogin={toogleShowLogin}/>}
        {/* {user &&  <Settings user={user} background={background}/> }  */}
        
    </div>
    
  );
}





export default App;


