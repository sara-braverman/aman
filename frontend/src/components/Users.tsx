import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Users: React.FC = () => {
  const { users, deleteUser } = useUserContext();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>

      <Link to="/add-user">
        <Button variant="success" className="mb-3 px-4">➕ Add User</Button>
      </Link>

      <div className="row">
        {users?.map((user) => (
          <div key={user.customerId} className="col-md-4 mb-3">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <Card.Title className="fw-bold">{user.name}</Card.Title>
                <Card.Text className="text-muted">
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                
                <div className="d-flex justify-content-between">
                  <Link to={`/users/${user.customerId}`}>
                    <Button variant="secondary" className="px-3">👤 View</Button>
                  </Link>
                  <Link to={`/edit-user/${user.customerId}`}>
                    <Button variant="warning" className="px-3">✏️ Edit</Button>
                  </Link>
                  <Button 
                    variant="outline-danger" 
                    className="px-3" 
                    onClick={() => deleteUser(user.customerId)}
                  >
                    ❌ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
