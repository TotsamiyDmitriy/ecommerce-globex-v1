import React from 'react';
import styles from './profile.module.scss';
import { Avatar, Popover } from '@mui/material';
import stringAvatar from '../../utils/avatar';
import { useAppSelector } from '../../redux/hooks';
const Profile: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      {currentUser && (
        <div className={styles.profile}>
          <div className={styles.person} onClick={handleClick}>
            {currentUser.photoURL ? (
              <img
                className={styles.image}
                src={currentUser.photoURL}
                alt={`${currentUser.username}_image`}
              />
            ) : (
              <Avatar {...stringAvatar(currentUser.email)}></Avatar>
            )}
            <span className={styles.username}>{currentUser.username}</span>
          </div>
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <div className={styles.accountWrapper}>Hello</div>
          </Popover>
        </div>
      )}
    </>
  );
};

export default Profile;
