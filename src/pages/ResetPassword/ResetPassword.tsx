import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import './ResetPassword.css';

export default function ResetPassword() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <div className="reset-header">
          <h1>Redefinir Senha</h1>
          <p>Informe seu e-mail para receber as instruções</p>
        </div>
        {sent ? (
          <div className="reset-success">
            <div className="reset-success-icon">✉</div>
            <h2>E-mail enviado!</h2>
            <p>Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.</p>
            <Link to="/login" className="reset-back-btn">Voltar ao Login</Link>
          </div>
        ) : (
          <form className="reset-form" onSubmit={handleSubmit}>
            <div className="reset-field">
              <label htmlFor="reset-email">E-mail</label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
              />
            </div>
            {error && <p className="reset-error">{error}</p>}
            <button type="submit" className="reset-btn" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar instruções'}
            </button>
            <div className="reset-links">
              <Link to="/login">← Voltar ao login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
