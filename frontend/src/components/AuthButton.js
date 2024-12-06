import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const AuthButton = () => {
  const { t } = useTranslation();

  const { loggedIn, logout } = useAuth();

  return (
    loggedIn && (
      <button
        type="button"
        className="page-header__btn page-header__btn--logout bttn"
        onClick={() => {
          logout();
        }}
      >
        {t('header.buttons.signout')}
      </button>
    )
  );
};

export default AuthButton;
