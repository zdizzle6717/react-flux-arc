import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

let something = 'hello world';

window.onload = () => {
  ReactDOM.render(<AppRoutes color={something}/>, document.getElementById('main'));
};
