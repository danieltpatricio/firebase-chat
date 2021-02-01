import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { appFirebase } from 'settings';

console.log(appFirebase.name);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
