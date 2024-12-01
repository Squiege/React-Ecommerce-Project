import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import styles from './NewCustomer.module.css';

// Page to create a new order
const NewOrder = () => {
    const [formData, setFormData] = useState({
        product_id: '',
        customer_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Sends data user inputted to the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/newOrder', formData);
            console.log('Order created:', response.data);
            alert('Order created successfully!');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('There was an error creating the order.');
        }
    };

    return (
        <Container className={`mt-5 ${styles['form-container']}`}>
            <h3 className={styles['form-title']}>New Order</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='orderProductName' className='mb-3'>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Product ID'
                        name='product_id'
                        value={formData.product_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='orderAccountName' className='mb-3'>
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Customer ID'
                        name='customer_id'
                        value={formData.customer_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant='primary' type='submit' className='shadow'>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default NewOrder;
