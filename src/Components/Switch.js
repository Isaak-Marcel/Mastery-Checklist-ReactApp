import React from 'react';
import ReactSwitch from 'react-switch';


function Switch({checked,handleChange}) {
  
    return (
    <div className='switch' style={{zIndex: '1'}}>
        
        <ReactSwitch className='react-switch' checked={checked} onChange={handleChange}/>
        <span style={{marginLeft: '10px'}}>Show Timer</span>
    </div>
  )
}

export default Switch