import React from 'react'
import ReactSlider from 'react-slider'
import './Slider.css'
import { useContext } from 'react'
import SettingContext from '../SettingsContext'
import CloseTimerSettings from './CloseTimerSettings'

function TimerSettings() {
  const settingsInfo = useContext(SettingContext)
  return (
    <div className='timer-settings' style={{textAlign: 'left'}}>
        <label>Work Minutes: {settingsInfo.workMinutes}:00 </label>
        <ReactSlider 
        className='slider' 
        thumbClassName='thumb' 
        trackClassName='track'
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
        />
        <label>Break Minutes: {settingsInfo.breakMinutes}:00 </label>
        <ReactSlider 
        className='slider green' 
        thumbClassName='thumb' 
        trackClassName='track'
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
        />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <CloseTimerSettings onClick={() => {settingsInfo.setShowSettings(false)}}/>
        </div>
    </div>
  )
}

export default TimerSettings