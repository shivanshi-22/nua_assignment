import React, { useState } from 'react';
import type { Product, ProductVariant, SelectedVariant } from '../data/types';
import { useCart } from '../stores/CartContext';
import styles from '../styles/ProductInfoPanel.module.scss';

interface ProductInfoPanelProps {
  product: Product;
  variants: ProductVariant[];
  selectedVariant: SelectedVariant;
  onVariantChange: (variant: SelectedVariant) => void;
  onSale?: {
    originalPrice: number;
    discountPercent: number;
  };
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  product,
  variants,
  selectedVariant,
  onVariantChange,
  onSale,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Get available colors and sizes
  const colors = Array.from(new Set(variants.map((v) => v.color)));
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  // Find selected variant details
  const variantDetails = variants.find(
    (v) => v.color === selectedVariant.color && v.size === selectedVariant.size
  );

  const isOutOfStock = !variantDetails || variantDetails.stock === 0;

  const maxQuantity = variantDetails?.stock || 0;

  const handleAddToCart = () => {
    if (variantDetails && !isOutOfStock && quantity > 0) {
      addToCart({
        productId: product.id,
        variantId: variantDetails.id,
        quantity,
        title: product.title,
        price: onSale
          ? product.price * ((100 - onSale.discountPercent) / 100)
          : product.price,
        color: selectedVariant.color,
        size: selectedVariant.size,
      });
      setQuantity(1); // Reset quantity after adding to cart
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={styles.panel}>
      {/* Brand and Title */}
      <div className={styles.header}>
        <p className={styles.brand}>{product.category.toUpperCase()}</p>
        <h1 className={styles.title}>{product.title}</h1>
      </div>

      {/* Rating */}
      {product.rating && (
        <div className={styles.rating}>
          <span className={styles.stars}>{'★'.repeat(Math.round(product.rating.rate))}</span>
          <span className={styles.count}>({product.rating.count} reviews)</span>
        </div>
      )}

      {/* Price */}
      <div className={styles.priceSection}>
        {onSale ? (
          <>
            <span className={styles.salePrice}>
              ${(product.price * ((100 - onSale.discountPercent) / 100)).toFixed(2)}
            </span>
            <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
            <span className={styles.discount}>-{onSale.discountPercent}%</span>
          </>
        ) : (
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Color Swatches */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Colour</label>
        <div className={styles.swatches}>
          {colors.map((color) => (
            <button
              key={color}
              className={`${styles.swatch} ${selectedVariant.color === color ? styles.active : ''}`}
              onClick={() => onVariantChange({ ...selectedVariant, color })}
              title={color}
              style={{ backgroundColor: color.toLowerCase() }}
            >
              {selectedVariant.color === color && <span className={styles.checkmark}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Size Buttons */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Size</label>
        <div className={styles.sizes}>
          {sizes.map((size) => {
            const sizeVariant = variants.find(
              (v) => v.color === selectedVariant.color && v.size === size
            );
            const sizeOutOfStock = !sizeVariant || sizeVariant.stock === 0;
            const sizeLowStock = sizeVariant && sizeVariant.stock > 0 && sizeVariant.stock <= 2;

            return (
              <button
                key={size}
                className={`${styles.sizeButton} ${selectedVariant.size === size ? styles.active : ''} ${sizeOutOfStock ? styles.outOfStock : ''}`}
                onClick={() => !sizeOutOfStock && onVariantChange({ ...selectedVariant, size })}
                disabled={sizeOutOfStock}
                title={sizeOutOfStock ? 'Out of Stock' : ''}
              >
                <span>{size}</span>
                {sizeLowStock && <span className={styles.badge}>Only {sizeVariant.stock} left</span>}
                {sizeOutOfStock && <span className={styles.badge}>Sold Out</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Picker */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Quantity</label>
        <div className={styles.quantityPicker}>
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className={styles.quantityButton}
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= maxQuantity) {
                setQuantity(val);
              }
            }}
            className={styles.quantityInput}
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxQuantity}
            className={styles.quantityButton}
          >
            +
          </button>
        </div>
        {variantDetails && variantDetails.stock < 10 && variantDetails.stock > 0 && (
          <p className={styles.stockWarning}>Only {variantDetails.stock} available</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        className={`${styles.addToCartButton} ${isOutOfStock ? styles.disabled : ''}`}
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>

      {/* Delivery Estimate */}
      {!isOutOfStock && (
        <div className={styles.deliveryEstimate}>
          <span>🚚 Free delivery on orders over $50</span>
          <span>Estimated delivery: 3-5 business days</span>
        </div>
      )}
    </div>
  );
};
