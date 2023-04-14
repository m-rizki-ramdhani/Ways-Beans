import { Routes, Route } from "react-router-dom";
import Profile from "./pages/MyProfileTransaction";
import TableTransaction from "./pages/IncomeTransaction";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Detail from "./pages/DetailProduct";
import ListProduct from "./pages/ListProduct";
import UpdateProduct from "./pages/UpdateProduct";

export default function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailproduct/:id" element={<Detail />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/tabletransaction" element={<TableTransaction />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </>
  );
}
