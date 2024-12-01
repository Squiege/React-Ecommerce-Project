import { useState, useEffect } from 'react';
import axios from 'axios';

// Shows all orders page
const ReadOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    // Gets all the orders from the database
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/allOrders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <strong>Order ID:</strong> {order.id},  <strong>Product ID:</strong> {order.product_id}, <strong>Customer ID:</strong> {order.customer_id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReadOrders;
