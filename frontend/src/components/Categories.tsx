import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { useCategoryContext } from "../context/CategoryContext";

const Categories: React.FC = () => {
  const { categories, deleteCategory } = useCategoryContext();

  return (
    <Container className="mt-4">
      <h2>Categories</h2>
      <Link to="/add-category" className="btn btn-success mb-3">➕ Add Category</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to={`/categories/${category.categoryId}`} className="btn btn-primary me-2">🔍 View</Link>
                <Link to={`/edit-category/${category.categoryId}`} className="btn btn-warning me-2">✏️ Edit</Link>
                <Button variant="outline-danger" onClick={() => deleteCategory(category.categoryId)}>🗑️ Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Categories;
