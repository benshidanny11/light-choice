import React from 'react'
import { Carousel } from 'react-bootstrap'
import slide1 from '../assets/images/slidehome1.jpg'
import slide2 from '../assets/images/slidehome2.jpg'
import slide3 from '../assets/images/slidehome3.jpg'
import slide4 from '../assets/images/slidehome4.jpg'
function SliderHome() {
    return (
        <div style={{ display: 'block', width: '100%' }}>
            {/* <h4>New products for our customers</h4> */}
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide1}
                        alt="Slide One"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide2}
                        alt="Slide Two"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide3}
                        alt="Slide Two"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={slide4}
                        alt="Slide Two"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default SliderHome