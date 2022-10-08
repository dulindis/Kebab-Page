import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./header/Header";
import CartScreen from "./screens/cart-screen/CartScreen";
import HomeScreen from "./screens/home-screen/HomeScreen";
import ProductScreen from "./screens/product-screen/ProductScreen";
import ShippingAddressScreen from "./screens/shipping-address-screen/ShippingAddressScreen";
import SinginScreen from './screens/sign-in-screen/SigninScreen';

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
           <Route path="/shipping" element={<ShippingAddressScreen />} />
           <Route path="/" element={<HomeScreen />} />
         </Routes>
       </main>
       
       <Footer/>
      </div>





    </BrowserRouter>
  );
}

export default App;
