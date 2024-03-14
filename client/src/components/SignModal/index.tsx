import React from 'react';
import SignIn from '../SignIn';
import SingUp from '../SignUp';
import { Fade, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSignModal } from '../../redux/authSlice';

const SignModal: React.FC = () => {
  const [typeModal, setTypeModal] = React.useState(false);

  const { signModal } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setSignModal(false));
    setTypeModal(false);
  };

  return (
    <Modal open={signModal} onClose={handleClose}>
      <Fade in={signModal}>
        {typeModal === false ? (
          <SignIn setTypeModal={setTypeModal} />
        ) : (
          <SingUp setTypeModal={setTypeModal} />
        )}
      </Fade>
    </Modal>
  );
};

export default SignModal;
