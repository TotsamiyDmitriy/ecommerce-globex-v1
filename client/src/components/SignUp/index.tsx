import React, { useState } from 'react';
import styles from './signUp.module.scss';
import { Box } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { UserType } from '../../types/mainTypes';
import { setCurrentUser } from '../../redux/authSlice';
import { app } from '../../utils/firebase';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface SignProps {
  setTypeModal: React.Dispatch<boolean>;
}

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const SingUp = React.forwardRef<React.Ref<HTMLDivElement>, SignProps>((props, ref) => {
  const [passError, setPassError] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    if (data.password === data.password2) {
      try {
        const formData = {
          username: data.name,
          email: data.email,
          password: data.password,
        };
        await axios.post('/api/auth/signup', formData);

        const OutputData = await axios.post<UserType>('/api/auth/signin', {
          email: formData.email,
          password: formData.password,
        });

        dispatch(setCurrentUser(OutputData.data));
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      }
    } else {
      setPassError('Password must be equal');
    }
  };

  const googleHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const { user } = await signInWithPopup(auth, provider);

      const userData = {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const { data } = await axios.post<UserType>('/api/auth/google', userData);
      dispatch(setCurrentUser(data));
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      console.log(error);
    }
  };

  return (
    <Box sx={style} ref={ref} tabIndex={-1}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Register</h2>
        <hr />
        <br />
        <div className={styles.inputs}>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                {...register('name', { required: 'Username is required' })}
                id="name"
                type="text"
                required
              />
              <label className={styles.label} htmlFor="name">
                Name
              </label>
            </div>{' '}
            <p className={styles.errormsg}>{errors.name && errors.name.message}</p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                {...register('email', { required: 'Email is required' })}
                id="email"
                type="text"
                required
              />
              <label className={styles.label} htmlFor="email">
                Email
              </label>
            </div>{' '}
            <p className={styles.errormsg}>{errors.email && errors.email.message}</p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.password || passError ? styles.error : ''}`}
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
                required
              />

              <label className={styles.label} htmlFor="password">
                Password
              </label>
            </div>
            <p className={styles.errormsg}>
              {errors.password && !passError ? errors.password.message : passError ? passError : ''}
            </p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.password || passError ? styles.error : ''}`}
                {...register('password2', { required: 'Password is required' })}
                id="password2"
                type="password"
                required
              />
              <label className={styles.label} htmlFor="password2">
                Password
              </label>
            </div>
            <p className={styles.errormsg}>
              {errors.password2 && !passError
                ? errors.password2.message
                : passError
                ? passError
                : ''}
            </p>
          </div>
          <p className={styles.error}>{error ? error : ''}</p>
          <button className={styles.submit} type="submit">
            Register
          </button>
          <button className={styles.google} onClick={googleHandler} type="button">
            <svg
              width="25"
              height="24"
              viewBox="0 0 294 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M150 122.729V180.82H230.727C227.183 199.502 216.545 215.321 200.59 225.957L249.272 263.731C277.636 237.55 294 199.094 294 153.412C294 142.776 293.046 132.548 291.273 122.73L150 122.729Z"
                fill="#4285F4"
              />
              <path
                d="M65.9342 178.553L54.9546 186.958L16.0898 217.23C40.7719 266.185 91.3596 300.004 149.996 300.004C190.496 300.004 224.45 286.64 249.269 263.731L200.587 225.958C187.223 234.958 170.177 240.413 149.996 240.413C110.996 240.413 77.8602 214.095 65.9955 178.639L65.9342 178.553Z"
                fill="#34A853"
              />
              <path
                d="M16.0899 82.7734C5.86309 102.955 0 125.728 0 150.001C0 174.273 5.86309 197.047 16.0899 217.228C16.0899 217.363 66.0004 178.5 66.0004 178.5C63.0004 169.5 61.2272 159.955 61.2272 149.999C61.2272 140.043 63.0004 130.498 66.0004 121.498L16.0899 82.7734Z"
                fill="#FBBC05"
              />
              <path
                d="M149.999 59.7279C172.091 59.7279 191.727 67.3642 207.409 82.0918L250.364 39.1373C224.318 14.8647 190.5 0 149.999 0C91.3627 0 40.7719 33.6821 16.0898 82.7738L65.9988 121.502C77.8619 86.0462 110.999 59.7279 149.999 59.7279Z"
                fill="#EA4335"
              />
            </svg>
          </button>
        </div>

        <p className={styles.register}>
          Already have an account?
          <span onClick={() => props.setTypeModal(false)}>SignIn</span>
        </p>
      </form>
    </Box>
  );
});

export default SingUp;
