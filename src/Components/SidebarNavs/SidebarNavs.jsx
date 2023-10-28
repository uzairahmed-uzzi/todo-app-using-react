import React from 'react'
import './SidebarNavs.css'
const SidebarNavs = (props) => {
  return (
    <a href='#' className='navButtons'>
        <img src={props.icon} alt="ICON" />
        <h2>{props.name}</h2>
    </a>
  )
}

export default SidebarNavs