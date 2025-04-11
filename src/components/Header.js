import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { itemCount } = useCart();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!token) return null;

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">
          Cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;