import React from 'react';
import ReactSwitch from 'react-switch';


function Switch({checked,handleChange}) {
  
    return (
    <div className={checked ? 'switch' : 'switch switch-checked' } style={{zIndex: '1'}}>

        <ReactSwitch className='react-switch' checked={checked} onChange={handleChange}/>
        <span style={{marginLeft: '10px'}}>Enable Timer</span>
    </div>
  )
}

export default Switch