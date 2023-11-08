import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../LAYOUT/Layout'
import Tasks from '../Tasks/Tasks'

export const router=createBrowserRouter([
{
    path:"/",
    element:<Layout/>,
    children:[
        {
            path:"",
            element:<Tasks/>
        }
    ]
}
])