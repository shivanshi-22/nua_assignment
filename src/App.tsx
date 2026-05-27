import { useEffect, useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { ProductInfoPanel } from './components/ProductInfoPanel';
import { ProductDetails } from './components/ProductDetails';
import { fetchAllProducts, getProductVariants, getProductImages } from './data/api';
import { useSelectedVariant } from './hooks/useProductState';
import type { Product, ProductVariant, SelectedVariant } from './data/types';
import { CartProvider } from './stores/CartContext';
import './styles/App.scss';

// No static PRODUCT_ID, will select first women's clothing product
const SALE_CONFIG = {
  originalPrice: 109.95,
  discountPercent: 15,
};

function AppContent() {
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse variant from URL or use default
  const [urlParams, setUrlParams] = useState<SelectedVariant | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const color = params.get('color');
    const size = params.get('size');
    if (color && size) {
      setUrlParams({ color, size });
    }
  }, []);

  const [selectedVariant, setSelectedVariant] = useSelectedVariant(variants, urlParams);

  // Fetch only women's clothing product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchAllProducts();
        const womensClothing = allProducts.find(p => p.category === "women's clothing");
        if (!womensClothing) throw new Error("No women's clothing products found");
        setProduct(womensClothing);

        const variantsData = getProductVariants(womensClothing.id);
        setVariants(variantsData);

        const imagesData = getProductImages(womensClothing);
        setImages(imagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  // Update URL when variant changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('color', selectedVariant.color);
    params.set('size', selectedVariant.size);
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [selectedVariant]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <main className="app-container">
      <div className="pdp-layout">
        {/* Left: Gallery */}
        <section className="gallery-section">
          <ImageGallery images={images} altText={product.title} />
        </section>

        {/* Right: Product Info */}
        <section className="info-section">
          <ProductInfoPanel
            product={product}
            variants={variants}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            onSale={{
              originalPrice: SALE_CONFIG.originalPrice,
              discountPercent: SALE_CONFIG.discountPercent,
            }}
          />
        </section>
      </div>

      {/* Product Details - Below Fold */}
      <ProductDetails product={product} />
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
