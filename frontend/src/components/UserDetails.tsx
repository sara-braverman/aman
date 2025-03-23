import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../services/api";
import { Card, Button, Spinner } from "react-bootstrap";
// import { FaUser } from "react-icons/fa";

interface User {
  customerId: string;
  name: string;
  email: string;
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId) {
      fetchData(`customers/${userId}`)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return <h3 className="text-center mt-5">User not found</h3>;
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-lg p-4">
        <div className="text-center">
          {/* <FaUser size={80} className="mb-3 text-primary" /> */}
        </div>
        <Card.Body>
          <Card.Title className="text-center">{user.name}</Card.Title>
          <Card.Text className="text-center text-muted">{user.email}</Card.Text>
          <div className="d-flex justify-content-center">
            <Link to="/users">
              <Button variant="secondary">Back to Users</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetails;
