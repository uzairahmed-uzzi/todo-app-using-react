import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../LAYOUT/Layout'
import Tasks from '../Tasks/Tasks'
import Completed from '../Completed/Completed'
import Important from '../Important/Important'

export const router=createBrowserRouter([
{
    path:"/",
    element:<Layout/>,
    children:[
        {
            path:"",
            element:<Tasks />
        },
        {
            path:"/completed",
            element:<Completed />
        },{
            path:"/important",
            element:<Important />
        }
    ]
},{
    path:"*",
    element:<h1>NOT FOUND</h1>
}
])