import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./header/Header";
import CartScreen from "./screens/cart-screen/CartScreen";
import HomeScreen from "./screens/home-screen/HomeScreen";
import OrderHistoryScreen from "./screens/order-history-screen/OrderHistoryScreen";
import OrderScreen from "./screens/order-screen/OrderScreen";
import PaymentMethodScreen from "./screens/payment-method-screen/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/place-order-screen/PlaceOrderScreen";
import ProductScreen from "./screens/product-screen/ProductScreen";
import ProfileScreen from "./screens/profile-screen/ProfileScreen";
import ShippingAddressScreen from "./screens/shipping-address-screen/ShippingAddressScreen";
import SinginScreen from './screens/sign-in-screen/SigninScreen';
import SingupScreen from './screens/sign-up-screen/SignupScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
       something
       <Header/>
       <main>
         <Routes>
           <Route path="/product/:slug" element={<ProductScreen />} />
           <Route path="/cart" element={<CartScreen />} />
           <Route path="/signin" element={<SinginScreen />} />
           <Route path="/signup" element={<SingupScreen />} />
           <Route path="/profile" element={<ProfileScreen />} />

           <Route path="/shipping" element={<ShippingAddressScreen />} />
           <Route path="/placeorder" element={<PlaceOrderScreen />} />

           <Route path="/payment" element={<PaymentMethodScreen />} />
           <Route path="/order/:id" element={<OrderScreen />} />
           <Route path="/orderhistory" element={<OrderHistoryScreen />} />

           <Route path="/" element={<HomeScreen />} />
         </Routes>
       </main>
       
       <Footer/>
      </div>





    </BrowserRouter>
  );
}

export default App;
