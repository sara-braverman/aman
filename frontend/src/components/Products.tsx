import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const Products: React.FC = () => {
  const { products, searchProducts, deleteProduct } = useProductContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    searchProducts(searchQuery)
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛍️ Products</h2>

      {/* 🔍 Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search by name or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />

      <Link to="/add-product">
        <Button variant="success" className="mb-3">➕ Add Product</Button>
      </Link>

      <div className="row">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product.sku} className="col-md-4 mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>SKU:</strong> {product.sku} <br />
                    <strong>Description:</strong> {product.description} <br />
                    <strong>Category:</strong> {product.categoryId}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/products/${product.sku}`}>
                      <Button variant="secondary">👀 View</Button>
                    </Link>
                    <Link to={`/edit-product/${product.sku}`}>
                      <Button variant="warning">✏️ Edit</Button>
                    </Link>
                    <Button variant="outline-danger" onClick={() => deleteProduct(product.sku)}>
                      ❌ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h5 className="text-center mt-3">No products found</h5>
        )}
      </div>
    </div>
  );
};

export default Products;
