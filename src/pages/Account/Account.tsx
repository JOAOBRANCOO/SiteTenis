import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Minha Conta</h1>
        {user && (
          <div className="account-info">
            <div className="account-avatar">
              {(user.displayName ?? user.email)[0].toUpperCase()}
            </div>
            <h2>{user.displayName ?? 'Usuário'}</h2>
            <p className="account-email">{user.email}</p>
            <div className="account-section">
              <h3>Meus Pedidos</h3>
              <p className="placeholder-text">Nenhum pedido encontrado. (Em breve)</p>
            </div>
            <button className="account-signout-btn" onClick={() => { void handleSignOut(); }}>
              Sair da Conta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
