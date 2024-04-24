// "use client";

import { useRouter } from 'next/router';
import React from 'react';

// Dummy data for demonstration, replace with your actual data fetching logic
const cardsData = {
  'first-artwork': {
    title: "First artwork",
    artist: "artist Name",
    description: "This is the description for the first artwork.",
    imageUrl: "/path/to/your/first-image.jpg",
  },
  'jadeArt': {
    title: "in this world nothing is coming back",
    artist: "yiying jade lin",
    description: "This is the description for the first artwork heyhey hey ???",
    imageUrl: "/images/Artworks/Jade/jade1.png",
  },
  // Add other cards data here
};

const ArtworkPage = () => {
  const router = useRouter();
  const { artId } = router.query;
  const card = cardsData[artId];

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <img src={card.imageUrl} alt={card.title} style={{ maxWidth: '100%' }} />
      <h1>{card.title}</h1>
      <p>{card.artist}</p>
      <p>{card.description}</p>
    </div>
  );
};

export default ArtworkPage;