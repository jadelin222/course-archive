import React from 'react';


const Card = ({ title, imageUrl, description, link }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-body">
        <h5>{title}</h5>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>
      </div>
    </div>
  );
};

export default Card;