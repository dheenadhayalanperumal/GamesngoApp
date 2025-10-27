"use client";

import React from "react";
import Slider from "react-slick";
// import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../../public/images/banner/Banner1.png";
import Banner2 from "../../public/images/banner/Banner2.png";

// Default banners as fallback
const defaultBanners = [
  { id: 1, imageUrl: Banner1.src, title: "Banner 1", linkUrl: "" },
  { id: 2, imageUrl: Banner2.src, title: "Banner 2", linkUrl: "" },
];

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl?: string;
}

interface BannerSliderProps {
  banners?: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners: propBanners }) => {
  // Use prop banners if provided, otherwise use default banners
  const banners = propBanners && propBanners.length > 0 ? propBanners : defaultBanners;

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

  const handleBannerClick = (linkUrl?: string) => {
    if (linkUrl) {
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="banner-image"
              onClick={() => handleBannerClick(banner.linkUrl)}
              style={{ cursor: banner.linkUrl ? 'pointer' : 'default' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
