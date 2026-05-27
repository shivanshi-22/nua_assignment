import React, { useState } from 'react';
import { useImageZoom } from '../hooks/useProductState';
import styles from '../styles/ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { zoomed, setZoomed, position, handleMouseMove } = useImageZoom();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleThumbnailScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    e.preventDefault();
    const newScroll = scrollPosition + e.deltaY;
    setScrollPosition(Math.max(0, Math.min(newScroll, container.scrollWidth - container.clientWidth)));
    container.scrollLeft = newScroll;
  };

  return (
    <div className={styles.gallery}>
      {/* Primary Image */}
      <div
        className={`${styles.primaryImageContainer} ${zoomed ? styles.zoomed : ''}`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[activeIndex]}
          alt={altText}
          className={styles.primaryImage}
          style={
            zoomed
              ? {
                  transformOrigin: `${position.x}% ${position.y}%`,
                  transform: 'scale(2)',
                }
              : {}
          }
        />
      </div>

      {/* Thumbnails - Desktop */}
      <div className={`${styles.thumbnailsContainer} ${styles.desktop}`}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`${altText} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* Thumbnails - Mobile with scroll and dot indicator */}
      <div className={`${styles.thumbnailsContainer} ${styles.mobile}`}>
        <div
          className={styles.thumbnailScroll}
          onWheel={handleThumbnailScroll}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${altText} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>

        {/* Dot indicator */}
        <div className={styles.dotIndicator}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${activeIndex === index ? styles.activeDot : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
