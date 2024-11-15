import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from '../api/axios.js';

import useAuth from '../hooks/useAuth.js';

import { API_ROUTES } from '../utils/router.js';


const Signup = () => {
  const [errMsg, setErrMsg] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [ formErrors, setFormErrors ] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { login } = useAuth();

  const inputRef = useRef(null);

  const VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .trim()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .trim()
      .required('Пароли должны совпадать')
      .oneOf(
        [yup.ref('password'), null],
        'Пароли должны совпадать',
      ),
  });

  const sendSignupRequest = async () => {
    setLoadingState(true);
    setErrMsg('');
    try {
      const response = await axios({
        method: 'post',
        url: API_ROUTES.signup,
        data: {
          username: formik.values.username,
          password: formik.values.password,
        }
      });
      console.log(response, response.data);
      login();
      localStorage.setItem('auth', JSON.stringify(response.data))
      dispatch(setCredentials(response.data));

      navigate('/');
    } catch(e) {
      console.log(e, e.message)
      // setErrMsg('the username or password is incorrect');
      setErrMsg('Неверные имя пользователя или пароль');
      inputRef.current.select();
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (values) => {
      sendSignupRequest();
    },
  });

  console.log('FORMIK Touched', formik.touched.username);

  return (
    <section className='signup'>
      <div className=' form-wrapper'>
        <div className='form__img-box'>
          <img />
        </div>
        <div>
          <h1 className='login__title'>Регистрация</h1>
          <form className='login__form form' onSubmit={formik.handleSubmit}>
            <p
              className={errMsg ? 'form__err-message' : 'offscreen'}
              aria-live='assertive'
            >
              {errMsg}
            </p>
            <p
              id="usernameErrNote"
                className={
                  formik.errors.username && formik.touched.username ? 'form__err-message' : 'offscreen'
                }
            >
              {formik.errors.username}
            </p>
            <div className="form__input-box">
              <label className="form__label" htmlFor='username'>Имя пользователя:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type='text'
                name='username'
                id='username'
                autoComplete='off'
                ref={inputRef}
                required
                aria-invalid={formik.errors.username ? "true" : "false"}
                aria-describedby="usernameErrNote"
              />
            </div>

            <p
              id="passwordErrNote"
                className={
                  formik.errors.password && formik.touched.password ? 'form__err-message' : 'offscreen'
                }
            >
              {formik.errors.password}
            </p>
            <div className="form__input-box">
              <label className="form__label" htmlFor='password'>Пароль:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                required
                aria-invalid={formik.errors.password ? "true" : "false"}
                aria-describedby="passwordErrNote"
              />
            </div>

            <p
              id="confirmPasswordErrNote"
                className={
                  formik.errors.confirmPassword && formik.touched.confirmPassword ? 'form__err-message' : 'offscreen'
                }
            >
              {formik.errors.confirmPassword}
            </p>
            <div className="form__input-box">
              <label className="form__label" htmlFor='password'>Пароль:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                autoComplete='off'
                required
                aria-invalid={formik.errors.confirmPassword ? "true" : "false"}
                aria-describedby="confirmPasswordErrNote"
              />
            </div>
            <button className="form__btn-submit  bttn" disabled={loadingState} type="submit">Войти</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
