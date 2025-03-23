import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Users from "./components/Users";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";
import { UserProvider } from "./context/UserContext";
import EditUser from "./components/EditUser";
import { ProductProvider } from "./context/ProductContext";
import EditProduct from "./components/EditProduct";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryDetails from "./components/CategoryDetails";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider> 
      <CategoryProvider>
        <ProductProvider>
          <UserProvider>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/users">Users</Nav.Link>
                  <Nav.Link as={Link} to="/products">Products</Nav.Link>
                  <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                </Nav>
              </Container>
            </Navbar>

            <Container className="mt-4">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserDetails />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/edit-user/:userId" element={<EditUser />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:sku" element={<ProductDetails />} />
                <Route path="/edit-product/:sku" element={<EditProduct />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories/:categoryId" element={<CategoryDetails />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/edit-category/:categoryId" element={<EditCategory />} />
              </Routes>
            </Container>
          </UserProvider>
        </ProductProvider>
      </CategoryProvider>
      </CartProvider> 
    </Router>
  );
};

export default App;
