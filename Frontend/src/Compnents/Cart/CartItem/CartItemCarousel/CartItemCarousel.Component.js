import React, {PureComponent} from 'react';
import "./CartItemCarousel.css"
import {arrowRight} from "../../../../Assets/arrowRight";
import {arrowLeft} from "../../../../Assets/arrowLeft";
class CartItemCarouselComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  nextImage() {
    this.setState({
      index: (this.state.index + 1)% this.props.gallery.length
    })
  }
  prevImage() {
    this.setState({
      index: (this.state.index - 1 + this.props.gallery.length)% this.props.gallery.length
    })
  }
  render() {
    return (
        <div className="cart-item-carousel">

          <img src={this.props.gallery[this.state.index] } alt={this.state.index}/>
          <div className="carousel-controls">
            { this.props.gallery.length > 1 &&
              <div onClick={this.prevImage.bind(this)} className="cart-item-carousel-left">{arrowLeft}</div>}

            { this.props.gallery.length > 1 &&
              <div onClick={this.nextImage.bind(this)} className="cart-item-carousel-right">{arrowRight}</div>
            }
          </div>
        </div>
    );
  }
}

export default CartItemCarouselComponent;