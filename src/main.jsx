import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Community from './Components/Community/CommunityPage.jsx';
import Room from './Components/Room/RoomPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/community",
        element: <Community />
    },
    {
        path: "/room",
        element: <Room />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <RouterProvider router={router}/>
    </>
    
)
