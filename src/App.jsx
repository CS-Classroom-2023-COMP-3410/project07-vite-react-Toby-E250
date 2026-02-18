import { useState } from 'react';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [cart, setCart] = useState([]); // Shared cart state

    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'products':
                return <ProductsPage cart={cart} setCart={setCart} />;
            case 'profile':
                return <ProfilePage />;
            case 'cart':
                return <CartPage cart={cart} setCart={setCart} />;
            case 'home':
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Header currentPage={currentPage} onNavigate={handleNavigate} cart={cart} />

            {/* Mini cart visible on every page if there are items */}
            {cart.length > 0 && <ShoppingCart cart={cart} setCart={setCart} />}

            <main>
                {renderPage()}
            </main>

            <footer style={{
                marginTop: '50px',
                padding: '20px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                color: '#666'
            }}>
                <p>React Multi-Page Application</p>
            </footer>
        </div>
    );
}

export default App;
