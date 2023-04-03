import React from 'react'
import Timer from './Timer'
import TimerSettings from './TimerSettings'
import { useState } from 'react'
import SettingContext from '../SettingsContext'


function PomodoroTimer() {
  const [showSettings, setShowSettings] = useState(false)
  const [workMinutes, setWorkMinutes] = useState(45)
  const [breakMinutes, setBreakMinutes] = useState(15)
  return (
    

    <div  className='pomodoro-cont' >
        
      
      <SettingContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }} >
        { showSettings ? <TimerSettings/> : <Timer/> }
      </ SettingContext.Provider >
      
      
      
    </div>
  )
}

export default PomodoroTimer