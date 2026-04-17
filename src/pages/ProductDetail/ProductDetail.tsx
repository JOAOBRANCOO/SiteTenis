import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import { Product } from '../../types/product';
import { useCart } from '../../store/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = (productsData as Product[]).find(p => p.id === id || p.slug === id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/produtos')}>Voltar aos produtos</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image-section">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-detail-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/500x400?text=Tenis';
            }}
          />
        </div>
        <div className="product-detail-info">
          <p className="product-detail-brand">{product.brand}</p>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="product-detail-status">
            {product.inStock ? (
              <span className="in-stock">✓ Em estoque</span>
            ) : (
              <span className="out-of-stock">✗ Esgotado</span>
            )}
          </p>
          <div className="product-detail-sizes">
            <p className="sizes-label">Tamanho:</p>
            <div className="sizes-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {product.inStock && (
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={added}>
              {added ? '✓ Adicionado ao carrinho!' : 'Adicionar ao carrinho'}
            </button>
          )}
          <div className="product-detail-description">
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>
          <button className="back-btn" onClick={() => navigate('/produtos')}>
            ← Voltar ao catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
