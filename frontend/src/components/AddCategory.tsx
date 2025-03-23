import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useCategoryContext } from "../context/CategoryContext";

const AddCategory: React.FC = () => {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addCategory } = useCategoryContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = { categoryId, name, description };
    const response = await fetchData("categories", "POST", newCategory);

    if (response) {
      addCategory(newCategory);
      navigate("/categories");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Category ID</Form.Label>
          <Form.Control type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        <Button variant="success" type="submit">➕ Add Category</Button>
      </Form>
    </Container>
  );
};

export default AddCategory;
