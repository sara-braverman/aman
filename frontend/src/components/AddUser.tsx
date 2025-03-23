import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useUserContext } from "../context/UserContext"; // Import context

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState("");
  const { addUser } = useUserContext(); // Get addUser function from context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { customerId, name, email };

    const response = await fetchData("customers", "POST", newUser);

    if (response) {
      addUser(newUser); // Update users in context immediately
      navigate("/users"); // Redirect back to Users page
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Identity</Form.Label>
          <Form.Control
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Add User
        </Button>
      </Form>
    </Container>
  );
};

export default AddUser;
