import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Element }) => {
    const user = useSelector(state => state.user.user);
    if (!user || !user.name) {
        return <Navigate to="/login" replace />;
    }

    return <Element />;
};

export default ProtectedRoute;
