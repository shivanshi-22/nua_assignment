import React, { useState } from 'react';
import type { Product } from '../data/types';
import { getProductReviews } from '../data/api';
import styles from '../styles/ProductDetails.module.scss';

interface ProductDetailsProps {
  product: Product;
}

type TabType = 'description' | 'specs' | 'reviews';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const reviews = getProductReviews(product.id);

  const specifications = [
    { key: 'Category', value: product.category },
    { key: 'Material', value: 'Premium outdoor fabric' },
    { key: 'Weight', value: '500g' },
    { key: 'Waterproof', value: 'Yes' },
    { key: 'Breathable', value: 'Yes' },
    { key: 'Warranty', value: '2 years' },
  ];

  return (
    <div className={styles.detailsContainer}>
      {/* Tabs */}
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'specs' ? styles.active : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Specifications
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className={styles.description}>
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <h4>Why Choose This Product?</h4>
            <ul>
              <li>Premium quality materials sourced responsibly</li>
              <li>Designed for durability and long-term use</li>
              <li>Perfect for outdoor enthusiasts</li>
              <li>Backed by excellent customer service</li>
            </ul>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specs' && (
          <div className={styles.specifications}>
            <h3>Specifications</h3>
            <table className={styles.specsTable}>
              <tbody>
                {specifications.map((spec) => (
                  <tr key={spec.key}>
                    <td className={styles.specKey}>{spec.key}</td>
                    <td className={styles.specValue}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className={styles.reviews}>
            <h3>Customer Reviews</h3>
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div>
                      <p className={styles.author}>{review.author}</p>
                      <div className={styles.rating}>
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <span className={styles.date}>{review.date}</span>
                  </div>
                  <h4 className={styles.reviewTitle}>{review.title}</h4>
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
