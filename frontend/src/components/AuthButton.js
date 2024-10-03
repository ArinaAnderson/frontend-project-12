import useAuth from '../hooks/index.js';

const AuthButton = () => {
  const { loggedIn, login, logout } = useAuth();

  return (
    loggedIn && <button
      className='page-header__btn page-header__btn--logout btn'
      onClick={() => logout()}
    >
      Выйти
    </button>
  );
};

export default AuthButton;
