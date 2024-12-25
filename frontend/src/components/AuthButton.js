import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import { logout } from '../utils/auth.js';

const AuthButton = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    token && (
      <button
        type="button"
        className="page-header__btn page-header__btn--logout bttn"
        onClick={() => {
          logout(
            () => dispatch(setCredentials({ token: null, username: null })),
          );
        }}
      >
        {t('header.buttons.signout')}
      </button>
    )
  );
};

export default AuthButton;
