import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./css/reset.css"
import App from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Nav from "./components/Nav";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Nav/>
      <Routes>

        <Route path="/" element={ <App/> } />

      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
