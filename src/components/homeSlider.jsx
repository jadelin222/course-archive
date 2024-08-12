import React, { useState } from 'react';
import './homeSlider.css'; 

const HomeSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div className="left-arrow" onClick={prevSlide}>&#10094;</div>
      <div className="right-arrow" onClick={nextSlide}>&#10095;</div>
      {slides.map((slide, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && (
            <div>
              <img src={slide.image} alt={slide.title}/>       
              <div className="info">
                <h2>{slide.title}</h2>
                <h3>{slide.secondaryTitle}</h3>
                {slide.buttons.map((button, btnIndex) => (
                  <a key={btnIndex} href={button.link} target="_blank" rel="noopener noreferrer" className="visit-page-button">
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