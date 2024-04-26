import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
    const log = localStorage.getItem('log');
    const handlelog =() =>{
        if(localStorage.getItem('log') === 'true')
        {
            console.log("CCC the private route", localStorage.getItem('log'));
            return <Component />
        }
        else{
            console.log("ELSE the private route", localStorage.getItem('log'));
            return  <Navigate to="/login"/>
        }
    }
        return (
        <>
            {handlelog()}
        </>
    );
}

export default PrivateRoute;
