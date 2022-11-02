import React from 'react';
import { useContext } from 'react';
import './PrivateRoute.css';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        console.log('Loading is found');
        return (
            <div className='loading-data'>
                <h2>Loading...</h2>
            </div>
    )};

    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;