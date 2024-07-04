import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function NoLoginAccess() {
  const auth = useSelector(state => state.user.auth);
  return auth?.isLogin ===true ? <Navigate to="/" /> : <Outlet />
}
