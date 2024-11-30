import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';

// import useLocalStorage from '../hooks/useLocalStorage.js';
import updateLocalStorage from '../utils/localStorage.js';

import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from '../api/axios.js';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';

import { ROUTES, API_ROUTES } from '../utils/router.js';

const Login = () => {
  const { t, i18n } = useTranslation();

  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(null);
  const [loadingState, setLoadingState] = useState(false);

  // const [localStorageAuthData, setLocalStorageAuthData] = useLocalStorage('auth');

  const generateErrorMessage = (err) => {
    if (err === null) {
      return '';
    }

    const errorMessageText = err?.response?.status === 401 ?
      t('form.login.errors.err401') :
      t('errors.noNetwork');

    return errorMessageText;
  };

  i18n.on('languageChanged', () => {
    const errMessage = generateErrorMessage(err);
    setErrMsg(errMessage);
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  const { login } = useAuth();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string()
      .trim()
      .required(t('form.login.errors.validation.required')),
    password: yup.string()
      .trim()
      .required(t('form.signup.errors.validation.required')),
  });

  const sendLoginRequest = async () => {
    setLoadingState(true);
    setErrMsg('');
    try {
      const response = await axios({
        method: 'post',
        url: API_ROUTES.login,
        data: {
          username: formik.values.username,
          password: formik.values.password,
        }
      });
      login();
      // setLocalStorageAuthData({ type: 'setValue', value: JSON.stringify(response.data) });
      // localStorage.setItem('auth', JSON.stringify(response.data))
      updateLocalStorage({ type: 'setValue', value: response.data, key: 'auth' })
      dispatch(setCredentials(response.data));

      navigate(from);
    } catch(e) {
      const errorMessageText = e?.response?.status === 401 ?
        t('form.login.errors.err401') :
        t('errors.noNetwork');

      setErrMsg(errorMessageText);
      setErr(e);
      inputRef.current.select();
    } finally {
      setLoadingState(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: () => {
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
          <h1 className="login__title">{t('form.login.headline')}</h1>
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <p
              className={errMsg ? 'form__err-message form__err-message--main' : 'offscreen'}
              aria-live="assertive"
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
              <label className="form__label" htmlFor="username">{t('form.login.labels.username')}:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
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
              <label className="form__label" htmlFor="password">{t('form.login.labels.password')}:</label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                aria-invalid={formik.errors.password ? "true" : "false"}
                aria-describedby="passwordErrNote"
              />
            </div>
            <button
              className="form__btn-submit bttn"
              disabled={loadingState}
              type="submit"
            >
              {t('form.login.buttons.signIn')}
            </button>
          </form>
        </div>
      </div>
      <div className="login__footer">
        <p>
          {t('form.login.footerText')}{' '}
          <span>
            <Link to={ROUTES.signup} className="link">{t('form.login.footerLink')}</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
