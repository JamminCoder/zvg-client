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
import Home from './pages/home/Home';
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
import Account from "./pages/dashboard/Account";
import ManageCabinSection from "./pages/dashboard/ManageCabinSection";
import NewCategoryPage from "./pages/dashboard/items/NewCategoryPage";
import UpdateCategoryPage from "./pages/dashboard/items/UpdateCategoryPage";
import UpdateItemPage from "./pages/dashboard/items/UpdateItemPage";
import NewItemPage from "./pages/dashboard/items/NewItemPage";


require("axios").default.defaults.withCredentials = true;

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
			<Route path="account" element={ <Account/> } />

			<Route path="products">
				<Route path="" element={ <DashboardProducts/> }/>
				<Route path=":categoryName/new" element={ <NewItemPage/> }/>
				<Route path=":productSKU/update" element={ <UpdateItemPage/> }/>
			</Route>

			{/* Product management */}
			<Route path="category">
				<Route path="new" element={ <NewCategoryPage/> }/>
				<Route path=":categoryName/update" element={ <UpdateCategoryPage/> } />
			</Route>

			
			<Route path="homepage/info" element={ <ManageHomeInfoBanner/> }/>
			<Route path="homepage/slides" element={ <ManageSlides/> } />
			<Route path="homepage/cabin" element={ <ManageCabinSection/> } />
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
