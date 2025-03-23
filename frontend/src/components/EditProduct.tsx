import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useProductContext } from "../context/ProductContext";
import { useCategoryContext } from "../context/CategoryContext";

const EditProduct: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const { updateProduct } = useProductContext();
  const { categories } = useCategoryContext(); // Get categories from context
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (sku) {
      fetchData(`products/${sku}`).then((product) => {
        setName(product.name);
        setDescription(product.description);
        setCategoryId(product.categoryId);
      });
    }
  }, [sku]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = { sku: sku as string, name, description, categoryId };

    await fetchData(`products/${sku}`, "PUT", updatedProduct);
    updateProduct(updatedProduct);
    navigate("/products");
  };

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="warning" type="submit">✏️ Update Product</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
