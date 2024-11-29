const updateLocalStorage = ({ type, key, value }) => {
  switch (type) {
    case 'setValue':
      window.localStorage.setItem(key, JSON.stringify(value));
      break;
    case 'getValue':
      window.localStorage.getItem(key);
      break;
    case 'removeValue':
      window.localStorage.removeItem(key);
      break;
    default:
      throw new Error(`Unknown localStorage action type: '${type}'!`);
  }
};

export default updateLocalStorage;
