
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { userRoutes } from "./components/routes/userRoutes";	
import { adminRoutes } from "./components/routes/adminRoutes";


function App() {

	return (
		<BrowserRouter>
			<div className="App">
				<Toaster position="bottom-center" />

				<Header />

				<div className="container">
					<Routes>
						{userRoutes()}
						{adminRoutes()}
					</Routes>
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
