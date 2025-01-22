import React from "react";
import { Carousel } from "react-bootstrap";

const HomeBanner = () => {
  return (
    <Carousel interval={1000}> 
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${require('../assets/images/slider_1.jpg')})`,
          }}
        >
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${require('../assets/images/slider_2.jpg')})`,
          }}
        >
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${require('../assets/images/slider_3.jpg')})`,
          }}
        >
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
export default HomeBanner;