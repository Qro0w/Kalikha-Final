import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SubcategoryProvider } from './context/SubcategoryContext';  // Import the provider

ReactDOM.render(
  <SubcategoryProvider>
    <App />
  </SubcategoryProvider>,
  document.getElementById('root')
);
