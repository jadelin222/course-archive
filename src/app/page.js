"use client"

import Image from 'next/image'
import React, { useState } from 'react';
import NavBarHome from '../components/navBarHome';
import HomeSlider from '../components/homeSlider';
import HomeFooter from '../components/homeFooter';
import Link from 'next/link';
import '../styles/home.css';
//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'

const slides = [
  {
    image: '/images/HomePageImages/2026_HiddenVein/2026_WebsiteCover.png',
    title: 'HiddenVeins',
    secondaryTitle: '2026 Degree Show',
    buttons: [
      // { text: 'Degree Show', link: '/2026_Final_HiddenVein' },
      { text: 'WIP Show', link: '/2026_WIP_uncertain' },
    ]
  },
  {
    image: '/images/HomePageImages/physarum-polycephalum/background 2.PNG',
    title: ' 2025 Degree Show :physarum-polycephalum',
    secondaryTitle: '2025 WIP Show',
    buttons: [
      // { text: 'Degree Show', link: '/physarum-polycephalum' },
      { text: 'WIP Show', link: '/WorksInChaos' },
    ],
    className: 'image-2025'
  },
  {
    image: '/images/HomePageImages/FogRot2024/IMG_8606.JPG',
    title: 'Fog Rot',
    
    secondaryTitle: '2024 Degree Show',
    buttons: [
      { text: 'Visit Page', link: '/FogRot2024' },
    ]
  },
  {
    image: '/images/HomePageImages/DamnedSoggy2023/dac_2023_damnedsoggyoatpatch.JPG',
    title: 'Damned Soggy Oat Patch',
    secondaryTitle: '2023 Degree Show',
    buttons: [
      { text: 'Visit Page', link: 'https://damnedsoggyoatpatch.com/' },
      { text: 'Read More on Clot', link: 'https://clotmag.com/oped/art-to-break-the-stakes-of-pervasive-digital-smoothness ' }
    ]
  },
  {
    image: '/images/HomePageImages/Ep2022/dac_2022_ephermerence.png',
    title: 'EPHEMERENCE',
    secondaryTitle: '2022 Degree Show',
    buttons: [
      { text: 'Visit Page', link: 'https://ephemerence.goldcomparts.show/' },
      { text: 'Read More on Clot', link: 'https://clotmag.com/news/exhibition-ephemerence-by-goldsmiths-digital-arts-computing' }
    ]
  },
  {
    image: '/images/HomePageImages/2021/dac_2021_third_ashleyhi.jpeg',
    title: 'Third_',
    secondaryTitle: '2021 Degree Show',
    buttons: [
      { text: 'Visit Page', link: 'https://third.goldcomparts.show/' },
      { text: 'Showcase Video', link: 'https://www.youtube.com/watch?v=3eKjXzT5QBI' }
    ]
  },
  {
    image: '/images/HomePageImages/2020/dac_2020_remotelatency.png',
    title: 'Remote Latency',
    secondaryTitle: '2020 Degree Show',
    buttons: [
      { text: 'Visit Page', link: 'https://remotelatency.com/' },
      { text: 'Watch Trailer', link: 'https://youtu.be/2FrPYoUPX8w?si=H1BPfuNDhsRJtBY-' }
    ]
  },
  {
    image: '/images/HomePageImages/2020/dac_2020_remotelatency.png',
    title: 'in Grid',
    secondaryTitle: '2020 Residency with Arbyte',
    buttons: [
      { text: 'Visit Page', link: '/' },
      { text: 'Arbyte', link: '/' }
    ]
  },
  {
    image: '/images/HomePageImages/2019/dac_2019_cancelmenot.png',
    title: 'Cancel Me Not',
    secondaryTitle: '2019 Degree Show',
    buttons: [
      { text: 'Watch Trailer', link: 'https://www.youtube.com/watch?v=4VwsUvqVfqU' },
    ]
  },
  {
    image: '/images/HomePageImages/2018/dac_2018_jinia tasnin.jpg',
    title: 'DAC Degree Show',
    secondaryTitle: '2018 Degree Show',
    buttons: [
      { text: 'Watch Trailer', link: 'https://www.youtube.com/watch?v=mwvWKQxMBSk' },
    ]
  },
  // Add more here
];
export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <NavBarHome currentSlide={currentSlide} />
      <HomeSlider slides={slides} onSlideChange={setCurrentSlide} />
      <HomeFooter />
    </>
  );
}
