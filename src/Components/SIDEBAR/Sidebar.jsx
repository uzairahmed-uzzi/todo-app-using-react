import React from 'react'
import './Sidebar.css'
import SidebarNavs from '../SidebarNavs/SIdebarNavs'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
        <div className="logo-bar">
            <img src="/images\logo bar.png" alt="logo" />
            <h1>TO-DO</h1>
        </div>
        <div className="side-bar-buttons-container">
            <SidebarNavs icon="/images/task.png" name="tasks"/>
            <SidebarNavs icon="/images/Star.png" name="important"/>
            <SidebarNavs icon="/images/bin.png" name="completed"/>
        </div>
    </aside>
  )
}

export default Sidebar