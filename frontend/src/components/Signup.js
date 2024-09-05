import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import formik from 'formik';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const srcLink = location.state?.srcLink || '/';
  const [errMsg, setErrMsg] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  return (
    <section className='login'>
      <div className=' form-wrapper'>
        <div className='form__img-box'>
          <img />
        </div>
        <div>
          <h1 className='login__title'>SIGNUP</h1>
          <form className='login__form form'>
            <p
              className={errMsg ? 'form__err-message' : 'offscreen'}
              aria-live='assertive'
            >
              {errMsg}
            </p>
            <div className='form__input'>
              <label htmlFor='username'>Ваш ник:</label>
              <input
                type='text'
                name='username'
                id='username'
                autoComplete='off'
                required
              />
            </div>
            <p
              className={errMsg ? 'form__err-message' : 'offscreen'}
              aria-live='assertive'
            >
              {errMsg}
            </p>
            <div className='form__input'>
              <label htmlFor='password'>Пароль:</label>
              <input
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                required
              />
            </div>
            <button className='form__btn-submit' disabled={loadingState} type="submit">Войти</button>
          </form>
        </div>
      </div>
      <div className='login__footer'>
        <p>
          Нет аккаунта? <span><Link to='register'>Регистрация</Link></span>
        </p>
      </div>
    </section>
  );
}

export default Signup;
