import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../store/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
  };

  return (
    <div className="product-card">
      <Link to={`/produtos/${product.id}`} className="product-card-link">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/300x300?text=Tenis';
          }}
        />
        <div className="product-card-info">
          <p className="product-card-brand">{product.brand}</p>
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          {!product.inStock && <span className="product-card-out-of-stock">Esgotado</span>}
        </div>
      </Link>
      {product.inStock && (
        <button className="product-card-btn" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
      )}
    </div>
  );
}
