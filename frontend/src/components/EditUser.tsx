import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { fetchData } from "../services/api";
import { useUserContext } from "../context/UserContext";

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { updateUser } = useUserContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData(`customers/${userId}`).then((user) => {
      setName(user.name);
      setEmail(user.email);
    });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { customerId: userId as string, name, email };
    
    await fetchData(`customers/${userId}`, "PUT", updatedUser);
    updateUser(updatedUser); // Update context
    navigate("/users"); // Redirect after update
  };

  return (
    <Container className="mt-4">
      <h2>Edit User</h2>
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="warning" type="submit">✏️ Update User</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
