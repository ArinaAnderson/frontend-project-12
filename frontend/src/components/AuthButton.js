import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import updateLocalStorage from '../utils/localStorage.js';
// import useAuth from '../hooks/useAuth.js';

const AuthButton = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const { loggedIn, logout } = useAuth();

  return (
    token && (
      <button
        type="button"
        className="page-header__btn page-header__btn--logout bttn"
        onClick={() => {
          // logout();
          updateLocalStorage({ type: 'removeValue', key: 'auth' });
          dispatch(setCredentials({ token: null, username: null }));
        }}
      >
        {t('header.buttons.signout')}
      </button>
    )
  );
};

export default AuthButton;
