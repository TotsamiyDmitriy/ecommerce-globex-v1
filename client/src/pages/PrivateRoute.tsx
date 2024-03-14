import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Outlet } from 'react-router-dom';
import { setSignModal } from '../redux/authSlice';

const PrivateRoute: React.FC = () => {
  const { currentUser, signModal } = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!currentUser) {
      dispatch(setSignModal(true));
    }
  }, [currentUser, signModal]);

  return currentUser ? <Outlet /> : <p></p>;
};

export default PrivateRoute;
