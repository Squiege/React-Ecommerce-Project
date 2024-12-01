import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './NewCustomer.module.css';

// Page to create a new customer
const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const { customerId } = useParams(); 
    const navigate = useNavigate(); 

    // Get customer details if customerId is available
    useEffect(() => {
        if (customerId) {
            fetchCustomerDetails(customerId);
        }
    }, [customerId]);

    const fetchCustomerDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/customer/${id}`);
            setFormData({
                name: response.data.name,
                email: response.data.email,
                password: response.data.password
            });
        } catch (error) {
            console.error('Error fetching customer details:', error);
            alert('Error fetching customer details');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            if (customerId) {
                // Update customer
                await axios.put(`http://localhost:5000/updateCustomer/${customerId}`, formData);
                alert('Customer updated successfully!');
                navigate('/customers'); 
            } else {
                // Create new customer 
                await axios.post('http://localhost:5000/newCustomer', formData);
                alert('Customer successfully added!');
                setFormData({ name: '', email: '', password: '' }); 
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete customer
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:5000/deleteCustomer/${customerId}`);
                alert('Customer deleted successfully!');
                navigate('/customers');
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('There was an error deleting the customer.');
            }
        }
    };

    return (
        <Container className={`mt-5 ${styles['form-container']}`}>
            <h3 className={styles['form-title']}>{customerId ? 'Update Customer' : 'New Customer'}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="shadow" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : customerId ? 'Update Customer' : 'Submit'}
                </Button>

                {customerId && (
                    <Button variant="danger" className="ml-2" onClick={handleDelete} disabled={isSubmitting}>
                        Delete Customer
                    </Button>
                )}
            </Form>
        </Container>
    );
};

export default FormComponent;
