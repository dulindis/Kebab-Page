import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/home-screen/HomeScreen";
import ProductScreen from "./screens/product-screen/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Kebab Shop</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
