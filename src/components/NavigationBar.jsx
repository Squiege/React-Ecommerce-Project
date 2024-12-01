import { Navbar, Nav } from 'react-bootstrap';

// Navigation Bar for each page
function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/newCustomer">New Customer</Nav.Link>
                    <Nav.Link href="/allCustomers">All Customers</Nav.Link>
                    <Nav.Link href="/allProducts">All Products</Nav.Link>
                    <Nav.Link href="/createProduct">Create Product</Nav.Link>
                    <Nav.Link href="/newOrder">New Order</Nav.Link>
                    <Nav.Link href="/allOrders">All Orders</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;