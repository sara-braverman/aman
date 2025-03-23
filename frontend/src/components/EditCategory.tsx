import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useCategoryContext } from "../context/CategoryContext";

const EditCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { updateCategory } = useCategoryContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (categoryId) {
      fetchData(`categories/${categoryId}`).then((category) => {
        setName(category.name);
        setDescription(category.description);
      });
    }
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = { categoryId: categoryId as string, name, description };

    await fetchData(`categories/${categoryId}`, "PUT", updatedCategory);
    updateCategory(updatedCategory); // Update context
    navigate("/categories"); // Redirect after update
  };

  return (
    <Container className="mt-4">
      <h2>Edit Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        <Button variant="warning" type="submit">✏️ Update Category</Button>
      </Form>
    </Container>
  );
};

export default EditCategory;
