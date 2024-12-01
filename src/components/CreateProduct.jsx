import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import styles from './NewCustomer.module.css';

// Page to create a new product
const NewProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        details: '',
        price: ''
    });
    const { productId } = useParams(); 
    const navigate = useNavigate();

    // Autofill details when editting
    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId); 
        }
    }, [productId]);

    // Get product details for editing
    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/product/${id}`);
            setFormData({
                name: response.data.name,
                details: response.data.details,
                price: response.data.price
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission for create and update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productId) {
            updateProduct(productId); 
        } else {
            createProduct(); 
        }
    };

    // Create new product
    const createProduct = async () => {
        try {
            await axios.post('http://localhost:5000/newProduct', formData);
            alert('Product successfully added!');
            navigate('/allProducts');  
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Update product
    const updateProduct = async (id) => {
        try {
            await axios.put(`http://localhost:5000/updateProduct/${id}`, formData);
            alert('Product successfully updated!');
            navigate('/allProducts'); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container className={`mt-5 ${styles['form-container']}`}>
            <h3>{productId ? 'Update Product' : 'Create Product'}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName" className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter Product Name" 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="productDetails" className="mb-3">
                    <Form.Label>Product Details</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="details" 
                        value={formData.details} 
                        onChange={handleChange} 
                        placeholder="Enter Product Details" 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="productPrice" className="mb-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="Enter Product Price" 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {productId ? 'Update' : 'Create'} Product
                </Button>
            </Form>
        </Container>
    );
};

export default NewProduct;
