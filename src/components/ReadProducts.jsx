import { useState, useEffect } from 'react';
import api from '../api';

// All Products Page
const ReadProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Gets data for all products from database
    const fetchProducts = async () => {
        try {
            const response = await api.get('/allProducts');
            // API data in console
            console.log('API Response:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Functionality to delete a product
    const deleteProduct = async (productId) => {
        try {
            await api.delete(`/deleteProduct/${productId}`);
            // Remove deleted product from the state
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <strong>Product Name:</strong> {product.name} - 
                        <strong>Product Details:</strong> {product.details} - 
                        <strong>Product Price:</strong> ${product.price} 
                        <button onClick={() => deleteProduct(product.id)} className="btn btn-danger btn-sm fs-6">
                        Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadProducts;
