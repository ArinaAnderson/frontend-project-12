import useAuth from '../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';

const AuthButton = () => {
  const { t, i18n } = useTranslation();

  const { loggedIn, logout } = useAuth();

  const dispatch = useDispatch();

  return (
    loggedIn && <button
      className="page-header__btn page-header__btn--logout bttn"
      onClick={() => {
        logout();
        dispatch(setCredentials({ token: null, username: null }));
      }}
    >
      {t('header.buttons.signout')}
    </button>
  );
};

export default AuthButton;
