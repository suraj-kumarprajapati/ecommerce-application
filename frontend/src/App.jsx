import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/user/Profile";
import UpdateUserProfile from "./components/user/UpdateUserProfile";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { UploadAvatar } from "./components/user/UploadAvatar";
import { UpdatePassword } from "./components/user/UpdatePassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Cart from "./components/Cart/Cart";


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
						<Route path="password/forgot" element={ <ForgotPassword /> } />
						<Route path="password/reset/:token" element={ <ResetPassword /> } />

						<Route 
							path="/me/profile" 
							element={ 
								<ProtectedRoute> 
									<Profile /> 
								</ProtectedRoute>} 
						/>
						<Route 
							path="/me/update_profile" 
							element={ 
								<ProtectedRoute> 
									<UpdateUserProfile /> 
								</ProtectedRoute> 
							}
						/>

						<Route 
							path="/me/upload_avatar" 
							element={ 
								<ProtectedRoute> 
									<UploadAvatar /> 
								</ProtectedRoute>
							}
						/>

						<Route path="me/update_password" element={ <ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />

						<Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute>  } />

						
					</Routes>
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
