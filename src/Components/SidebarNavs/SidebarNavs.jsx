import React from 'react'
import './SidebarNavs.css'
import { NavLink } from 'react-router-dom'
const SidebarNavs = (props) => {
  return (
    <NavLink to={props.to} onClick={props.refresh} className={({isActive})=>`navButtons ${isActive?"active":""}`}>
        <img src={props.icon} alt="ICON" />
        <h2>{props.name}</h2>
    </NavLink>
  )
}

export default SidebarNavs