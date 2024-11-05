import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';

import { useFormik } from 'formik';
import axios from '../api/axios.js';

import useAuth from '../hooks/useAuth.js';

import { ROUTES } from '../utils/router.js';

const Login = () => {
  const [errMsg, setErrMsg] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  const { login } = useAuth();

  const inputRef = useRef(null);

  const sendLoginRequest = async () => {
    setLoadingState(true);
    try {
      const response = await axios({
        method: 'post',
        url: ROUTES.login,
        data: {
          username: formik.values.username,
          password: formik.values.password,
        }
      });

      login();
      localStorage.setItem('auth', JSON.stringify(response.data))
      dispatch(setCredentials(response.data));

      navigate(from);
    } catch(e) {
      // console.log(e, e.message)
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
    },
    onSubmit: (values) => {
      sendLoginRequest();
    },
  });

  return (
    <section className="login">
      <div className=" form-wrapper">
        <div className="form__img-box">
          <img />
        </div>
        <div>
          <h1 className="login__title">Войти</h1>
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <p
              className={errMsg ? 'form__err-message' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="form__input-box">
              <label className="form__label" htmlFor="username">Ваш ник:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                value={formik.values.username}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                ref={inputRef}
                required
              />
            </div>

            <div className="form__input-box">
              <label className="form__label" htmlFor="password">Пароль:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
              />
            </div>
            <button
              className="form__btn-submit bttn"
              disabled={loadingState}
              type="submit"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
      <div className="login__footer">
        <p>
          Нет аккаунта?{' '}
          <span>
            <Link to={ROUTES.signup} className="link">Регистрация</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
