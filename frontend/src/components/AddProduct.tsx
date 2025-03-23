import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useProductContext } from "../context/ProductContext";
import { useCategoryContext } from "../context/CategoryContext";

const AddProduct: React.FC = () => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { addProduct } = useProductContext();
  const { categories } = useCategoryContext(); // Get categories
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { sku, name, description, categoryId };
    const response = await fetchData("products", "POST", newProduct);

    if (response) {
      addProduct(newProduct);
      navigate("/products");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </Form.Group>
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
        <Button variant="success" type="submit">➕ Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
