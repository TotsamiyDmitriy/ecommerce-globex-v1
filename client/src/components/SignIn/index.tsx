import React, { useEffect, useState } from 'react';
import styles from './signIn.module.scss';
import { Box } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  email: string;
  password: string;
};

const SignIn = React.forwardRef<React.Ref<HTMLDivElement>, SignProps>((props, ref) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormData>();

  const onSumbit: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
  };

  return (
    <Box sx={style} ref={ref} tabIndex={-1}>
      <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
        <h2 className={styles.title}>Sign In</h2>
        <hr />
        <br />
        <div className={styles.inputs}>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                {...register('email', { required: 'Email is required' })}
                type="text"
                id="email"
                required
              />
              <label
                className={`${styles.label} ${errors.email ? styles.error : ''}`}
                htmlFor="email">
                Email
              </label>
            </div>

            <p className={styles.errormsg}>{errors.email && errors.email.message}</p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.case}>
              <input
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                {...register('password', { required: 'Password is required' })}
                type="password"
                id="password"
                required
              />
              <label
                className={`${styles.label} ${errors.password ? styles.error : ''}`}
                htmlFor="password">
                Password
              </label>
            </div>
            <p className={styles.errormsg}>{errors.password && errors.password.message}</p>
          </div>
          <button className={styles.submit} type="submit">
            Sign In
          </button>
        </div>
        <p className={styles.register}>
          Dont have account
          <span onClick={() => props.setTypeModal(true)}> Register</span>
        </p>
      </form>
    </Box>
  );
});

export default SignIn;
