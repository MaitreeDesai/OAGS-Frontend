import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, Spinner, Alert } from 'react-bootstrap';

const CategoriesView = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/listCategory`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/deleteCategory/${categoryId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }
                setCategories(categories.filter(category => category._id !== categoryId));
            } catch (error) {
                console.error("Error deleting category:", error);
                setError(error.message);
            }
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category_name: newCategory }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            const data = await response.json();
            setCategories([...categories, data.category]);
            setNewCategory('');
        } catch (error) {
            console.error("Error adding category:", error);
            setError(error.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center mb-4">
                <Col md={8}>
                    <h2 className="text-center mb-3" style={{ color: 'black' }}>Manage Categories</h2>
                    <Button variant="dark" onClick={() => navigate(-1)} className="mb-4">
                        Go Back
                    </Button>
                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" variant="dark" />
                        </div>
                    )}
                    {error && <Alert variant="danger">Error: {error}</Alert>}
                    <Form onSubmit={handleAddCategory} className="p-4 shadow-sm rounded" style={{ backgroundColor: 'white' }}>
                        <Form.Group controlId="newCategory">
                            <Form.Label style={{ color: 'black' }}>New Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                required
                                style={{ borderColor: 'black' }}
                            />
                        </Form.Group>
                        <Button type="submit" variant="dark" className="mt-3 w-100">
                            Add Category
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {categories.map((category) => (
                    <Col md={4} className="mb-4" key={category._id}>
                        <Card className="h-100 shadow-sm" style={{ borderColor: 'black' }}>
                            <Card.Body className="text-center" style={{ backgroundColor: 'white' }}>
                                <Card.Title style={{ color: 'black' }}>{category.category_name}</Card.Title>
                                <Button
                                    variant="outline-danger"
                                    className="mt-3 w-100"
                                    onClick={() => handleDelete(category._id)}
                                    style={{ color: 'red', borderColor: 'red' }}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CategoriesView;