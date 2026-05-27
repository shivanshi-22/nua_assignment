export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number; // 0 = sold out, 1-2 = low stock, 3+ = available
  sku: string;
}

export interface CartItem {
  productId: number;
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  color: string;
  size: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export interface SelectedVariant {
  color: string;
  size: string;
}
