"use client"

import Image from 'next/image'
import React from 'react';
import NavBarHome from '../components/navBarHome';
import HomeSlider from '../components/homeSlider';
import HomeFooter from '../components/homeFooter';
import Link from 'next/link';
import '../styles/home.css';
//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'

const slides = [
  {
    image: '/images/HomePageImages/FogRot2024/IMG_8606.JPG',
    title: 'Fog Rot',
    secondaryTitle: '2024',
    buttons: [
      { text: 'Visit Page', link: '/FogRot2024' },
    ]
  },
  {
    image: '/images/HomePageImages/DamnedSoggy2023/dac_2023_damnedsoggyoatpatch_.JPG',
    title: 'Damned Soggy Oat Patch',
    secondaryTitle: '2023',
    buttons: [
      { text: 'Visit Page', link: 'https://damnedsoggyoatpatch.com/' },
      { text: 'Read More on Clot', link: 'https://clotmag.com/oped/art-to-break-the-stakes-of-pervasive-digital-smoothness ' }
    ]
  },
  {
    image: '/images/HomePageImages/Ep2022/dac_2022_ephermerence.png',
    title: 'EPHEMERENCE',
    secondaryTitle: '2022',
    buttons: [
      { text: 'Visit Page', link: 'https://ephemerence.goldcomparts.show/' },
      { text: 'Read about EPHEMERENCE on Clot', link: 'https://clotmag.com/news/exhibition-ephemerence-by-goldsmiths-digital-arts-computing' }
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
  // {
  //   image: '/images/HomePageImages/2020/dac_2020_remotelatency.png',
  //   title: 'in Grid',
  //   secondaryTitle: '2020 Residency with Arbyte',
  //   buttons: [
  //     { text: 'Visit Page', link: '/' },
  //     { text: 'Arbyte', link: '/' }
  //   ]
  // },
  {
    image: '/images/HomePageImages/2019/dac_2019_cancelmenot.png',
    title: 'Cancel Me Not',
    secondaryTitle: '2019',
    buttons: [
      { text: 'Watch Trailer', link: 'https://www.youtube.com/watch?v=4VwsUvqVfqU' },
    ]
  },
  {
    image: '/images/HomePageImages/2018/dac_2018_jinia tasnin.jpg',
    title: 'Digital Arts Computing Degree Show',
    secondaryTitle: '2018',
    buttons: [
      { text: 'Watch Trailer', link: 'https://www.youtube.com/watch?v=mwvWKQxMBSk' },
    ]
  },
  // Add more here
];
export default function HomePage() {
  return (
    <>
      <NavBarHome /> {/* This ensures NavBarHome is at the top level */}
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <HomeSlider slides={slides} />
      <HomeFooter />
        {/* <Link href="/FogRot2024" rel="noopener noreferrer">
          Fogrot page
        </Link> */}
      {/* </main> */}
    </>
  );
}
