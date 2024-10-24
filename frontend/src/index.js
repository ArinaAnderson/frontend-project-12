import ReactDOM from 'react-dom/client';
/*
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store/index.js';
*/
import init from './init.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  await init()
);

/*
<Provider store={store}>
    <App />
  </Provider>
*/
