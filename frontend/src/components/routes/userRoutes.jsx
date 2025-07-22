


import Home from "../Home";

import { Route} from "react-router-dom";
import ProductDetails from "../product/ProductDetails";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../user/Profile";
import UpdateUserProfile from "../user/UpdateUserProfile";
import { ProtectedRoute } from "../Auth/ProtectedRoute";
import { UploadAvatar } from "../user/UploadAvatar";
import { UpdatePassword } from "../user/UpdatePassword";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import Cart from "../Cart/Cart";
import Shipping from "../Cart/Shipping";
import ConfirmOrder from "../Cart/ConfirmOrder";
import PaymentMethod from "../Cart/PaymentMethod";


export const userRoutes = () => {
  return (
    <>

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
						<Route path="/shipping" element={ <ProtectedRoute> <Shipping /> </ProtectedRoute>  } />
						<Route path="/confirm_order" element={ <ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>  } />

						<Route path="/payment_method" element={ <ProtectedRoute> <PaymentMethod /> </ProtectedRoute>  } />
    
    </>
  )
}
