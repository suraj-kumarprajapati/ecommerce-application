import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails";







function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Toaster position="top-center" />

				<Header />

				<div className="container">
					<Routes>
						<Route path="/" element={ <Home />} />
						<Route path="/products/:id" element={ <ProductDetails /> } />
					</Routes>
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
