"use client";

import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  { id: 1, src: "/images/banner/Banner1.png", alt: "Banner 1" },
  { id: 2, src: "/images/banner/Banner2.png", alt: "Banner 2" },
];


const BannerSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={banner.src}
              alt={banner.alt}
              className="banner-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
