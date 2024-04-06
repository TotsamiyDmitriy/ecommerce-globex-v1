import React from 'react';
import styles from './popoverModal.module.scss';
import { UserType } from '../../types/mainTypes';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentUser } from '../../redux/authSlice';
import { NavLink } from 'react-router-dom';

interface PopoverType {
  currentUser: UserType;
}

const PopoverModal: React.FC<PopoverType> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  const signOutHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/api/auth/signout');
      dispatch(setCurrentUser(undefined));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <NavLink to={'/profile'}>
          <img
            className={styles.avatar}
            src={currentUser.photoURL}
            alt={`${currentUser.username}_image`}
          />
        </NavLink>
        <div className={styles.information}>
          <h3 className={styles.username}>{currentUser.username}</h3>
          <p className={styles.email}>{currentUser.email}</p>
        </div>
        <div className={styles.status}>
          Your status :{' '}
          {currentUser.isAdmin ? (
            <span className={styles.admin}>Administrator</span>
          ) : currentUser.isAuthor ? (
            <span className={styles.author}>Seller</span>
          ) : (
            <>
              <span className={styles.consumer}>Consumer</span>
              <p className={styles.contact}>If you want publish new brand, contact to us.</p>
            </>
          )}
        </div>
        <button onClick={signOutHandler} className={styles.signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default PopoverModal;
