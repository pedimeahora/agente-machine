import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from '../routes/index';
import Terminos from '../pages/Terminos';
import Privacidad from '../pages/Privacidad';
import '../styles.css';

function App() {
  switch (window.location.pathname) {
    case '/terminos':
      return <Terminos />;
    case '/privacidad':
      return <Privacidad />;
    default:
      return <Index />;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}