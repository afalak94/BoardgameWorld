// TODO: implement new carousel

import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import styles from './Home.module.css';
//images
import scythe from '../../main/images/scythe-carousel.jpg';
import azul from '../../main/images/azul-carousel.jpg';
import mars from '../../main/images/mars-carousel.jpg';

const items = [
  {
    src: scythe,
    altText: 'Scythe',
    caption: 'Restock of most popular Scythe figures'
  },
  {
    src: azul,
    altText: 'Slide 2',
    caption: 'New edition of Azul has arrived'
  },
  {
    src: mars,
    altText: 'Slide 3',
    caption: 'Terraforming Mars is back in the stock'
  }
];

class SaleCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
          className={styles['home__corouselItem']}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            style={{ marginTop: 50 }}
            className={styles['carousel__caption']}
            captionText={''}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction='prev'
          directionText='Previous'
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction='next'
          directionText='Next'
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default SaleCarousel;
