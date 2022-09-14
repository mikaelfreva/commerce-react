import { Route, Routes } from "react-router-dom";
import FloatingCart from "./Components/FloatingCart/FloatingCart";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Pages/Products/Products";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";
import ShopppingCart from "./Pages/ShopppingCart/ShopppingCart";

function App() {
  return (
    <>
      <Navbar />
      <FloatingCart/>

      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/produits/:id" element={<ProductShowcase/>} />
        <Route path="/shoppingCart" element={<ShopppingCart/>} />
      </Routes>
    </>
  );
}

export default App;
