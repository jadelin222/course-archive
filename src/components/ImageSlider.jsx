import React, { useState } from 'react';
import './ImageSlider.css'; // Make sure to create this CSS file

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <div className="buttons-container">
        <button onClick={goToPrev}>Prev</button>
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default ImageSlider;