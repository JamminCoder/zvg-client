import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';

// CSS
import './css/index.css';
import "./css/reset.css";

import Nav from "./components/Nav";

// Pages
import Shop from "./pages/Shop";
import Home from './pages/Home';
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import ReservationPage from "./pages/ReservationPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { xsrf } from "./lib/utils";

(async () => {
await xsrf();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Nav/>
      <Routes>

        <Route path="/" element={ <Home/> } />
        <Route path="/shop" element={ <Shop/> }/>
        <Route path="/shop/checkout" element={ <h1 className="text-4xl font-bold">Checkout page not created yet.</h1> }/>
        <Route path="/shop/:productType" element={ <ProductsPage/> } />
        <Route path="/shop/:productType/:sku" element={ <ProductDetails/> } />
        

        <Route path="/campground" element={ <ReservationPage/> } />

        <Route path="/login" element={ <Login/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />

      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

})();
