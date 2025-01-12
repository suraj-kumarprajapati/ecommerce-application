import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/user/Profile";
import UpdateUserProfile from "./components/user/UpdateUserProfile";


function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Toaster position="bottom-center" />

				<Header />

				<div className="container">
					<Routes>
						<Route path="/" element={ <Home />} />
						<Route path="/products/:id" element={ <ProductDetails /> } />

						<Route path="/Login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route path="/me/profile" element={<Profile />} />
						<Route path="/me/update_profile" element={<UpdateUserProfile />} />
					</Routes>
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
