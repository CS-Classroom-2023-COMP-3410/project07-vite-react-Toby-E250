import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ShoppingCart from '../components/ShoppingCart';

function ProductsPage({ cart, setCart }) {
    const initialProducts = [
        { id: 1, title: 'Smartphone', description: 'Latest model with advanced features', price: 699, stock: 15, imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone' },
        { id: 2, title: 'Laptop', description: 'Powerful laptop for work and gaming', price: 1299, stock: 8, imageUrl: 'https://via.placeholder.com/300x150?text=Laptop' },
        { id: 3, title: 'Headphones', description: 'Noise-cancelling wireless headphones', price: 249, stock: 23, imageUrl: 'https://via.placeholder.com/300x150?text=Headphones' },
        { id: 4, title: 'Smartwatch', description: 'Fitness tracking and notifications', price: 199, stock: 12, imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch' }
    ];

    const [products, setProducts] = useState(initialProducts);
    const [sortBy, setSortBy] = useState('default');

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return a.id - b.id;
    });

    const addToCart = (product) => {
        if (product.stock <= 0) return;

        setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        setProducts(products.map(p => p.id === productId ? { ...p, stock: p.stock + 1 } : p));

        if (item.quantity > 1) {
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
        } else {
            setCart(cart.filter(item => item.id !== productId));
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Products Page</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <label htmlFor="sort-select" style={{ marginRight: '10px' }}>Sort by:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '5px' }}
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name</option>
                    </select>
                </div>

                <div>
                    <strong>Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</strong>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: '1', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {sortedProducts.map(product => (
                        <Card
                            key={product.id}
                            title={product.title}
                            description={`${product.description} - $${product.price}`}
                            imageUrl={product.imageUrl}
                            actions={[
                                {
                                    label: `Add to Cart ($${product.price})`,
                                    onClick: () => addToCart(product),
                                    variant: product.stock > 0 ? 'primary' : 'secondary',
                                    disabled: product.stock <= 0
                                }
                            ]}
                        >
                            <p>In stock: {product.stock}</p>
                        </Card>
                    ))}
                </div>

                {cart.length > 0 && <ShoppingCart cart={cart} setCart={setCart} />}
            </div>
        </div>
    );
}

export default ProductsPage;
