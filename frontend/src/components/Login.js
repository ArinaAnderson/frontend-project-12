import axios from '../api/axios.js';

import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useFormik } from 'formik';

const LOGIN_URL = '/login';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      sendLoginRequest();
    },
  });

  const [errMsg, setErrMsg] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const sendLoginRequest = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: LOGIN_URL,
        data: {
          username: formik.values.username,
          password: formik.values.password,
        }
      });

      console.log(response.data);
      // logIn();
      // const stringifiedUserIdData = JSON.stringify({ token: response.data.token });
      // console.log('stringifiedUserIdData', stringifiedUserIdData)
      // localStorage.setItem('userId', stringifiedUserIdData);
      // navigate(from.pathname);
      navigate('/');
    } catch(e) {
      setErrMsg('the username or password is incorrect');
      // inputEl.current.focus();
    }
  };

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
            <div className="form__input">
              <label htmlFor="username">Ваш ник:</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.username}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
              />
            </div>

            <div className="form__input">
              <label htmlFor="password">Пароль:</label>
              <input
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
              className="form__btn-submit btn"
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
            <Link to="/signup">Регистрация</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
