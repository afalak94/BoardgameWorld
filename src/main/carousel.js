import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import styles from './App.module.css';

const items = [
  {
    src:
      'https://cf.geekdo-images.com/imagepagezoom/img/c18aSQqozMiGW2XcqyfH5G1LAWU=/fit-in/1200x900/filters:no_upscale()/pic2535740.jpg',
    altText: 'Scythe',
    caption: 'Restock of most popular Scythe figures'
  },
  {
    src:
      'https://cf.geekdo-images.com/imagepagezoom/img/yDFd2k_qiRy6wrck1T2Eig07Lkc=/fit-in/1200x900/filters:no_upscale()/pic3907025.jpg',
    altText: 'Slide 2',
    caption: 'New edition of Azul has arrived'
  },
  {
    src:
      'https://cf.geekdo-images.com/imagepagezoom/img/y3VfaXqkheaDWFe7juSZDbHCU2Y=/fit-in/1200x900/filters:no_upscale()/pic2891965.jpg',
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
