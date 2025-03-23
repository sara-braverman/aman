import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { fetchData } from "../services/api";

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categoryId) {
      fetchData(`categories/${categoryId}`).then(setCategory);
    }
  }, [categoryId]);

  if (!category) return <Container>Loading...</Container>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{category.name}</Card.Title>
          <Card.Text>{category.description}</Card.Text>
          <Link to="/categories" className="btn btn-secondary">🔙 Back to Categories</Link>
          <Link to={`/edit-category/${category.categoryId}`} className="btn btn-warning ms-2">✏️ Edit</Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CategoryDetails;
