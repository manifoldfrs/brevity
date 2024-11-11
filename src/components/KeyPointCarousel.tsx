import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface KeyPointCarouselProps {
  keyPoints: string[];
}

export const KeyPointCarousel: React.FC<KeyPointCarouselProps> = ({ keyPoints }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {keyPoints.map((point, index) => (
        <div key={index} className="carousel-slide">
          <h3>{`Point ${index + 1}`}</h3>
          <p>{point}</p>
        </div>
      ))}
    </Slider>
  );
};
