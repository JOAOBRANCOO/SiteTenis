import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import { Product } from '../../types/product';
import './Products.css';

const allProducts = productsData as Product[];
const brands = ['Todos', ...Array.from(new Set(allProducts.map(p => p.brand)))];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const brandFilter = searchParams.get('brand') ?? 'Todos';

  const filtered = allProducts.filter(p => {
    const matchesBrand = brandFilter === 'Todos' || p.brand === brandFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const setBrand = (brand: string) => {
    if (brand === 'Todos') {
      setSearchParams({});
    } else {
      setSearchParams({ brand });
    }
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Catálogo de Tênis</h1>
        <p>Encontre o par perfeito para você</p>
      </div>
      <div className="products-container">
        <aside className="products-sidebar">
          <h3>Marcas</h3>
          <ul className="brand-filter">
            {brands.map(brand => (
              <li key={brand}>
                <button
                  className={`brand-btn ${brandFilter === brand ? 'active' : ''}`}
                  onClick={() => setBrand(brand)}
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="products-main">
          <div className="products-search">
            <input
              type="text"
              placeholder="Buscar tênis..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <p className="products-count">{filtered.length} produto(s) encontrado(s)</p>
          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <p>Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
