import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute() {
    const token = useSelector(state => state.auth.token)
    return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute