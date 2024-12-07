import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../store/slices/authSlice.js';
import axios from '../api/axios.js';
import useAuth from '../hooks/useAuth.js';
import updateLocalStorage from '../utils/localStorage.js';
import { ROUTES, API_ROUTES } from '../utils/router.js';

const Signup = () => {
  const { t, i18n } = useTranslation();

  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(null);
  const [loadingState, setLoadingState] = useState(false);

  const generateErrorMessage = (error) => {
    if (error === null) {
      return '';
    }

    const errorMessageText = error?.response?.status === 409
      ? t('form.signup.errors.err409')
      : t('errors.noNetwork');

    return errorMessageText;
  };

  i18n.on('languageChanged', () => {
    const errMessage = generateErrorMessage(err);
    setErrMsg(errMessage);
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { login } = useAuth();

  const inputRef = useRef(null);

  const VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, t('form.signup.errors.validation.userNameLength'))
      .max(20, t('form.signup.errors.validation.userNameLength'))
      .required(t('form.signup.errors.validation.required')),
    password: yup.string()
      .trim()
      .min(6, t('form.signup.errors.validation.passwordLength'))
      .required(t('form.signup.errors.validation.required')),
    confirmPassword: yup.string()
      .trim()
      .required(t('form.signup.errors.validation.passwordMatch'))
      .oneOf(
        [yup.ref('password'), null],
        t('form.signup.errors.validation.passwordMatch'),
      ),
  });

  const sendSignupRequest = async (formikInst) => {
    setLoadingState(true);
    setErrMsg('');
    try {
      const response = await axios({
        method: 'post',
        url: API_ROUTES.signup,
        data: {
          username: formikInst.values.username,
          password: formikInst.values.password,
        },
      });
      login();
      updateLocalStorage({ type: 'setValue', value: response.data, key: 'auth' });
      dispatch(setCredentials(response.data));

      navigate('/');
    } catch (e) {
      const errorMessageText = e?.response?.status === 409
        ? t('form.signup.errors.err409')
        : t('errors.noNetwork');

      setErrMsg(errorMessageText);
      setErr(e);
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
    onSubmit: () => {
      sendSignupRequest(formik);
    },
  });

  return (
    <section className="signup">
      <div className="form-wrapper">
        <div>
          <h1 className="login__title">{t('form.signup.headline')}</h1>
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
              <label className="form__label" htmlFor="username">
                {t('form.signup.labels.username')}
                :
              </label>
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
                aria-invalid={formik.errors.username ? 'true' : 'false'}
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
              <label className="form__label" htmlFor="password">
                {t('form.signup.labels.password')}
                :
              </label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                aria-invalid={formik.errors.password ? 'true' : 'false'}
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
              <label
                className="form__label"
                htmlFor="confirmPasswordß"
              >
                {t('form.signup.labels.confirmPassword')}
                :
              </label>
              <input
                className="form__input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                required
                aria-invalid={formik.errors.confirmPassword ? 'true' : 'false'}
                aria-describedby="confirmPasswordErrNote"
              />
            </div>
            <button
              className="form__btn-submit  bttn"
              disabled={loadingState}
              type="submit"
            >
              {t('form.signup.buttons.signup')}
            </button>
          </form>
        </div>
      </div>
      <div className="signup__footer">
        <p>
          {t('form.signup.footerText')}
          &nbsp;
          <span>
            <Link to={ROUTES.login} className="link">{t('form.signup.footerLink')}</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;
