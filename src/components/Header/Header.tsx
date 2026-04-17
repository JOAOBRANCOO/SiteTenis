import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useAuth } from '../../store/AuthContext';
import './Header.css';

export default function Header() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">JOÃO BRANCO</h1>
        </Link>
        <nav className="nav">
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/produtos" onClick={() => setMenuOpen(false)}>Produtos</NavLink></li>
            <li>
              <NavLink to="/carrinho" className="cart-link" onClick={() => setMenuOpen(false)}>
                Carrinho
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </NavLink>
            </li>
            {user ? (
              <>
                <li><NavLink to="/conta" onClick={() => setMenuOpen(false)}>Minha Conta</NavLink></li>
                <li>
                  <button className="nav-btn" onClick={() => { void signOut(); setMenuOpen(false); }}>
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
