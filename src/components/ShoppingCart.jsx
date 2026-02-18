import Button from './Button';

function ShoppingCart({ cart, setCart }) {
    const removeFromCart = (id) => {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        if (item.quantity > 1) {
            setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
        } else {
            setCart(cart.filter(i => i.id !== id));
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div style={{ width: '300px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', alignSelf: 'flex-start' }}>
            <h3>Shopping Cart</h3>
            {cart.length === 0 ? <p>Your cart is empty</p> : (
                <>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        {cart.map(item => (
                            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                                <div>
                                    <strong>{item.title}</strong> × {item.quantity}
                                    <div>${item.price * item.quantity}</div>
                                </div>
                                <Button onClick={() => removeFromCart(item.id)} variant="danger">−</Button>
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '15px', padding: '10px 0', borderTop: '2px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Total:</strong>
                        <strong>${totalPrice}</strong>
                    </div>

                    <Button onClick={() => alert(`Checkout completed for $${totalPrice}!`)} variant="success" style={{ width: '100%', marginTop: '10px' }}>
                        Checkout
                    </Button>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;
