import React from 'react'
import './ActionButton.css'

const ActionButton = (props) => {
  return (
    <>
        <a href="#" className='actionButton' onClick={props.func}>
            <h3>{props.action_title}</h3>
            <img src={props.action_image} alt="Action Logo" />
        </a>
    </>
  )
}

export default ActionButton