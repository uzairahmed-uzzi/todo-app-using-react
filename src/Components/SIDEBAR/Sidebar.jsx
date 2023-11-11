import React from 'react'
import './Sidebar.css'
import SidebarNavs from '../SidebarNavs/SidebarNavs'

const Sidebar = (props) => {
  return (
    <aside className='sidebar'>
        <div className="logo-bar">
            <img src="/images\logo bar.png" alt="logo" />
            <h1>TO-DO</h1>
        </div>
        <div className="side-bar-buttons-container">
            <SidebarNavs refresh={props.refreshPage} to="/" icon="/images/task.png" name="tasks"/>
            <SidebarNavs refresh={props.refreshPage} to="/important" icon="/images/Star.png" name="important"/>
            <SidebarNavs refresh={props.refreshPage} to="/completed" icon="/images/bin.png" name="completed"/>
        </div>
    </aside>
  )
}

export default Sidebar