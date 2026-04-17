import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contatos">
      <h4>JOÃO BRANCO</h4>
      <h3>Redes Sociais</h3>
      <div className="social">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img src="/src/images/img-logos/Facebook.jpg" alt="Logo do Facebook" />
        </a>
        <a href="https://www.instagram.com/joaovitorbrancoo/" target="_blank" rel="noreferrer">
          <img src="/src/images/img-logos/instagram.png" alt="Logo do Instagram" />
        </a>
        <a href="mailto:jvitor5343@gmail.com">
          <img src="/src/images/img-logos/gmail.png" alt="Gmail" className="gmail-logo" />
        </a>
      </div>
    </footer>
  );
}
