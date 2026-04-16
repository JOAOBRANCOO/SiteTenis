export interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  sizes: number[];
  category: string;
  inStock: boolean;
  featured: boolean;
}
