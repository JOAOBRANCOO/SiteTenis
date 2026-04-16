import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import { Product } from '../../types/product';
import './Home.css';

const products = productsData as Product[];
const featuredProducts = products.filter(p => p.featured);

const brands = [
  {
    name: 'ADIDAS',
    image: '/src/images/img-tenis/adidas.jpg',
    description: 'Fundada em 1949 por Adolf Dassler, a Adidas é uma das marcas mais icônicas do mundo dos esportes e da moda. Reconhecida pelo seu logotipo de três listras, a empresa se destaca por unir tecnologia de ponta, desempenho atlético e design moderno em seus produtos...',
    slug: 'Adidas',
  },
  {
    name: 'NIKE',
    image: '/src/images/img-tenis/WhatsApp Image 2024-11-23 at 03.18.50(1).jpeg',
    description: 'A Nike, fundada em 1964 por Bill Bowerman e Phil Knight, é sinônimo de inovação, desempenho e estilo. Com seu icônico logotipo "swoosh" e o slogan "Just Do It", a marca se consolidou como líder no universo dos esportes e da moda...',
    slug: 'Nike',
  },
  {
    name: 'NEW BALANCE',
    image: '/src/images/img-tenis/New Balance.jpg',
    description: 'A New Balance, fundada em 1906, é uma das principais marcas no segmento de tênis esportivos, especialmente no mundo da corrida. A marca é reconhecida pela qualidade de seus produtos, que combinam conforto, estabilidade e tecnologia de ponta...',
    slug: 'New Balance',
  },
  {
    name: 'MIZUNO',
    image: '/src/images/img-tenis/a3aefb053aadff4c316368994afd8eb6.jpg',
    description: 'A Mizuno, fundada no Japão em 1906, é uma marca conhecida por sua precisão na engenharia de tênis de alta performance. A empresa é famosa por criar produtos que combinam tecnologia avançada com uma grande tradição esportiva...',
    slug: 'Mizuno',
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Maiores lançamentos históricos de tênis</h2>
          <p>Aproveite os melhores descontos</p>
          <Link to="/produtos" className="hero-btn">Ver Produtos</Link>
        </div>
      </section>

      <section className="home-section" id="produtos">
        <div className="container">
          <div className="section-title">
            <h2>Tênis em Destaque</h2>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/produtos" className="btn-outline">Ver todos os produtos</Link>
          </div>
        </div>
      </section>

      <section className="home-section brands-section" id="servicos">
        <div className="container">
          <div className="section-title">
            <h2>Nossas Marcas</h2>
          </div>
          <div className="brands-grid">
            {brands.map(brand => (
              <div key={brand.name} className="brand-item">
                <h3>{brand.name}</h3>
                <img
                  src={brand.image}
                  alt={`Tênis ${brand.name}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/300x200?text=${brand.name}`;
                  }}
                />
                <p>{brand.description}</p>
                <Link to={`/produtos?brand=${encodeURIComponent(brand.slug)}`} className="btn-know-more">Ver Produtos</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
