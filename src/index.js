import React, { useEffect, useState } from 'react';
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
import Login from "./pages/Login";
import { DashboardLayout, DashboardHome, DashboardProducts } from "./pages/dashboard/Dashboard";
import Checkout from "./pages/checkout/Checkout";
import { xsrf } from "./lib/utils";
import ManageSlides from "./pages/dashboard/ManageSlides";
import ManageShopHeader from "./pages/dashboard/ManageShopHeader";
import ShoppingCartManager from "./lib/shoppingCartManager";
import ManageHomeInfoBanner from "./pages/dashboard/ManageHomeInfoBanner";


function App() {
	const [cartItems, setCartItems] = useState([]);
	

	useEffect(() => {
		ShoppingCartManager.all().then(items => {
			setCartItems(items);
			ShoppingCartManager.initCartItems(cartItems, setCartItems);
		});
	});

	return <>
	<HashRouter>
		<Nav cartItems={ cartItems }/>
		<Routes>

		<Route path="/" element={ <Home/> } />
		<Route path="/shop" element={ <Shop/> }/>
		<Route path="/shop/checkout" element={ <Checkout cartItems={ cartItems }/> }/>
		<Route path="/shop/:productType" element={ <ProductsPage/> } />
		<Route path="/shop/:productType/:sku" element={ <ProductDetails/> } />
		

		{/* <Route path="/campground" element={ <ReservationPage/> } /> */}

		<Route path="/login" element={ <Login/> } />

		{/* Dashboard is an outlet */}
		<Route path="/dashboard" element={ <DashboardLayout/> }>
			<Route path="" element={ <DashboardHome/> }/>
			<Route path="products" element={ <DashboardProducts/> }/>
			<Route path="homepage/info" element={ <ManageHomeInfoBanner/> }/>
			<Route path="homepage/slides" element={ <ManageSlides/> } />
			<Route path="shop-header" element={ <ManageShopHeader/> } />
		</Route>

		</Routes>
	</HashRouter>
  	</>;
}


(async () => {
await xsrf();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

})();
