import React, { Component } from 'react';
import '../../main/colors.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
//images
import scythe from '../../main/images/scythe-carousel.jpg';
import azul from '../../main/images/azul-carousel.jpg';
import mars from '../../main/images/mars-carousel.jpg';

class SaleCarousel extends Component {
  render() {
    return (
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={600}
        interval={4000}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={scythe} alt='Scythe' />
          <div>
            <p
              className='legend'
              style={{
                fontSize: 22,
                color: '#e4dfda',
                backgroundColor: '#bf1363'
              }}
            >
              Restock of most popular Scythe figures
            </p>
          </div>
        </div>
        <div>
          <img src={azul} alt='Azul' />
          <p
            className='legend'
            style={{
              fontSize: 22,
              color: '#e4dfda',
              backgroundColor: '#bf1363'
            }}
          >
            New edition of Azul has arrived
          </p>
        </div>
        <div>
          <img src={mars} alt='Mars' />
          <p
            className='legend'
            style={{
              fontSize: 22,
              color: '#e4dfda',
              backgroundColor: '#bf1363'
            }}
          >
            Terraforming Mars is back in the stock
          </p>
        </div>
      </Carousel>
    );
  }
}

export default SaleCarousel;
