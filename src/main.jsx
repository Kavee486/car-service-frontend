import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx';
import './index.css';
import 'antd/dist/reset.css'; // Ant Design styles
import store from './store';

// Axios global configuration
axios.defaults.baseURL = "http://localhost:60748/";

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);