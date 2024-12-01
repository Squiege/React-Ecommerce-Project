import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../api'; 

// All customers page
const ReadCustomer = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Gets all the customers from the database
    const fetchCustomers = async () => {
        try {
            const response = await api.get('/allCustomers');
            console.log('API Response:', response.data);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Functionality to delete a customer
    const deleteCustomer = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await api.delete(`/deleteCustomer/${customerId}`);
                setCustomers(customers.filter(customer => customer.id !== customerId));
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    useEffect(() => {
        console.log('Customer state updated:', customers);
    }, [customers]);

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                {customers.map((customer, index) => (
                    <li key={customer.id || index} className="d-flex align-items-center">
                        <strong>Name:</strong> {customer.name || 'No Name'} - <strong>Email:</strong> {customer.email || 'No Email'}
                        
                        <Link 
                            to={`/updateCustomer/${customer.id}`} 
                            className="btn btn-primary btn-sm ml-3"
                        >
                            Update
                        </Link>

                        <button 
                            onClick={() => deleteCustomer(customer.id)} 
                            className="btn btn-danger btn-sm ml-3"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadCustomer;
