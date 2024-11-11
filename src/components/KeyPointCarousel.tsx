import React from 'react';
import Slider from 'react-slick';

interface KeyPointCarouselProps {
  keyPoints: string[];
}

export const KeyPointCarousel: React.FC<KeyPointCarouselProps> = ({ keyPoints }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {keyPoints.map((point, index) => (
        <div key={index} className="carousel-slide">
          <h3>Key Point {index + 1}</h3>
          <p>{point}</p>
        </div>
      ))}
    </Slider>
  );
};
