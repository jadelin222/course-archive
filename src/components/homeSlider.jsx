import React, { useState } from 'react';
import './homeSlider.css'; 

const HomeSlider = ({ slides, onSlideChange }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    const newIndex = current === length - 1 ? 0 : current + 1;
    setCurrent(newIndex);
    onSlideChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = current === 0 ? length - 1 : current - 1;
    setCurrent(newIndex);
    onSlideChange(newIndex);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div 
        className="left-arrow" 
        onClick={prevSlide}
        style={{ color: slides[current].className === 'image-2025' ? 'black' : 'white' }}
      >&#10094;</div>
      <div 
        className="right-arrow" 
        onClick={nextSlide}
        style={{ color: slides[current].className === 'image-2025' ? 'black' : 'white' }}
      >&#10095;</div>
      {slides.map((slide, index) => (
        <div 
          className={index === current ? 'slide active' : 'slide'} 
          key={index}
          data-year={slide.title.includes('2025') ? '2025' : ''}
        >
          {index === current && (
            <div>
              <img 
                src={slide.image} 
                alt={slide.title} 
                className={slide.className}
              />       
              <div className="info">
                <h2>{slide.title}</h2>
                <h3>{slide.secondaryTitle}</h3>
                {slide.buttons.map((button, btnIndex) => (
                  <a 
                    key={btnIndex} 
                    href={button.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="visit-page-button"
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default HomeSlider;