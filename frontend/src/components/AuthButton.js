import useAuth from '../hooks/index.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';

const AuthButton = () => {
  const { loggedIn, login, logout } = useAuth();

  const dispatch = useDispatch();

  return (
    loggedIn && <button
      className="page-header__btn page-header__btn--logout btn"
      onClick={() => {
        logout();
        setCredentials({ token: null });
      }}
    >
      Выйти
    </button>
  );
};

export default AuthButton;
