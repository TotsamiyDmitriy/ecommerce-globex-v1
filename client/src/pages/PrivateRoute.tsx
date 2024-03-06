import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<unknown> = () => {
  const { currentUser } = useAppSelector(({ auth }) => auth);
  return currentUser ? <Outlet /> : <Navigate to={'/sign-in'} />;
};

export default PrivateRoute;
