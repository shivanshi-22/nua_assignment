import type { Product, ProductVariant } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProduct = async (productId: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) throw new Error(`Failed to fetch product ${productId}`);
  return response.json();
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// Mock variant data — in a real app, this would come from your backend
export const getProductVariants = (productId: number): ProductVariant[] => {
  const colors = ['Black', 'Navy', 'Olive', 'Gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const variants: ProductVariant[] = [];

  colors.forEach((color, colorIdx) => {
    sizes.forEach((size, sizeIdx) => {
      // Simulate varying stock levels
      const stock = Math.floor(Math.random() * 5);
      variants.push({
        id: `${productId}-${color}-${size}`,
        color,
        size,
        stock,
        sku: `SKU-${productId}-${colorIdx}-${sizeIdx}`,
      });
    });
  });

  return variants;
};

// Mock gallery images — in a real app, product would have multiple images from API

// Returns a set of different images for the gallery (simulate multiple images per product)
export const getProductImages = (product: Product): string[] => {
  // Use the main image and add some variations using placeholder image services
  const base = product.image;
  // Use Unsplash or Lorem Picsum for variety, fallback to product.image
  return [
    base,
    `https://source.unsplash.com/400x400/?product,${encodeURIComponent(product.title)}`,
    `https://picsum.photos/seed/${product.id + 10}/400/400`,
    `https://placeimg.com/400/400/tech?id=${product.id}`
  ];
};

// Mock reviews — in a real app, this would come from your backend
export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
}

export const getProductReviews = (_productId: number): Review[] => [
  {
    id: '1',
    author: 'Alex K.',
    rating: 5,
    title: 'Excellent quality!',
    text: 'Exceeded my expectations. The material is premium and the fit is perfect. Highly recommend this product.',
    date: '2024-05-20',
  },
  {
    id: '2',
    author: 'Jordan M.',
    rating: 4,
    title: 'Great product, minor issue',
    text: 'Love the design and functionality. Only minor complaint is the packaging could be better.',
    date: '2024-05-15',
  },
  {
    id: '3',
    author: 'Sam T.',
    rating: 5,
    title: 'Perfect for outdoor adventures',
    text: 'Exactly what I was looking for. Durable, well-made, and stylish. Will definitely buy again.',
    date: '2024-05-10',
  },
];
