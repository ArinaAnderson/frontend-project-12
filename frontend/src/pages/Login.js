import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from '../api/axios.js';
import { login } from '../utils/auth.js';
import { setCredentials } from '../store/slices/authSlice.js';

import { ROUTES, API_ROUTES } from '../utils/router.js';

import LottieAnimation from '../containers/LottieAnimation.js';

const Login = () => {
  const { t } = useTranslation();

  const [err, setErr] = useState(null);
  const [isLottieActive, setIsLottieActive] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

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

  const sendLoginRequest = async (formikInst) => {
    formikInst.setSubmitting(true);
    setErr(null);
    try {
      const response = await axios({
        method: 'post',
        url: API_ROUTES.login,
        data: {
          username: formikInst.values.username,
          password: formikInst.values.password,
        },
      });
      login(() => dispatch(setCredentials(response.data)), response.data);

      navigate(from);
    } catch (e) {
      setErr(e);
      inputRef.current.select();
    } finally {
      formikInst.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      sendLoginRequest(formik);
    },
  });

  return (
    <section className="login">
      <div className="form-wrapper">
        <p
          className={err ? 'form__err-message--main' : 'offscreen'}
          aria-live="assertive"
        >
          {
            err?.response?.status === 401
              ? t('form.login.errors.err401')
              : t('errors.noNetwork')
          }
        </p>
        <div>
          <h1 className="login__title">{t('form.login.headline')}</h1>
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <div className="form__input-box">
              <label className="form__label" htmlFor="username">
                {t('form.login.labels.username')}
                :
              </label>
              <input
                className="form__input"
                onChange={(e) => {
                  setIsLottieActive(true);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                ref={inputRef}
                required
                aria-invalid={formik.errors.username ? 'true' : 'false'}
                aria-describedby="usernameErrNote"
              />
              <p
                id="usernameErrNote"
                className={
                  formik.errors.username && formik.touched.username ? 'form__err-message' : 'offscreen'
                }
              >
                <span>{formik.errors.username}</span>
              </p>
            </div>
            <div className="form__input-box">
              <label className="form__label" htmlFor="password">
                {t('form.login.labels.password')}
                :
              </label>
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
                aria-invalid={formik.errors.password ? 'true' : 'false'}
                aria-describedby="passwordErrNote"
              />
              <p
                id="passwordErrNote"
                className={
                  formik.errors.password && formik.touched.password ? 'form__err-message' : 'offscreen'
                }
              >
                <span>{formik.errors.password}</span>
              </p>
            </div>
            <button
              className="form__btn-submit bttn"
              disabled={formik.isSubmitting}
              type="submit"
            >
              {t('form.login.buttons.signIn')}
            </button>
          </form>
        </div>
      </div>
      <div className="login__footer">
        <p>
          {t('form.login.footerText')}
          &nbsp;
          <span>
            <Link to={`../${ROUTES.signup}`} className="link">{t('form.login.footerLink')}</Link>
          </span>
        </p>
      </div>
      {isLottieActive && <LottieAnimation />}
    </section>
  );
};

export default Login;
