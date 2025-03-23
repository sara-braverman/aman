import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../services/api";
import { Card, Button, Spinner } from "react-bootstrap";

interface Product {
  sku: string;
  name: string;
  description: string;
  categoryId: string;
}

const ProductDetails: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (sku) {
      fetchData(`products/${sku}`)
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [sku]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!product) {
    return <h3 className="text-center mt-5">Product not found</h3>;
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center">{product.name}</Card.Title>
          <Card.Text className="text-center text-muted">
            <strong>SKU:</strong> {product.sku} <br />
            <strong>Description:</strong> {product.description} <br />
            <strong>Category:</strong> {product.categoryId}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Link to="/products">
              <Button variant="secondary">🔙 Back to Products</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetails;
