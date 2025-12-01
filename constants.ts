import { Product, Category } from './types';

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'hat', label: 'Sombreros' },
  { id: 'shirt', label: 'Camisas' },
  { id: 'jeans', label: 'Pantalones' },
  { id: 'belt', label: 'Cinturones' },
  { id: 'boots', label: 'Botas' },
];

export const CATALOGUE: Product[] = [
  // HATS
  {
    id: 'hat-1',
    category: 'hat',
    brand: 'Stetson',
    name: 'Skyline 6X',
    price: 4500,
    image: 'https://picsum.photos/200/200?random=1',
    description: 'Sombrero vaquero Stetson Skyline 6X color plata, fieltro de alta calidad',
  },
  {
    id: 'hat-2',
    category: 'hat',
    brand: 'Resistol',
    name: 'George Strait',
    price: 5200,
    image: 'https://picsum.photos/200/200?random=2',
    description: 'Sombrero Resistol colección George Strait, paja tejida fina, color natural',
  },
  {
    id: 'hat-3',
    category: 'hat',
    brand: 'Ariat',
    name: 'Wool Felt Hat',
    price: 2800,
    image: 'https://picsum.photos/200/200?random=3',
    description: 'Sombrero Ariat de lana negra con banda decorativa de cuero',
  },

  // SHIRTS
  {
    id: 'shirt-1',
    category: 'shirt',
    brand: 'Ariat',
    name: 'Pro Series Team',
    price: 1800,
    image: 'https://picsum.photos/200/200?random=4',
    description: 'Camisa vaquera Ariat Pro Series, botones a presión, color azul y blanco a cuadros, corte clásico',
  },
  {
    id: 'shirt-2',
    category: 'shirt',
    brand: 'Wrangler',
    name: 'Checotah Snap',
    price: 1500,
    image: 'https://picsum.photos/200/200?random=5',
    description: 'Camisa Wrangler estilo Checotah con estampado tribal occidental en tonos rojos y turquesa',
  },
  {
    id: 'shirt-3',
    category: 'shirt',
    brand: 'Cinch',
    name: 'Solid Black Western',
    price: 1650,
    image: 'https://picsum.photos/200/200?random=6',
    description: 'Camisa Cinch negra sólida, botones negros, estilo elegante y moderno',
  },

  // JEANS
  {
    id: 'jeans-1',
    category: 'jeans',
    brand: 'Wrangler',
    name: 'Cowboy Cut 13MWZ',
    price: 1200,
    image: 'https://picsum.photos/200/200?random=7',
    description: 'Pantalones vaqueros Wrangler Cowboy Cut originales, color índigo rígido',
  },
  {
    id: 'jeans-2',
    category: 'jeans',
    brand: 'Ariat',
    name: 'M4 Low Rise',
    price: 1900,
    image: 'https://picsum.photos/200/200?random=8',
    description: 'Jeans Ariat M4 corte bota, lavado medio con costuras reforzadas',
  },
  {
    id: 'jeans-3',
    category: 'jeans',
    brand: 'Rock & Roll Denim',
    name: 'Double Barrel',
    price: 2100,
    image: 'https://picsum.photos/200/200?random=9',
    description: 'Jeans Rock & Roll Denim, lavado oscuro, corte recto relajado',
  },

  // BELTS
  {
    id: 'belt-1',
    category: 'belt',
    brand: 'Nocona',
    name: 'Western Floral',
    price: 950,
    image: 'https://picsum.photos/200/200?random=10',
    description: 'Cinturón de cuero Nocona con grabado floral y hebilla plateada grande',
  },
  {
    id: 'belt-2',
    category: 'belt',
    brand: 'Ariat',
    name: 'Classic Roller',
    price: 1100,
    image: 'https://picsum.photos/200/200?random=11',
    description: 'Cinturón de cuero marrón oscuro Ariat, diseño liso y robusto',
  },

  // BOOTS
  {
    id: 'boots-1',
    category: 'boots',
    brand: 'Ariat',
    name: 'Heritage Roper',
    price: 3800,
    image: 'https://picsum.photos/200/200?random=12',
    description: 'Botas vaqueras Ariat Heritage Roper, cuero color tierra envejecido',
  },
  {
    id: 'boots-2',
    category: 'boots',
    brand: 'Lucchese',
    name: 'Ostrich Leg',
    price: 8500,
    image: 'https://picsum.photos/200/200?random=13',
    description: 'Botas Lucchese de piel de avestruz color coñac, punta cuadrada',
  },
  {
    id: 'boots-3',
    category: 'boots',
    brand: 'Justin',
    name: 'Stampede',
    price: 3200,
    image: 'https://picsum.photos/200/200?random=14',
    description: 'Botas Justin Stampede, cuero negro con bordados en la caña',
  },
];