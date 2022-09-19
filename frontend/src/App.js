import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./header/Header";
import HomeScreen from "./screens/home-screen/HomeScreen";
import ProductScreen from "./screens/product-screen/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
       something
       <Header/>
       <main>
         <Routes>
           <Route path="/product/:slug" element={<ProductScreen />} />
           <Route path="/" element={<HomeScreen />} />
         </Routes>
       </main>
       
       <Footer/>
      </div>





    </BrowserRouter>
  );
}

export default App;
